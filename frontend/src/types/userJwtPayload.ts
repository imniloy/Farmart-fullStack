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

export type userDataType = {
  id: number;
  email: string;
  user_type: string;
  username: string;
  iat: number;
  exp: number;
};
