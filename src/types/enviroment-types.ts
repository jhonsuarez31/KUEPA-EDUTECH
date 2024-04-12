import * as Joi from 'joi';

const environmentConfigSchema = Joi.object({
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_DB: Joi.string().required(),
  NODE_ENV: Joi.string().valid('dev', 'prod').required(),
  JWT_TOKEN: Joi.string().required(),
});

interface EnvironmentConfig {
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_DB: string;
  NODE_ENV: 'dev' | 'prod';
  JWT_TOKEN: string;
}

export { environmentConfigSchema };
export type { EnvironmentConfig };