import { UserCreate } from "../interface";
export const defaultObject: UserCreate = {
  email: "",
  username: "",
  password: "",
  role: "employee",
  department: undefined,
  entityId: undefined,
};
export default defaultObject;