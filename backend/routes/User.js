const express = require("express");
const router = express.Router();
const middleware = require("../middleware/middleware");
const {
  DaftarUser,
  LoginUser,
  getSingleUser,
  forgotPassword,
  resetPassword,
} = require("../controller/user.controller");
const {
  runValidation,
  validationDaftar,
  validationLogin,
} = require("../validation/index");

router.post("/daftar", validationDaftar, runValidation, DaftarUser);
router.post("/login", validationLogin, runValidation, LoginUser);
router.get("/user", middleware, getSingleUser);
router.put("/forgotPassword", forgotPassword);
router.put("/resetpassword", resetPassword);

module.exports = router;
