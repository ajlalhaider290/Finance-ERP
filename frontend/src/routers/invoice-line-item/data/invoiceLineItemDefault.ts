import { InvoiceLineItemCreate } from "../interface";
export const defaultObject: InvoiceLineItemCreate = {
  invoiceId: "",
  description: "",
  quantity: 1,
  unitPrice: 0,
  lineTotal: "0.00",
  taxCodeId: undefined,
};
export default defaultObject;