import { BasicStrategy } from 'passport-http';
import bcrypt from 'bcrypt';
import knex from '../knex';

export const passwordStrategy = new BasicStrategy(
  async (email, password, done) => {
    const user = await knex('users')
      .where({ email })
      .then((user) => user[0]);
    if (!user) {
      done(true);
      return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) return done(null, user);
    return done(null, false);
  }
);

export const customerPasswordStrategy = new BasicStrategy(
  async (email, password, done) => {
    const user = await knex('customers')
      .where({ email })
      .then((user) => user[0]);
    if (!user) {
      done(true);
      return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) return done(null, user);
    return done(null, false);
  }
);
