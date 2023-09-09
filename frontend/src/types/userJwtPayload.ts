export type userJwtPayload = {
  jwt: string;
  user: {
    id: number;
    email: string;
    user_type: string;
  };
  iat: number;
  exp: number;
};
