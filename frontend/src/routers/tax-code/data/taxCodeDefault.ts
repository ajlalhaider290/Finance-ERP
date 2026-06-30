import { TaxCodeCreate } from "../interface";
export const defaultObject: TaxCodeCreate = {
  taxCodeName: "",
  rate: 0,
  description: undefined,
  entityId: "",
  isActive: true,
};
export default defaultObject;