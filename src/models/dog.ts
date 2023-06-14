import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "dogs",
})
export class Dog extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  breed!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: true,
  })
  isGoodBoy!: boolean;
}