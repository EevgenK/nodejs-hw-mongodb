import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  patchContactController,
  // upsertContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const router = Router();
router.use(authenticate);

router.get(
  '/',
  // checkRoles(ROLES.ADMINISTRATOR, ROLES.USER),
  ctrlWrapper(getContactsController),
);
router.get(
  '/:contactId',
  checkRoles(ROLES.ADMINISTRATOR, ROLES.USER),
  isValidId,
  ctrlWrapper(getContactByIdController),
);
router.post(
  '/',
  // checkRoles(ROLES.ADMINISTRATOR, ROLES.USER),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.delete(
  '/:contactId',
  checkRoles(ROLES.ADMINISTRATOR, ROLES.USER),
  isValidId,
  ctrlWrapper(deleteContactController),
);
router.patch(
  '/:contactId',
  checkRoles(ROLES.ADMINISTRATOR, ROLES.USER),
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);
// router.put('/:contactId',
// isValidId,
// validateBody(updateContactSchema),
// ctrlWrapper(upsertContactController));

export default router;
