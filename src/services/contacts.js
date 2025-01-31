import createHttpError from 'http-errors';
import { SORT_ORDER } from '../constants/index.js';
import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { validatePagination } from '../validation/validatePagination.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const query = userId ? { userId } : {};

  const contactsQuery = ContactsCollection.find(query);
  if (filter.contactType || filter.contactType === null) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavourite || filter.isFavourite === null) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const contactsCount = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  if (contactsCount <= 0) {
    return [];
  }
  validatePagination(contactsCount, perPage, page);
  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  /*USING PROMISE ALL instead of 2 async fn, for to optimize loading */

  // const [contactsCount, contacts] = await Promise.all([
  //   ContactsCollection.find().merge(contactsQuery).countDocuments(),
  //   contactsQuery
  //     .skip(skip)
  //     .limit(limit)
  //     .sort({ [sortBy]: sortOrder })
  //     .exec(),
  // ]);
  // validatePagination(contactsCount, perPage, page);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  if (page > paginationData.totalPages || page < 1) {
    throw createHttpError(
      400,
      `Page request cannot be more than an amount of "totalPages": ${paginationData.totalPages}`,
    );
  }
  return { data: contacts, ...paginationData };
};
export const getContactById = async (contactId, userId) => {
  const query = { _id: contactId, userId };
  const contacts = await ContactsCollection.findOne(query);
  return contacts;
};
export const createContact = async (payload, userId) => {
  const contact = await ContactsCollection.create({ ...payload, userId });
  return contact;
};

export const deleteContactById = async (contactId, userId) => {
  try {
    const query = { _id: contactId, userId };
    const contact = await ContactsCollection.findOneAndDelete(query);
    return contact;
  } catch (error) {
    console.log(error);
  }
};

export const updateContact = async (
  userId,
  contactId,
  payload,
  options = {},
) => {
  const query = { _id: contactId, userId };
  const rawResult = await ContactsCollection.findOneAndUpdate(query, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });
  if (!rawResult || !rawResult.value) return null;
  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
