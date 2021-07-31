require("dotenv").config();
const jsonwebtoken = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({
      message: "Tidak ada token",
    });
  }

  const decode = jsonwebtoken.verify(token, process.env.JSWT_SECRET);
  req.id = decode.id;
  next();
};
