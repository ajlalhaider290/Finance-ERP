import { z } from "zod";
import { Op } from "sequelize";
import { Customer } from "../../models/customer";

export const customerQueryValidator = z.object({
	page: z.coerce.number().optional(),
	pageSize: z.coerce.number().optional(),
});


export const customerParamValidator = z.object({
	customerId: z.uuid("Invalid UUID format"),
});


const _customerBaseSchema = z.object({
	customerName: z.string({error: "Customer Name is required"}),
	contactEmail: z.email("Invalid email format").nullable().optional().or(z.literal('')),
	contactPhone: z.string().regex(/^[+]?[0-9\s\-()]+$/, "Invalid phone number format").nullable().optional().or(z.literal('')),
	address: z.string().nullable().optional().or(z.literal('')),
	entityId: z.uuid("Invalid UUID format"),
});

export const createCustomerPayloadValidator = _customerBaseSchema.refine(async (data) => {
		
  const existingCustomer = await Customer.findOne({
    where: {
    	customerName: data.customerName
    },
  });
  return !existingCustomer;
}, {
  message: 'This combination of customerName already exists',
  path: ['customerName'],
});

export const updateCustomerPayloadValidator = (customerId: string) => _customerBaseSchema.refine(async (data) => {
		
    const whereClauseCustomer: any = {
        customerName: data.customerName
    };

    if (customerId) {
		whereClauseCustomer.customerId = { [Op.ne]: customerId}
    }

    const existingCustomer = await Customer.findOne({
      where: whereClauseCustomer,
    });
    return !existingCustomer;
  }, {
    message: 'This combination of customerName already exists',
    path: ['customerName'],
  });

