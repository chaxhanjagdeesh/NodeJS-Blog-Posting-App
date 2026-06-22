const rateLimit = require("express-rate-limit");

function rateLimiter(minutes, maxRequests, message) {
  return rateLimit({
    windowMs: minutes * 60 * 1000,
    max: maxRequests,
    message,
  });
}

module.exports = {
  rateLimiter,
};