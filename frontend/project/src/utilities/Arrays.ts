import type { LoginInputsType, RegisterInputsType } from "./Interfaces";

export const registerInputs: RegisterInputsType[] = [
  { name: "username", type: "text", label: "Username" },
  { name: "email", type: "text", label: "Email" },
  { name: "password", type: "password", label: "Password" },
  { name: "rePassword", type: "password", label: "Confirm Password" },
].map((inp) =>
  inp.name === "rePassword"
    ? { ...inp, placeholder: "Please confirm Password" }
    : { ...inp, placeholder: `Please enter ${inp.label}` },
);

export const loginInputs: LoginInputsType[] = [
  { name: "username", type: "text", label: "Username" },
  { name: "password", type: "password", label: "Password" },
].map((inp) =>
  inp.name === "username"
    ? { ...inp, placeholder: `Please enter  your ${inp.label} or email` }
    : { ...inp, placeholder: `Please enter your ${inp.label} ` },
);
