// import createHttpError from 'http-errors';
// import { ContactsCollection } from '../db/models/contact.js';

// export const checkAuthorization = async (req, res, next) => {
//   const { _id: userId } = req.user;
//   const { contactId } = req.params;
//   const contact = await ContactsCollection.findOne({
//     _id: contactId,
//     userId,
//   });
//   if (!contact) {
//     next(createHttpError(404, 'Contact not found'));
//     return;
//   }
//   if (contact) {
//     next();
//     return;
//   }
// };
