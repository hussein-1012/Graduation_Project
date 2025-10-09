const jwt = require("jsonwebtoken");
const httpStatus = require("../utils/httpStatus");

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({
      status: httpStatus.FAIL,
      message: "Access Denied. No Token Provided",
    });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(400).json({
      status:  httpStatus.FAIL,
      message: "Invalid token format. Use 'Bearer <token>'",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); 
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({
      status: httpStatus.FAIL,
      message: "Invalid or Expired Token",
    });
  }
}

module.exports = authMiddleware;
