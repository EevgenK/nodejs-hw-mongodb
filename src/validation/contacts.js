import Joi from 'joi';
export const validationParams = {
  min: 3,
  max: 20,
  minDomainSegments: 2,
  allowedTlds: ['com', 'net'],
  contactTypes: ['work', 'home', 'personal'],
  stringTypeMessageGenerator(el) {
    return {
      'string.base': `"${el}" should be a string`,
      'string.min': `"${el}" should have at least {#limit} characters`,
      'string.max': `"${el}" should have at most {#limit} characters`,
    };
  },
};
const makeStringWithSymbol = (el, symbol) =>
  validationParams[el].map((type) => `'${type}'`).join(` ${symbol} `);

const createCommonStringValidation = (element, required = false) => {
  return Joi.string()
    .min(validationParams.min)
    .max(validationParams.max)
    .required()
    .messages(
      required
        ? {
            ...validationParams.stringTypeMessageGenerator(element),
            'any.required': `"${element}" is required`,
          }
        : validationParams.stringTypeMessageGenerator(element),
    );
};
const createEmailValidation = () =>
  Joi.string()
    .min(validationParams.min)
    .max(validationParams.max)
    .email({
      minDomainSegments: validationParams.minDomainSegments,
      tlds: { allow: validationParams.allowedTlds },
    })
    .messages({
      ...validationParams.stringTypeMessageGenerator('email'),
      'string.email': `"email" should have at least ${
        validationParams.minDomainSegments
      } separated domain parts and have one of the following endings: ${makeStringWithSymbol(
        'allowedTlds',
        'or',
      )}`,
    });
const createContactTypeValidation = () =>
  Joi.string()
    .min(validationParams.min)
    .max(validationParams.max)
    .valid(...validationParams.contactTypes)
    .messages({
      ...validationParams.stringTypeMessageGenerator('contactType'),
      'any.only': `"contactType" should be one of the following: ${makeStringWithSymbol(
        'contactTypes',
        'or',
      )}`,
    });

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
