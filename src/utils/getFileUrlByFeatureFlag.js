import { getEnvVar } from './getEnvVar.js';
import { saveFileToCloudinary } from './saveFileToCloudinary.js';
import { saveFileToUploadDir } from './saveFileToUploadDir.js';

// export const getFileUrl = async (file) => {
//   if (!file) return;
//   return await saveFileToUploadDir(file);
// };
export const getFileUrlByFeatureFlag = async (file, featureFlag) => {
  if (!file) return;
  if (getEnvVar(featureFlag) === 'true') {
    return await saveFileToCloudinary(file);
  } else {
    return await saveFileToUploadDir(file);
  }
};
