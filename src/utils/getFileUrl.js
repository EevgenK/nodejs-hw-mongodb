import { saveFileToUploadDir } from './saveFileToUploadDir.js';

export const getFileUrl = async (file) => {
  if (!file) return;
  return await saveFileToUploadDir(file);
};
