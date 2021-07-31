require("dotenv").config();
const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const { kirimEmail } = require("../helpers/index");

// Daftar
exports.DaftarUser = async (req, res) => {
  const { username, email, password } = req.body;

  const usernameUser = await User.findOne({ username: username });
  const emailUser = await User.findOne({ email: email });

  if (usernameUser) {
    return res.status(404).json({
      status: false,
      message: "username sudah terdaftar",
    });
  }

  if (emailUser) {
    return res.status(404).json({
      status: false,
      message: "email sudah terdaftar",
    });
  }

  const hashPassword = await bcryptjs.hash(password, 10);
  const user = new User({
    username: username,
    email: email,
    password: hashPassword,
  });

  user.save();

  return res.status(201).json({
    message: "User Berhasil di daftarkan",
  });
};

// Login
exports.LoginUser = async (req, res) => {
  const { username, password } = req.body;

  const dataUser = await User.findOne({
    $or: [{ username: username }, { email: username }],
  });

  if (dataUser) {
    // jika username nya ada masuk prosess ini
    const passwordUser = await bcryptjs.compare(password, dataUser.password);

    if (passwordUser) {
      // jika passwordnya ada masuk prosses ini
      const data = {
        id: dataUser._id,
      };
      const token = await jsonwebtoken.sign(data, process.env.JSWT_SECRET);
      return res.status(200).json({
        message: "Berhasil",
        token: token,
      });
    } else {
      return res.status(200).json({
        status: false,
        message: "Password salah",
      });
    }
  } else {
    return res.status(200).json({
      status: false,
      message: "Username atau email tidak tersedia",
    });
  }
};

// user
exports.getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.id });
  return res.status(200).json({
    message: "Berhasil di panggil",
    data: user,
  });
};

// forgot password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(200).json({
      status: false,
      message: "Email tidak tersedia",
    });
  }

  const token = await jsonwebtoken.sign(
    {
      iduser: user._id,
    },
    process.env.JSWT_SECRET
  );

  await User.updateOne({ resetPasswordLink: token });

  const templateEmail = {
    from: "Azis",
    to: email,
    subject: "Link Reset Password",
    html: `<p>Silahkan Klik Link di bawah untuk Reset Password Anda</p> <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>`,
  };
  kirimEmail(templateEmail);

  return res.status(200).json({
    status: true,
    message: "Link reset password berhasil terkirim",
  });
};

// reset password
exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;

  const user = await User.findOne({ resetPasswordLink: token });
  if (user) {
    const hashPassword = await bcryptjs.hash(password, 10);
    user.password = hashPassword;
    await user.save();
    return res.status(201).json({
      status: true,
      message: "Password berhasil di ubah!!",
    });
  }
};
