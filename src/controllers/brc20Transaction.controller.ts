import { Request } from "express";
import { Op } from "sequelize";
import { dbInstance } from "../core/database";
import { Brc20Balance } from "../models/Brc20Balance.model";
import { Brc20Transaction } from "../models/brc20Transaction.model";
import { BRC20_DEC_DEFAULT, BRC20_OP } from "../types";
import {
  brc20ValidatorCommon,
  brc20ValidatorDeploy,
  brc20ValidatorMint,
  brc20ValidatorTransfer,
} from "../validations/brc20";
import { transactionCommon } from "../validations/transaction";

const getAll = async (req: Request) => {
  return await Brc20Transaction.findAll();
};

const getById = async (req: Request) => {
  return await Brc20Transaction.findByPk(req.params.id);
};

const createTransaction = async (data) => {
  (() => {
    const { error, errors } = transactionCommon.validate(data);
    if (error || errors) throw error || errors;
  })();

  const contentIncription = JSON.parse(data.content);

  const { error, errors } = brc20ValidatorCommon.validate(contentIncription);
  if (error || errors) throw error || errors;

  switch (contentIncription.op) {
    case BRC20_OP.DEPLOY: {
      const { error, errors } =
        brc20ValidatorDeploy.validate(contentIncription);
      if (error || errors) throw error || errors;

      const existTickDeployed = await Brc20Transaction.findOne({
        where: {
          tick: { [Op.iLike]: contentIncription.tick },
          op: contentIncription.op,
        },
      });

      if (existTickDeployed) throw new Error("This tick is already deployed");

      return await Brc20Transaction.create({
        id: data.id,
        op: contentIncription.op,
        tick: contentIncription.tick,
        max: contentIncription.max,
        lim: contentIncription.lim,
        dec: contentIncription.dec || BRC20_DEC_DEFAULT,
      });
      break;
    }

    case BRC20_OP.MINT: {
      const { error, errors } = brc20ValidatorMint.validate(contentIncription);
      if (error || errors) throw error || errors;

      const existTickDeployed = await Brc20Transaction.findOne({
        where: {
          tick: { [Op.iLike]: contentIncription.tick },
          op: BRC20_OP.DEPLOY,
        },
      });

      if (!existTickDeployed)
        throw new Error("This tick has been not deployed");

      if (
        existTickDeployed.dataValues.lim !== null &&
        +existTickDeployed.dataValues.lim < +contentIncription.amt
      ) {
        throw new Error("This mint request exceeds the tick limit");
      }

      const amtMinted =
        (await Brc20Transaction.sum("amt", {
          where: {
            tick: { [Op.iLike]: contentIncription.tick },
            op: BRC20_OP.MINT,
          },
        })) ?? 0;

      if (
        +existTickDeployed.dataValues.max <
        amtMinted + +contentIncription.amt
      ) {
        throw new Error("This mint request exceeds the total supplied");
      }

      const existBalance = await Brc20Balance.findOne({
        where: {
          address: data.address,
          tick: { [Op.iLike]: contentIncription.tick },
        },
      });

      const transaction = await dbInstance.transaction();

      try {
        if (existBalance) {
          await Brc20Balance.update(
            {
              balance:
                +existBalance.dataValues.balance + +contentIncription.amt,
              tick: contentIncription.tick,
            },
            {
              where: {
                address: data.address,
                tick: { [Op.iLike]: contentIncription.tick },
              },
              transaction: transaction,
            }
          );
        } else {
          await Brc20Balance.create(
            {
              address: data.address,
              balance: +contentIncription.amt,
              tick: contentIncription.tick,
            },
            {
              transaction: transaction,
            }
          );
        }

        const result = await Brc20Transaction.create({
          id: data.id,
          op: contentIncription.op,
          tick: contentIncription.tick,
          amt: contentIncription.amt,
        });

        await transaction.commit();

        return result;
      } catch (error) {
        transaction.rollback();
        throw error;
      }
      break;
    }

    case BRC20_OP.TRANSFER: {
      const { error, errors } =
        brc20ValidatorTransfer.validate(contentIncription);
      if (error || errors) throw error || errors;

      const existTickDeployed = await Brc20Transaction.findOne({
        where: {
          tick: { [Op.iLike]: contentIncription.tick },
          op: BRC20_OP.DEPLOY,
        },
      });

      if (!existTickDeployed) {
        throw new Error("This tick has been not deployed");
      }

      const existBalance = await Brc20Balance.findOne({
        where: {
          address: data.address,
          tick: { [Op.iLike]: contentIncription.tick },
        },
      });

      const transaction = await dbInstance.transaction();

      try {
        if (
          !existBalance ||
          +existBalance.dataValues.balance < +contentIncription.amt
        ) {
          throw new Error("This transfer request exceeds the balance");
        }

        await Brc20Balance.update(
          {
            balance: +existBalance.dataValues.balance - +contentIncription.amt,
            tick: contentIncription.tick,
          },
          {
            where: {
              address: data.address,
              tick: { [Op.iLike]: contentIncription.tick },
            },
            transaction: transaction,
          }
        );

        const result = await Brc20Transaction.create(
          {
            id: data.id,
            op: contentIncription.op,
            tick: contentIncription.tick,
            amt: contentIncription.amt,
          },
          {
            transaction: transaction,
          }
        );

        await transaction.commit();

        return result;
      } catch (error) {
        transaction.rollback();
        throw error;
      }
      break;
    }

    default:
      break;
  }
};

const create = async (req: Request) => {
  return await createTransaction(req.body);
};

export { create, createTransaction, getAll, getById };
