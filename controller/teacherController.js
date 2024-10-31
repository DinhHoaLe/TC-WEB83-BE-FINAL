import TeacherModel from "../model/TeacherModel.js";
import jwt from "jsonwebtoken";
import UsersModel from "../model/UserModel.js";
import TeacherPositionModel from "../model/TeacherPositionModel.js";
import { v4 as uuidv4 } from "uuid";

const secretKey = process.env.SECRET_KEY || "mysecretkey";

const getTeachers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const teachers = await TeacherModel.find()
      // .skip(skip)
      // .limit(limit)
      .populate("userId", "name email phoneNumber address isActive")
      .populate("teacherPositionsId", "name code");

    const total = await TeacherModel.countDocuments();

    return res.status(200).json({
      data: teachers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
      data: null,
      success: false,
    });
  }
};

const getTeachersPage = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const teachers = await TeacherModel.find()
      // .skip(skip)
      // .limit(limit)
      .populate("userId", "name email phoneNumber address isActive")
      .populate("teacherPositionsId", "name code");

    const total = await TeacherModel.countDocuments();

    return res.status(200).json({
      data: teachers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
      data: null,
      success: false,
    });
  }
};

const createTeacher = async (req, res) => {
  try {
    const { name, phoneNumber, email, identity, address, position, DOB } =
      req.body;
    console.log(req.body);
    let code;
    let isUnique = false;
    while (!isUnique) {
      code = Math.floor(1000000000 + Math.random() * 9000000000).toString();
      const existingTeacher = await TeacherModel.findOne({ code });
      if (!existingTeacher) isUnique = true;
    }

    const existingEmail = await UsersModel.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "Email đã tồn tại, vui lòng nhập email khác." });
    }

    const newTeacherPosition = await TeacherPositionModel.findOne({
      code: position,
    });

    if (!newTeacherPosition) {
      return res.status(400).json({ message: "Không có vị trí này!" });
    }

    const newUser = await UsersModel.create({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      identity: identity,
      dob: DOB,
      role: "TEACHER",
    });

    const newTeacher = await TeacherModel.create({
      userId: newUser._id,
      teacherPositionsId: newTeacherPosition._id,
      role: "TEACHER",
      code: code,
      startDate: new Date(),
      endDate: new Date(),
      degrees: [
        {
          type: "abc",
          school: "abc",
          major: "abc",
          year: "2024",
          isGraduated: "yes",
        },
      ],
    });

    return res.status(201).json({
      message: "Giáo viên đã được tạo thành công.",
      dataNewTeacher: newTeacher,
      dataNewTeacherPosition: newTeacherPosition,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
      data: null,
      success: false,
    });
  }
};

const getTeacherPositions = async (req, res) => {
  try {
    const positions = await TeacherPositionModel.find();
    return res.status(200).json({
      data: positions,
      success: true,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
      data: null,
      success: false,
    });
  }
};

const createTeacherPosition = async (req, res) => {
  try {
    const { name, code, des, isActive } = req.body;

    const existingPosition = await TeacherPositionModel.findOne({ code });
    if (existingPosition) {
      return res.status(400).json({
        message: "Code của vị trí đã tồn tại, vui lòng chọn mã khác.",
        success: false,
      });
    }

    const newPosition = new TeacherPositionModel({
      name,
      code,
      des,
      isActive,
    });

    await newPosition.save();

    return res.status(201).json({
      message: "Vị trí công tác đã được tạo thành công.",
      data: newPosition,
      success: true,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
      data: null,
      success: false,
    });
  }
};

export {
  getTeachers,
  getTeachersPage,
  createTeacher,
  getTeacherPositions,
  createTeacherPosition,
};
