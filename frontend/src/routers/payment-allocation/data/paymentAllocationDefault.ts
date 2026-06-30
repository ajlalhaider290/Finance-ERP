import { PaymentAllocationCreate } from "../interface";
export const defaultObject: PaymentAllocationCreate = {
  paymentId: "",
  allocatedToType: "invoice",
  allocatedToId: "",
  allocatedAmount: 0,
};
export default defaultObject;