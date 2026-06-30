import { ReimbursementDocumentCreate } from "../interface";
export const defaultObject: ReimbursementDocumentCreate = {
  reimbursementRequestId: "",
  documentType: "receipt",
  fileUrl: "",
  fileName: "",
  uploadedBy: "",
};
export default defaultObject;