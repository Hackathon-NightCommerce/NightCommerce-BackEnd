import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/users.entities";
import { AppError } from "../../errors";
import { TLogin, loginResponse } from "../../interfaces/login.interfaces";
import { userSchemaResponse } from "../../schemas/user.schema";
import { TUserResponse } from "../../interfaces/user.interfaces";

export const loginService = async (
  userData: TLogin
): Promise<loginResponse> => {
  const userRepository = AppDataSource.getRepository(Users);

  const userResponse = await userRepository.findOne({
    where: {
      email: userData.email,
    },
    relations: {
      address: true,
    },
  });

  if (!userResponse) {
    throw new AppError("Invalid credentials", 401);
  }

  const comparePassword = await bcrypt.compare(
    userData.password,
    userResponse.password
  );

  if (!comparePassword) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = jwt.sign(
    { email: userResponse.email, subject: userResponse.id },
    process.env.SECRET_KEY!,
    { expiresIn: "1d" }
  );

  const user: TUserResponse = userSchemaResponse.parse(userResponse);

  const response: loginResponse = {
    token: token,
    user: user,
  };

  return response;
};
