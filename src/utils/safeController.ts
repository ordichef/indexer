import {validationResult} from 'express-validator';
import { Request, Response } from 'express';


const safeController = (func: Function) => {
  const wrappedFunc = async (req: Request, res: Response, next: Function) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(errors);
      }

      const data = await func(req, res, next);

      res.json({
        statusCode: 200,
        data: data,
      });
    } catch (e) {
      next(e);
    }
  }

  return wrappedFunc;
}


const safeControllerRaw = (func: Function) => {
  const wrappedFunc = async (req: Request, res: Response, next: Function) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(errors);
      }

      const data = await func(req, res, next);

      res.json(data);
    } catch (e) {
      next(e);
    }
  }

  return wrappedFunc;
}


export {
  safeController,
  safeControllerRaw
};