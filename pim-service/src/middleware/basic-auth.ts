import { RequestHandler } from 'express';
import { env } from '../lib/env';
import { HttpError } from '../model/error';

/**
 * RegExp for basic auth credentials (copied from https://github.com/jshttp/basic-auth/blob/master/index.js)
 *
 * credentials = auth-scheme 1*SP token68
 * auth-scheme = "Basic" ; case insensitive
 * token68     = 1*( ALPHA / DIGIT / "-" / "." / "_" / "~" / "+" / "/" ) *"="
 * @private
 */

const CREDENTIALS_REGEXP =
  /^ *(?:[Bb][Aa][Ss][Ii][Cc]) +([A-Za-z0-9._~+/-]+=*) *$/;

/**
 * RegExp for basic auth user/pass (copied from https://github.com/jshttp/basic-auth/blob/master/index.js)
 *
 * user-pass   = userid ":" password
 * userid      = *<TEXT excluding ":">
 * password    = *TEXT
 * @private
 */
const USER_PASS_REGEXP = /^([^:]*):(.*)$/;

export const basicAuthMiddleware: RequestHandler = (req, _, next) => {
  const auth = req.headers.authorization;
  if (!auth || typeof auth !== 'string') {
    throw new HttpError(400, 'Authorization header is required');
  }

  const match = CREDENTIALS_REGEXP.exec(auth || '');
  if (!match) {
    throw new HttpError(400, 'Invalid authorization header');
  }

  const userPass = USER_PASS_REGEXP.exec(
    Buffer.from(match[1], 'base64').toString()
  );
  if (!userPass) {
    throw new HttpError(400, 'Invalid authorization header');
  }

  if (
    userPass[1] !== env.basicAuth.username ||
    userPass[2] !== env.basicAuth.password
  ) {
    throw new HttpError(401, 'Invalid username or password');
  }

  next();
};
