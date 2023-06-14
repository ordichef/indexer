import { Result } from "express-validator";
import httpError from "http-errors";
import { InvalidSignatureException, NotFoundException } from "../core/exception";

const errorHandler = (e, req, res, next) => {
  if (httpError.isHttpError(e)) {
    return res.json({
      statusCode: e.statusCode,
      message: e.message,
      errors: [e.message],
    });
  }
  console.log(e.stack);
  // Process express validator errors
  let statusCode;
  let message;
  let errors;

  if (e instanceof Result) {
    statusCode =  400;
    message = 'Validator error';
    errors = e.mapped();
  } else if( e instanceof NotFoundException) {
    statusCode = 404;
    message = "Not found";
    errors = [message];
  } else if( e instanceof InvalidSignatureException) {
    statusCode = 401;
    message = e.message;
    errors = [message];
  } else{
    console.error(e)
    statusCode = 500;
    message = "System Error";
    errors = [message];
  }

  return res.status(statusCode).json({
    statusCode,
    message,
    errors,
  })
}

export default errorHandler;