import { userDataType, userJwtPayload } from "@/types/userJwtPayload";
import { jwtVerify } from "jose";

const serverSecret = new TextEncoder().encode(process.env.JWT_SECRET);
const clientSecret = new TextEncoder().encode(
  process.env.NEXT_PUBLIC_JWT_SECRET
);

export const verifyAuth = async (token: string) => {
  try {
    if (serverSecret.length === 0)
      throw new Error("The environment variable secret key is not specified");
    const verified = await jwtVerify(token, serverSecret);
    return verified.payload as userJwtPayload;
  } catch (error) {
    throw new Error("Your token has expired!");
  }
};

export const verifyAuthOnClient = async (token: string) => {
  try {
    if (clientSecret.length === 0) {
      console.warn(
        "The environment variable NEXT_PUBLIC_JWT_SECRET key is not specified"
      );
      return;
    }
    const verified = await jwtVerify(token, clientSecret);
    return verified.payload as userDataType;
  } catch (error) {
    console.log("verifyAuthOnClient error: " + error);
  }
};
