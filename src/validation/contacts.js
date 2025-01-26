import Joi from 'joi';
import {
  createCommonStringValidation,
  createContactTypeValidation,
  createEmailValidation,
} from './validationCommonParams.js';

export const createContactSchema = Joi.object({
  name: createCommonStringValidation('name', 'required'),
  phoneNumber: createCommonStringValidation('phoneNumber', 'required'),
  email: createEmailValidation(),
  isFavourite: Joi.boolean(),
  contactType: createContactTypeValidation(),
});

export const updateContactSchema = Joi.object({
  name: createCommonStringValidation('name'),
  phoneNumber: createCommonStringValidation('phoneNumber'),
  email: createEmailValidation(),
  isFavourite: Joi.boolean(),
  contactType: createContactTypeValidation(),
});
