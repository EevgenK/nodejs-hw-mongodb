import { OAuth2Client } from 'google-auth-library';
import { readFile } from 'fs/promises';
import { getEnvVar } from './getEnvVar.js';
import { GOOGLE_AUTH, PATH_JSON } from '../constants/index.js';
import createHttpError from 'http-errors';

const oauthConfig = JSON.parse(await readFile(PATH_JSON));

const googleOAuthClient = new OAuth2Client({
  clientId: getEnvVar(GOOGLE_AUTH.GOOGLE_CLIENT_ID),
  clientSecret: getEnvVar(GOOGLE_AUTH.GOOGLE_CLIENT_SECRET),
  redirectUri: oauthConfig.web.redirect_uris[0],
});
export const generateAuthUrl = () =>
  googleOAuthClient.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });

export const validateCode = async (code) => {
  const response = await googleOAuthClient.getToken(code);
  if (!response.tokens.id_token) throw createHttpError(401, 'Unauthorized');

  const ticket = await googleOAuthClient.verifyIdToken({
    idToken: response.tokens.id_token,
  });

  return ticket;
};

export const getFullNameFromGoogleTokenPayload = (payload) => {
  let fullName = 'Guest';
  if (payload.given_name && payload.family_name) {
    fullName = `${payload.given_name} ${payload.family_name}`;
  } else if (payload.given_name) {
    fullName = payload.given_name;
  }

  return fullName;
};
