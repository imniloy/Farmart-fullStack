export type userJwtPayload = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    user_type: string;
  };
  iat: number;
  exp: number;
};
