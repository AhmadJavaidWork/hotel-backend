import { validationResult } from 'express-validator';

export const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ success: false, data: { errors: errors.array() } });
  }
  next();
};
