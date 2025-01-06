import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};
export const getContactById = async (studentId) => {
  const contacts = await ContactsCollection.findById(studentId);
  return contacts;
};
