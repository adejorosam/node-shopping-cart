const NodeCache = require("node-cache");

const cache = new NodeCache({ stdTTL: 10000 });

const verifyCache = (req, res, next) => {
  try {
    if (cache.has("category")) {
        console.log("Hi")

        return SuccessResponse(res, "Retrieved successfully", cache.get("category"),  200)
    }
    // console.log(cache)
    return next();
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = verifyCache;