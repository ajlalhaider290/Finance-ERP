import { InvoiceCreate } from "../interface";
export const defaultObject: InvoiceCreate = {
  vendorId: undefined,
  customerId: undefined,
  invoiceNumber: "",
  invoiceDate: new Date(),
  dueDate: new Date(),
  currencyCode: "USD",
  subtotal: 0,
  taxAmount: 0,
  totalAmount: 0,
  paidAmount: 0,
  balanceDue: "0.00",
  paymentStatus: "unpaid",
  status: "draft",
  currentApproverId: undefined,
  invoiceDocumentId: undefined,
  entityId: "",
};
export default defaultObject;