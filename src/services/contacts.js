import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};
export const getContactById = async (contactId) => {
  try {
    const contacts = await ContactsCollection.findById(contactId);
    return contacts;
  } catch (error) {
    console.log(error);
  }
};
export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const deleteContactById = async (contactId) => {
  try {
    const contact = await ContactsCollection.findOneAndDelete({
      _id: contactId,
    });
    return contact;
  } catch (error) {
    console.log(error);
  }
};

export const updateContact = async (contactId, payload, options = {}) => {
  try {
    const rawResult = await ContactsCollection.findOneAndUpdate(
      { _id: contactId },
      payload,
      {
        new: true,
        includeResultMetadata: true,
        ...options,
      },
    );
    if (!rawResult || !rawResult.value) return null;
    return {
      contact: rawResult.value,
      isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
  } catch (error) {
    console.log(error);
  }
};
