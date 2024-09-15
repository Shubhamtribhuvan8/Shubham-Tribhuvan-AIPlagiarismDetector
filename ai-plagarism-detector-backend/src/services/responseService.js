exports.createResponse = (statusCode, message, data = null) => {
  return {
    statusCode,
    body: {
      message,
      data,
    },
  };
};
