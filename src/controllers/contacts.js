import {
  createContact,
  deleteContactById,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { getFileUrl } from '../utils/getFileUrl.js';
// import { ROLES } from '../constants/index.js';

export const getContactsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const { _id: userId } = req.user;
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId,
  });
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const contact = await getContactById(contactId, userId);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const photo = req.file;
  const photoUrl = await getFileUrl(photo);
  const contact = await createContact({ ...req.body, photo: photoUrl }, userId);
  res.json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const contact = await deleteContactById(contactId, userId);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(204).send();
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const photo = req.file;
  const photoUrl = await getFileUrl(photo);
  const result = await updateContact(userId, contactId, {
    ...req.body,
    photo: photoUrl,
  });
  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};

// export const upsertContactController = async (req, res) => {
// const { contactId } = req.params;
// const { _id: userId } = req.user;
//   const result = await updateContact(userId, contactId, req.body, {
//     upsert: true,
//   });
//   if (!result) {
//     throw createHttpError(404, 'Contact not found');
//   }
//   const status = result.isNew ? 201 : 200;
//   res.status(status).json({
//     status,
//     message: `Successfully upserted a contact!`,
//     data: result.contact,
//   });
// };
