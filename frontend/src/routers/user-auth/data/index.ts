import { UserRegisterRequest } from "../types";
export const defaultObject: UserRegisterRequest = {
  email: "",
  username: "",
  password: "",
  role: "employee",
  department: undefined,
  entityId: undefined,
};
export default defaultObject;