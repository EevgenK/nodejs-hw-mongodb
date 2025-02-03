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
import { upload } from '../middlewares/multer.js';
// import { checkAuthorization } from '../middlewares/checkAuthorization.js';
// import { checkRoles } from '../middlewares/checkRoles.js';
// import { ROLES } from '../constants/index.js';

const router = Router();
router.use(authenticate);
router.get('/', ctrlWrapper(getContactsController));
router.get(
  '/:contactId',
  // checkRoles(ROLES.ADMINISTRATOR, ROLES.USER),
  // checkAuthorization,
  isValidId,
  ctrlWrapper(getContactByIdController),
);
router.post(
  '/',
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.delete(
  '/:contactId',
  // checkRoles(ROLES.ADMINISTRATOR, ROLES.USER),
  // checkAuthorization,
  isValidId,
  ctrlWrapper(deleteContactController),
);
router.patch(
  '/:contactId',
  // checkRoles(ROLES.ADMINISTRATOR, ROLES.USER),
  // checkAuthorization,
  isValidId,
  upload.single('photo'),
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);
// router.put('/:contactId',
// checkRoles(ROLES.ADMINISTRATOR, ROLES.USER),
// isValidId,
// upload.single('photo'),
// validateBody(updateContactSchema),
// ctrlWrapper(upsertContactController));

export default router;
