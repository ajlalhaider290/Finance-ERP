import { IntercompanyTransactionCreate } from "../interface";
export const defaultObject: IntercompanyTransactionCreate = {
  sourceEntityId: "",
  targetEntityId: "",
  transactionDate: new Date(),
  transactionType: "billing",
  currencyCode: "USD",
  amount: 0,
  lineDetail: [],
  taxAmount: 0,
  status: "draft",
  currentApproverId: undefined,
};
export default defaultObject;