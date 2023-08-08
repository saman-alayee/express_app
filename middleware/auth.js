const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-header");
  if (!token) res.status(401).send("access denied.no token provided.");
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
  } catch (ex) {
    res.status(400).send("invalid token");
  }
}
