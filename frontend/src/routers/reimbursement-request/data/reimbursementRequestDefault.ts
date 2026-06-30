import { ReimbursementRequestCreate } from "../interface";
export const defaultObject: ReimbursementRequestCreate = {
  employeeId: "",
  businessPurpose: "",
  expenseDate: new Date(),
  categoryId: "",
  costCenter: undefined,
  department: undefined,
  currencyCode: "USD",
  amount: 0,
  taxAmount: 0,
  totalAmount: "0.00",
  status: "draft",
  currentApproverId: undefined,
  paidDate: new Date(),
  entityId: "",
};
export default defaultObject;