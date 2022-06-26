import { v4 as uuidV4 } from 'uuid';

export const setRequestId = (req, res, next) => {
  req.requestId = uuidV4();
  next();
};
