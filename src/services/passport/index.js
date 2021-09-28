import passport from 'passport';
import knex from '../knex';
import { passwordStrategy, customerPasswordStrategy } from './password';
import { masterStrategy } from './master';
import { tokenStrategy, customerTokenStrategy } from './token';
import { errors, resStatuses } from '../../constants/response';

const User = {};
User.roles = ['admin', 'user', 'customer'];

export const password = () => (req, res, next) =>
  passport.authenticate('password', { session: false }, (err, user, info) => {
    if (err && err.param) {
      return res
        .status(resStatuses.internalError)
        .json({ success: false, message: errors.internalError });
    } else if (err || !user) {
      return res.status(resStatuses.badRequest).json({
        success: false,
        message: errors.wrongPassOrEmail,
      });
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) return res.json({ status: 200, err });
      return next();
    });
  })(req, res, next);

export const customerPassword = () => (req, res, next) =>
  passport.authenticate(
    'customerPassword',
    { session: false },
    (err, user, info) => {
      if (err && err.param) {
        return res
          .status(resStatuses.internalError)
          .json({ success: false, message: errors.internalError });
      } else if (err || !user) {
        return res.status(resStatuses.badRequest).json({
          success: false,
          message: errors.wrongPassOrEmail,
        });
      }
      req.logIn(user, { session: false }, (err) => {
        if (err) return res.json({ status: 200, err });
        return next();
      });
    }
  )(req, res, next);

export const master = () => (req, res, next) =>
  passport.authenticate(
    'master',
    { session: false },
    (err, authorized, info) => {
      if (authorized === false) {
        return res
          .status(resStatuses.unAuthorized)
          .json({ success: false, message: errors.wrongMasterKey });
      }
      return next();
    }
  )(req, res, next);

export const token =
  ({ required, roles = User.roles } = {}) =>
  (req, res, next) =>
    passport.authenticate('token', { session: false }, (err, user, info) => {
      if (
        err ||
        (required && !user) ||
        (required && !~roles.indexOf(user.role))
      ) {
        return res
          .status(resStatuses.unAuthorized)
          .json({ success: false, message: errors.unAuthorized });
      }
      req.logIn(user, { session: false }, (err) => {
        if (err) {
          return res
            .status(resStatuses.internalError)
            .json({ success: false, message: errors.internalError });
        }
        return next();
      });
    })(req, res, next);

export const customerToken =
  ({ required, roles = ['customer'] } = {}) =>
  (req, res, next) =>
    passport.authenticate(
      'customerToken',
      { session: false },
      (err, user, info) => {
        if (
          err ||
          (required && !user) ||
          (required && !~roles.indexOf(user.role))
        ) {
          return res
            .status(resStatuses.unAuthorized)
            .json({ success: false, message: errors.unAuthorized });
        }
        req.logIn(user, { session: false }, (err) => {
          if (err) {
            return res
              .status(resStatuses.internalError)
              .json({ success: false, message: errors.internalError });
          }
          return next();
        });
      }
    )(req, res, next);

passport.use('password', passwordStrategy);
passport.use('customerPassword', customerPasswordStrategy);
passport.use('master', masterStrategy);
passport.use('token', tokenStrategy);
passport.use('customerToken', customerTokenStrategy);

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser(async (id, done) => {
  const user = await knex('users')
    .where({ id })
    .then((user) => user[0]);
  return done(null, user);
});
