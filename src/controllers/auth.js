import {
  loginUser,
  logoutUser,
  refreshUsersSession,
  registerUser,
  requestResetToken,
  resetPassword,
} from '../services/auth.js';
// import { THIRTY_DAYS, FIFTEEN_MINUTES } from '../constants/index.js';
import { setupSession } from '../utils/createSessions.js';
export const registerUserController = async (req, res, next) => {
  const user = await registerUser(req.body);
  res.json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};
export const loginUserController = async (req, res, next) => {
  const session = await loginUser(req.body);
  setupSession(res, session);
  res.json({
    status: 201,
    message: 'Successfully logged in an user!',
    data: { accessToken: session.accessToken },
  });
};
export const logoutUserController = async (req, res, next) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};
export const refreshUsersSessionController = async (req, res, next) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });
  setupSession(res, session);
  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
export const requestResetEmailController = async (req, res, next) => {
  await requestResetToken(req.body.email);
  res.json({
    status: 200,
    message: 'Reset password email has been successfully sent!',
    data: {},
  });
};

export const resetPasswordController = async (req, res, next) => {
  await resetPassword(req.body);
  res.json({
    message: 'Password has been successfully reset.',
    status: 200,
    data: {},
  });
};
