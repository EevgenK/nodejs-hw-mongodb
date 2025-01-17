import { model, Schema } from 'mongoose';
import createHttpError from 'http-errors';
import { validationParams } from '../../validation/contacts.js';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: { type: String },
    isFavourite: {
      type: Boolean,
      default: false,
    },

    contactType: {
      type: String,
      required: true,
      enum: validationParams.contactTypes,
      default: 'personal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
contactsSchema.post('save', (error, data, next) => {
  throw createHttpError(400, `${error.message}`);
});
export const ContactsCollection = model('contacts', contactsSchema);
