export type User = {
  id: string;
  email: string;
  fullName: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};
