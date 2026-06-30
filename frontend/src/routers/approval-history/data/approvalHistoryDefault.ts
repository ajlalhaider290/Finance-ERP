import { ApprovalHistoryCreate } from "../interface";
export const defaultObject: ApprovalHistoryCreate = {
  taskId: "",
  documentType: "reimbursement",
  documentId: "",
  approverId: "",
  actionValue: "approved",
  userComment: undefined,
};
export default defaultObject;