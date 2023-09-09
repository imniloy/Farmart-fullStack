import { userJwtPayload } from "@/types/userJwtPayload";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export const verifyAuth = async (token: string) => {
  try {
    if (secret.length === 0)
      throw new Error("The environment variable secret key is not specified");
    const verified = await jwtVerify(token, secret);
    return verified.payload as userJwtPayload;
  } catch (error) {
    throw new Error("Your token has expired!");
  }
};
