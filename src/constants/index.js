import path from 'node:path';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};
export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
/*FOR BREVO USAGE*/
export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};
/*FOR HANDLEBAR USAGE*/
export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

/*FOR MULTER USAGE */
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
/*FOR CLOUDINARY USAGE*/
export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'API_KEY',
  API_SECRET: 'API_SECRET',
  ENABLE_CLOUDINARY: true,
};
/*FOR GOOGLE AUTH*/
export const PATH_JSON = path.join(process.cwd(), 'google-oauth.json');
export const GOOGLE_AUTH = {
  GOOGLE_CLIENT_ID: 'GOOGLE_AUTH_CLIENT_ID',
  GOOGLE_CLIENT_SECRET: 'GOOGLE_AUTH_CLIENT_SECRET',
};

/*FOR SWAGGER USAGE */
export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
/*FOR ROLES USAGE*/
// export const JWT_SECRET = 'JWT_SECRET';
// export const ROLES = {
//   ADMINISTRATOR: 'administrator',
//   USER: 'user',
// };
