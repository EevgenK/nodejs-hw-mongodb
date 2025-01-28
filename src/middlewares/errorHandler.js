import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err,
    });
    return;
  }
  // if (err.isJoi) {
  //   return res.status(400).json({
  //     status: 400,
  //     message: 'Joi error',
  //     data: err.details,
  //   });
  // }
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};
