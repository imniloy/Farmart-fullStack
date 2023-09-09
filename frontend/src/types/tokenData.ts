import { JwtPayload } from "jsonwebtoken";

export type tokenDataType = {
  jwt: JwtPayload;
  user: {
    id: number;
    username: string;
    email: string;
    user_type: string;
  };
};
