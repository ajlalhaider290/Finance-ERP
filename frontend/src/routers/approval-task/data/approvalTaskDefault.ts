import { ApprovalTaskCreate } from "../interface";
export const defaultObject: ApprovalTaskCreate = {
  documentType: "reimbursement",
  documentId: "",
  assignedToUserId: undefined,
  assignedToRole: undefined,
  status: "pending",
  userComment: undefined,
  actionedBy: undefined,
  actionedAt: new Date(),
};
export default defaultObject;