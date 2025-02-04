import Joi from 'joi';

const validationParams = {
  min: 3,
  max: 40 /*change to 20 after the test*/,
  minDomainSegments: 2,
  allowedTlds: ['com', 'net', 'ua'],
  contactTypes: ['work', 'home', 'personal'],
  stringTypeMessageGenerator(el) {
    return {
      'string.base': `(${el}) should be a string`,
      'string.min': `(${el}) should have at least {#limit} characters`,
      'string.max': `(${el}) should have not more than {#limit} characters`,
    };
  },
};
const makeStringWithSymbol = (el, symbol) =>
  validationParams[el].map((type) => `'${type}'`).join(` ${symbol} `);

const createCommonStringValidation = (element, required) => {
  let validation = Joi.string()
    .min(validationParams.min)
    .max(validationParams.max)
    .messages(validationParams.stringTypeMessageGenerator(element));
  if (required) {
    validation = validation.required().messages({
      ...validationParams.stringTypeMessageGenerator(element),
      'any.required': `(${element}) is required`,
    });
  }
  return validation;
};
const createEmailValidation = (required = false) => {
  let message = {
    ...validationParams.stringTypeMessageGenerator('email'),
    'string.email': `(email) should have at least ${
      validationParams.minDomainSegments
    } separated domain parts and have one of the following endings: ${makeStringWithSymbol(
      'allowedTlds',
      'or',
    )}`,
  };
  let validation = Joi.string()
    .min(validationParams.min)
    .max(validationParams.max)
    .email({
      minDomainSegments: validationParams.minDomainSegments,
      tlds: { allow: validationParams.allowedTlds },
    })
    .messages(message);

  return required
    ? validation
        .required()
        .messages({ ...message, 'any.required': `(email) is required` })
    : validation;
};
const createContactTypeValidation = () =>
  Joi.string()
    .min(validationParams.min)
    .max(validationParams.max)
    .valid(...validationParams.contactTypes)
    .messages({
      ...validationParams.stringTypeMessageGenerator('contactType'),
      'any.only': `(contactType) should be one of the following: ${makeStringWithSymbol(
        'contactTypes',
        'or',
      )}`,
    });
export {
  validationParams,
  makeStringWithSymbol,
  createCommonStringValidation,
  createEmailValidation,
  createContactTypeValidation,
};
