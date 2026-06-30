import { JournalEntryCreate } from "../interface";
export const defaultObject: JournalEntryCreate = {
  entryDate: new Date(),
  description: "",
  sourceDocumentType: undefined,
  sourceDocumentId: undefined,
  entityId: "",
  postedBy: undefined,
  postedAt: new Date(),
  status: "draft",
};
export default defaultObject;