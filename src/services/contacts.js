import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  try {
    const contacts = await ContactsCollection.find();
    return contacts;
  } catch (error) {
    console.log(error);
  }
};
export const getContactById = async (studentId) => {
  try {
    const contacts = await ContactsCollection.findById(studentId);
    return contacts;
  } catch (error) {
    console.log(error);
  }
};
