import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import userRepo from "../repo/userRepo.js";

const getAllUsers = async (request, response) => {
  try {
    const users = await userRepo.getAllUsers();
    return response.json(users);
  } catch (error) {
    return response.json(`Error in getting users: ${error}`);
  }
};

const signUpUser = async (request, response) => {
  const userData = request.body;
  try {
    const existingUserName = await userRepo.getUserByUserName(
      userData.userName
    );
    if (existingUserName != undefined)
      throw new Error("User with this username already exists");

    const hashedPassword = await userRepo.getPasswordHash(userData.password, 5);

    await userRepo.createUser(
      userData.userName,
      userData.firstName,
      userData.lastName,
      userData.email,
      hashedPassword,
      userData.role
    );

    const jwtToken = await userRepo.createJwtToken(
      userData.userName,
      "user",
      process.env.secret
    );

    return response.json({ token: jwtToken, role: existingUserName.role });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let validationErrors = "";
      for (const field in error.errors) {
        validationErrors += error.errors[field].message;
      }
      console.log(`Validation errors in signUpUser: ${validationErrors}`);
      return response.json(
        `Validation errors in signUpUser: ${validationErrors}`
      );
    }
    return response.json(`Error in signUpUser:` + error.message);
  }
};

const logInUser = async (request, response) => {
  const userName = request.body.userName;
  const password = request.body.password;
  try {
    const existingUserName = await userRepo.getUserByUserName(userName);
    if (existingUserName == undefined)
      throw new Error("User with this username doesn't exists");

    if (!bcrypt.compareSync(password, existingUserName.password))
      throw new Error("Password is wrong");

    const jwtToken = await userRepo.createJwtToken(
      userName,
      existingUserName.role,
      process.env.secret
    );

    return response.json({ token: jwtToken, role: existingUserName.role });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let validationErrors = "";
      for (const field in error.errors) {
        validationErrors += error.errors[field].message;
      }
      console.log(`Validation errors in logInUser: ${validationErrors}`);
      return response.json(
        `Validation errors in logInUser: ${validationErrors}`
      );
    }
    return response.json(`Error in logInUser: ` + error.message);
  }
};

const getYourProfile = async (request, response) => {
  try {
    const userName = response.locals.user.userName; // iz tokena
    const user = await userRepo.getUserByUserName(userName);

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    return response.json({
      userName: user.userName,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    response
      .status(500)
      .json({
        message: "Error while getting your profile",
        error: error.message,
      });
  }
};

export default {
  getAllUsers,
  signUpUser,
  logInUser,
  getYourProfile,
};
