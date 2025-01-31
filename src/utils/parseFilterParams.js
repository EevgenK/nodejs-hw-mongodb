import { validationParams } from '../validation/validationCommonParams.js';

const parseType = (type, array) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isTypeOf = (type) => array.includes(type);
  if (isTypeOf(type)) {
    return type;
  } else {
    return null;
  }
};
/*
One more parse for Boolean
const pasreBoolean = (str) => {
  if (['true', 'false'].includes(str)) return JSON.parse(str);
};
*/
const isFavouriteValues = ['true', 'false'];
const contactTypeValues = validationParams.contactTypes;

export const parseFilterParams = (query) => {
  const { isFavourite, contactType } = query;
  const parsedIsFavourite = parseType(isFavourite, isFavouriteValues);
  const parsedContactType = parseType(contactType, contactTypeValues);
  return { isFavourite: parsedIsFavourite, contactType: parsedContactType };
};
