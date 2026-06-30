import { ReimbursementStatusHistoryCreate } from "../interface";
export const defaultObject: ReimbursementStatusHistoryCreate = {
  reimbursementRequestId: "",
  oldStatus: undefined,
  newStatus: "",
  changedBy: "",
  userComment: undefined,
};
export default defaultObject;