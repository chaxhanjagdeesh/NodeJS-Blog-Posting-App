const redis = require("../config/redis");

const rateLimiter = (action,limit,windowInSeconds) => {
  return async (req, res, next) => {
    try {
      const identifier = req.user?._id || req.ip.replace(/^.*:/, "");
      const key = `rate-limit:${action}:${identifier}`;
      const requests = await redis.incr(key);

      if (requests === 1) {
        await redis.expire(key, windowInSeconds);
      }

      if (requests > limit) {
        return res.status(429).json({
          success: false,
          message: "Too many requests",
        });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = {rateLimiter};