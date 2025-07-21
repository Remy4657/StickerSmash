export type ResponseAPI = {
  DT: object;
  EC: number | string;
  EM: string;
};

type UserData = {
  access_token: string;
  refresh_token: string;
  role: string;
  email: string;
};

export type LoginResponse = {
  EC: number;
  EM: string;
  DT: UserData;
};
