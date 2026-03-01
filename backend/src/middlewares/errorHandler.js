export const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const details = err.details;

  return res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(details ? { details } : {}),
    },
  });
};
