import Joi from 'joi';
import {
  createCommonStringValidation,
  createEmailValidation,
} from './validationCommonParams.js';

export const registerUserSchema = Joi.object({
  name: createCommonStringValidation('name', 'required'),
  email: createEmailValidation('required'),
  password: createCommonStringValidation('password', 'required'),
});

export const loginUserSchema = Joi.object({
  email: createEmailValidation('required'),
  password: createCommonStringValidation('password', 'required'),
});

export const requestResetEmailSchema = Joi.object({
  email: createEmailValidation('required'),
});

export const resetPasswordSchema = Joi.object({
  password: createCommonStringValidation('password', 'required'),
  token: createCommonStringValidation('token', 'required'),
});
