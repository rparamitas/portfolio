"use server";

import bcrypt from "bcryptjs";
import { signUpSchema, SignUpType } from "@/schemas/signUp.schema";
import { prisma } from "@/lib/prisma";
import { getUserByEmail } from "@/lib/user";

export const SignUpAction = async (values: SignUpType) => {
  const validateFields = signUpSchema.safeParseAsync(values);

  if (!(await validateFields).success) {
    return {
      error: "Invalid input",
    };
  }

  const data = (await validateFields).data;
  if (!data) {
    return {
      error: "Invalid input",
    };
  }
  const { name, email, password } = data;
  const user = await getUserByEmail(email);
  if (user) {
    return {
      error: "Email already exists",
    };
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  return {
    success: true,
    message: "User created successfully",
  };
};
