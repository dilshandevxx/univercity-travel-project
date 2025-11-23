function sendResponse(res, message, data = null, status = 200) {
  res.status(status).json({
    success: true,
    message,
    data,
  });
}

function sendError(res, message, status = 500) {
  res.status(status).json({
    success: false,
    message,
  });
}

module.exports = { sendResponse, sendError };
