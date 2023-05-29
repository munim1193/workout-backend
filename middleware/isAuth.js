const jwt = require("jsonwebtoken");

function isAuth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ messages: "Token is required" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded.username) {
    return res.status(403).json({ messages: "Token is invalid" });
  }

  req.user = {
    username: decoded.username,
    id: decoded.id,
    role: decoded.role,
  };
  next();
}

module.exports = { isAuth };
