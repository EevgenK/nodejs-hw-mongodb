import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  console.log('hello from getAllContacts');
  const contacts = await ContactsCollection.find();
  return contacts;
};
export const getContactById = async (studentId) => {
  const contacts = await ContactsCollection.findById(studentId);
  return contacts;
};
