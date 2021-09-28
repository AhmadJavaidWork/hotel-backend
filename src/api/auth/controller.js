import { sign } from '../../services/jwt';
import { userTokenView, userView } from '../users/helpers';
import { success } from '../../utils/response';

export const signIn = async ({ user }, res) => {
  user = userView(user);
  const token = await sign(userTokenView(user));
  return success(res, { user, token });
};

export const signOut = async (req, res) => {
  req.logout();
  return success(res);
};
