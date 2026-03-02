export const sendSuccess = (res, data, statusCode = 200, message = 'Request successful') => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
