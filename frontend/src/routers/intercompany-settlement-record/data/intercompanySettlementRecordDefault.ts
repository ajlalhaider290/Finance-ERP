import { IntercompanySettlementRecordCreate } from "../interface";
export const defaultObject: IntercompanySettlementRecordCreate = {
  transactionId: "",
  settlementDate: new Date(),
  settlementAmount: 0,
  currencyCode: "USD",
  status: "pending",
  recordedBy: "",
};
export default defaultObject;