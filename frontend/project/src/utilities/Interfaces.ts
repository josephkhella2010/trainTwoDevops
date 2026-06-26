export interface UserType {
  _id: string;
  username: string;
  email: string;
  password: string;
  items: [];
  userId?: string;
}

export interface RegisterInputsType {
  name: string;
  type: string;
  label: string;
  placeholder: string;
}
export interface LoginInputsType {
  name: string;
  type: string;
  label: string;
  placeholder: string;
}
export interface RegisterUserType {
  username: string;
  email: string;
  password: string;
  rePassword: string;
}
export interface LoginUserType {
  username: string;
  password: string;
}
