import { resStatuses, messages, errors } from '../constants/response';

export const success = (res, data = {}) => {
  return res
    .status(resStatuses.ok)
    .json({ success: true, message: messages.retrieved, data });
};

export const created = (res, data = {}) => {
  return res
    .status(resStatuses.created)
    .json({ success: true, message: messages.created, data });
};

export const updated = (res, data = {}) => {
  return res
    .status(resStatuses.updated)
    .json({ success: true, message: messages.updated, data });
};

export const deleted = (res, data = {}) => {
  return res
    .status(resStatuses.updated)
    .json({ success: true, message: messages.deleted, data });
};

export const notFound = (res, data = {}) => {
  return res
    .status(resStatuses.notFound)
    .json({ success: false, message: messages.notFound, data });
};

export const wrongPassword = (res) => {
  return res
    .status(resStatuses.badRequest)
    .json({ success: false, message: errors.wrongPass });
};
