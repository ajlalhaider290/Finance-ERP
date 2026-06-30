import { PaymentCreate } from "../interface";
export const defaultObject: PaymentCreate = {
  paymentDate: new Date(),
  amount: 0,
  currencyCode: "USD",
  paymentMethod: "bank_transfer",
  status: "pending",
  paidBy: undefined,
  entityId: "",
};
export default defaultObject;