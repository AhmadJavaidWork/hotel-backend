import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { masterKey } from '../../config';

export const masterStrategy = new BearerStrategy((token, done) => {
  if (token === masterKey) {
    return done(null, {});
  }
  return done(null, false);
});
