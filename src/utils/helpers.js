import { validationResult } from 'express-validator';
import { internalServerError } from './response';

export const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ success: false, data: { errors: errors.array() } });
  }
  next();
};

export const errorLogger = (res, apiPath, error) => {
  console.error(`Error occurred in ${apiPath}`, error);
  return internalServerError(res);
};
