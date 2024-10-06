import ProfileModal from "../model/profileModal.js";
import UserModal from "../model/userModal.js";
import jwt from "jsonwebtoken";
const secretKey = process.env.SECRET_KEY || "mysecretkey";

const createInfor = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const {
      firstName,
      lastName,
      birthdate,
      birthplace,
      nationality,
      educationalProcess,
    } = req.body;

    const user = await UserModal.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newProfile = {
      userID: userId,
      firstName,
      lastName,
      birthdate,
      birthplace,
      nationality,
      educationalProcess,
    };

    const createNewProfile = await ProfileModal.create(newProfile);
    console.log(createNewProfile);
    if (createNewProfile) {
      return res.status(200).json({
        message: "Profile updated successfully",
        data: newProfile,
        success: true,
      });
    } else {
      return res.status(400).json({
        message: "Profile updated failed",
        data: null,
        success: false,
      });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      message: "Internal server error",
      data: null,
      success: false,
    });
  }
};

const viewProfile = async (req, res) => {
  try {
    const { profileId } = req.params;

    const profile = await ProfileModal.findById(profileId);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    return res.status(200).json({
      message: "Profile found",
      data: profile,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}


const updateProfile= async (req, res) => {
  try {
    const userId = req.user.id;  
    const { profileId } = req.params;  
    const profile = await ProfileModal.findById(profileId);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    if (profile.userID.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to edit this profile" });
    }


    const updatedProfile = await ProfileModal.findByIdAndUpdate(profileId, req.body, { new: true });
    return res.status(200).json({
      message: "Profile updated successfully",
      data: updatedProfile,
      success: true,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}


export { createInfor, viewProfile, updateProfile };
