import UserModal from "../model/UserModel.js";
import { v4 as uuidv4 } from "uuid";
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secretKey = process.env.SECRET_KEY || "mysecretkey";

const saltRounds = 10;
const create = async (req, res) => {
  try {
    let { userName, password } = req.body;

    if (!userName) {
      return res.status(400).send("Please enter your username");
    } else {
      userName = userName.trim();
    }

    if (!password) {
      return res.status(400).send("Please enter your password");
    } else {
      password = password.trim();
    }
    const isExistUser = await UserModal.findOne({ userName: userName }).exec();
    console.log(isExistUser);

    if (isExistUser) {
      return res.status(400).json({
        message: "userName already exists",
        data: null,
        success: false,
      });
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(403).send({
        message:
          "Password is invalid. It must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and be at least 8 characters long.",
        data: null,
        success: false,
      });
    }

    const hashPassword = bcrypt.hashSync(password, saltRounds);
    const newUser = {
      userName: userName,
      password: hashPassword,
    };

    const user = await UserModal.create(newUser);
    if (user) {
      return res.status(200).json({
        message: "Sign up successful",
        data: user,
        success: true,
      });
    } else {
      return res.status(500).json({
        message: "Sign up failed",
        data: null,
        success: false,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      data: null,
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    let { userName, password } = req.body;

    if (!userName) throw new Error("email is required!");
    else {
      userName = userName.trim();
    }
    if (!password) throw new Error("password is required!");
    else {
      password = password.trim();
    }

    const checkUserName = await UserModal.findOne({ userName });
    if (!checkUserName) {
      return res.status(403).json({
        message: "UserName is incorrect",
        data: null,
        success: false,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      checkUserName.password
    );
    if (!isPasswordCorrect) {
      return res.status(403).json({
        message: "Password is incorrect",
        data: null,
        success: false,
      });
    }

    const userData = {
      id: checkUserName.id,
      userName: checkUserName.userName,
    };
    const token = jwt.sign(userData, secretKey, { expiresIn: "1h" });


    res.cookie('token', token, {
      httpOnly: true,  
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'Strict',  
      maxAge: 3600000, 
    });


    return res.status(200).json({
      data: token,
      message: "Login successful!",
      success: true,
    });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const logout = async (req, res) => {
  try {
    // Xóa cookie chứa token
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });

    return res.status(200).json({
      message: "Logout successful!",
      success: true,
    });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({
      message: "Logout failed",
      success: false,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    let { email } = req.body;
    if (!email) {
      return res.status(200).send("email is required.");
    } else {
      email = email.trim();
    }

    const isExistUser = await UserModal.findOne({ email: email }).exec();
    if (!isExistUser) {
      return res.status(400).send("email not found");
    }
    const generatorOTP = otpGenerator.generate(6, { digits: true });

    await otpModel.create({ otp: generatorOTP, email: email });
    console.log(generatorOTP);

    return res.status(200).send({ otp: generatorOTP });
  } catch (err) {
    console.error("Lỗi khi đổi mật khẩu:", err);
    return res.status(500).send("Lỗi hệ thống");
  }
};

const resetPassword = async (req, res) => {
  try {
    let { otp, password } = req.body;
    const MAX_OTP_TIME = 5 * 60 * 1000; // 5 minutes
    const validOTP = await otpModel.findOne({ otp: otp });

    if (validOTP) {
      // Kiểm tra xem hết hạn hay chưa
      const date = new Date();
      const currentDate = date.getTime();
      const diffTime = currentDate - validOTP.createdAt;
      if (diffTime > MAX_OTP_TIME) {
        await otpModel.findOneAndDelete({ otp: otp });

        res.send("OTP hết hạn");
      } else {
        const user = await UserModal.findOne({ email: validOTP.email });
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        user.password = hashedPassword;

        await user.save();

        await otpModel.findOneAndDelete({ otp });
        return res.status(200).send("ok");
      }
    } else {
      return res.send("OTP failed");
    }
  } catch (err) {
    console.error("Lỗi khi đổi mật khẩu:", err);
    return res.status(500).send("Lỗi hệ thống");
  }
};

export { create, login, forgotPassword, resetPassword, logout };
