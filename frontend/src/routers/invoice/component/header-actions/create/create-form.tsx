import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { FormFieldSelect, FormFieldText, FormFieldDate } from '@/components/FormFieldWrapper';
import { Hash, DollarSign, Percent, Wallet, Scale } from 'lucide-react';
import { InvoiceCreate } from '../../../interface';
import { useVendorOptions } from '../../../../vendor/hooks/useVendorOptions';
import { useCustomerOptions } from '../../../../customer/hooks/useCustomerOptions';
import { useUserOptions } from '../../../../user/hooks/useUserOptions';
import { useInvoiceDocumentOptions } from '../../../../invoice-document/hooks/useInvoiceDocumentOptions';
import { useCompanyEntityOptions } from '../../../../company-entity/hooks/useCompanyEntityOptions';


const InvoiceForm = memo(() => {
	const form = useFormContext<InvoiceCreate>();


	const { data : vendorIds, isLoading : isLoadingVendorIds } = useVendorOptions();
	const { data : customerIds, isLoading : isLoadingCustomerIds } = useCustomerOptions();
	const { data : currentApproverIds, isLoading : isLoadingCurrentApproverIds } = useUserOptions();
	const { data : invoiceDocumentIds, isLoading : isLoadingInvoiceDocumentIds } = useInvoiceDocumentOptions();
	const { data : entityIds, isLoading : isLoadingEntityIds } = useCompanyEntityOptions();




	return (
		<Form {...form}>
			<div className="flex flex-col gap-4">
<FormFieldSelect
                    name="vendorId"
                    label="Vendor"
                    placeholder="Select Vendor"
                    options={vendorIds}
                    loading={isLoadingVendorIds}
                />
<FormFieldSelect
                    name="customerId"
                    label="Customer"
                    placeholder="Select Customer"
                    options={customerIds}
                    loading={isLoadingCustomerIds}
                />
<FormFieldText
                    name="invoiceNumber"
                    label="Invoice Number"
                    required
                    icon={<Hash className="h-4 w-4" />}
                    placeholder="Enter Invoice Number"
                />
<FormFieldDate
                    name="invoiceDate"
                    label="Invoice Date"
                    required
                    placeholder="Select Invoice Date"
                />
<FormFieldDate
                    name="dueDate"
                    label="Due Date"
                    required
                    placeholder="Select Due Date"
                />
<FormFieldText
                    name="currencyCode"
                    label="Currency Code"
                    required
                    icon={<DollarSign className="h-4 w-4" />}
                    placeholder="Enter Currency Code"
                />
<FormFieldText
                    name="subtotal"
                    label="Subtotal"
                    required
                    type="decimal"
                    placeholder="Enter Subtotal"
                />
<FormFieldText
                    name="taxAmount"
                    label="Tax Amount"
                    required
                    icon={<Percent className="h-4 w-4" />}
                    type="decimal"
                    placeholder="Enter Tax Amount"
                />
<FormFieldText
                    name="totalAmount"
                    label="Total Amount"
                    required
                    type="decimal"
                    placeholder="Enter Total Amount"
                />
<FormFieldText
                    name="paidAmount"
                    label="Paid Amount"
                    required
                    icon={<Wallet className="h-4 w-4" />}
                    type="decimal"
                    placeholder="Enter Paid Amount"
                />
<FormFieldText
                    name="balanceDue"
                    label="Balance Due"
                    required
                    icon={<Scale className="h-4 w-4" />}
                    placeholder="Enter Balance Due"
                />
<FormFieldSelect
                    name="paymentStatus"
                    label="Payment Status"
                    required
                    placeholder="Select Payment Status"
                    options={[{"value":"unpaid","label":"unpaid"},{"value":"partially paid","label":"partially paid"},{"value":"paid","label":"paid"},{"value":"overdue","label":"overdue"},{"value":"cancelled","label":"cancelled"}]}
                />
<FormFieldSelect
                    name="status"
                    label="Status"
                    required
                    placeholder="Select Status"
                    options={[{"value":"draft","label":"draft"},{"value":"submitted","label":"submitted"},{"value":"under review","label":"under review"},{"value":"approved","label":"approved"},{"value":"rejected","label":"rejected"},{"value":"returned","label":"returned"},{"value":"paid","label":"paid"},{"value":"cancelled","label":"cancelled"}]}
                />
<FormFieldSelect
                    name="currentApproverId"
                    label="Current Approver"
                    placeholder="Select Current Approver"
                    options={currentApproverIds}
                    loading={isLoadingCurrentApproverIds}
                />
<FormFieldSelect
                    name="invoiceDocumentId"
                    label="Invoice Document"
                    placeholder="Select Invoice Document"
                    options={invoiceDocumentIds}
                    loading={isLoadingInvoiceDocumentIds}
                />
<FormFieldSelect
                    name="entityId"
                    label="Entity"
                    required
                    placeholder="Select Entity"
                    options={entityIds}
                    loading={isLoadingEntityIds}
                />
			</div>
		</Form>
	);
});
InvoiceForm.displayName = 'InvoiceForm';

export default InvoiceForm;