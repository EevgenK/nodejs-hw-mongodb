import { validationParams } from '../validation/contacts.js';

const parseType = (type, array) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isTypeOf = (type) => array.includes(type);
  if (isTypeOf(type)) {
    return type;
  }
};
const isFavouriteValues = ['true', 'false'];
const contactTypeValues = validationParams.contactTypes;

export const parseFilterParams = (query) => {
  const { isFavourite, contactType } = query;
  const parsedIsFavourite = parseType(isFavourite, isFavouriteValues);
  const parsedContactType = parseType(contactType, contactTypeValues);
  return { isFavourite: parsedIsFavourite, contactType: parsedContactType };
};
