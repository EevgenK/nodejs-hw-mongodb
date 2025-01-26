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
