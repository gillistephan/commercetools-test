import { Type, type Static } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

const Commerce = Type.Object({
  projectKey: Type.String(),
  region: Type.String(),
  clientId: Type.String(),
  clientSecret: Type.String(),
  scopes: Type.Array(Type.String()),
});

type Commerce = Static<typeof Commerce>;

function getCommerceEnv(): Commerce {
  const scope = process.env.CTP_SCOPE;

  const value: Partial<Commerce> = {
    projectKey: process.env.CTP_PROJECT_KEY,
    region: process.env.CTP_REGION,
    clientId: process.env.CTP_CLIENT_ID,
    clientSecret: process.env.CTP_CLIENT_SECRET,
    scopes: scope ? scope.split(',') : [],
  };

  return Value.Parse(Commerce, value);
}

const BasicAuth = Type.Object({
  username: Type.String(),
  password: Type.String(),
});

type BasicAuth = Static<typeof BasicAuth>;

function getBasicAuthEnv(): BasicAuth {
  const value: Partial<BasicAuth> = {
    username: process.env.BASIC_AUTH_USERNAME,
    password: process.env.BASIC_AUTH_PASSWORD,
  };

  return Value.Parse(BasicAuth, value);
}

const Environment = Type.Object({
  commerce: Commerce,
  basicAuth: BasicAuth,
  isDevelopment: Type.Boolean(),
});

type Environment = Static<typeof Environment>;

export function getEnv(): Environment {
  return Value.Parse(Environment, {
    commerce: getCommerceEnv(),
    basicAuth: getBasicAuthEnv(),
    isDevelopment: process.env.NODE_ENV === 'development',
  });
}

export const env = getEnv();
