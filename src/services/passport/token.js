import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { jwtSecret } from '../../config';
import knex from '../knex';

export const tokenStrategy = new JwtStrategy(
  {
    secretOrKey: jwtSecret,
    jwtFromRequest: ExtractJwt.fromExtractors([
      ExtractJwt.fromUrlQueryParameter('token'),
      ExtractJwt.fromBodyField('token'),
      ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    ]),
  },
  ({ user }, done) => {
    knex('users')
      .where({ id: user.id })
      .then((user) => {
        done(null, user[0]);
        return null;
      })
      .catch(done);
  }
);

export const customerTokenStrategy = new JwtStrategy(
  {
    secretOrKey: jwtSecret,
    jwtFromRequest: ExtractJwt.fromExtractors([
      ExtractJwt.fromUrlQueryParameter('token'),
      ExtractJwt.fromBodyField('token'),
      ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    ]),
  },
  ({ user }, done) => {
    knex('customers')
      .where({ id: user.id })
      .then((user) => {
        done(null, user[0]);
        return null;
      })
      .catch(done);
  }
);
