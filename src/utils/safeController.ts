import {validationResult} from 'express-validator';


const safeController = (func) => {
  const wrappedFunc = async (req, res, next) => {
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


const safeControllerRaw = (func) => {
  const wrappedFunc = async (req, res, next) => {
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