import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { FormFieldSelect, FormFieldText } from '@/components/FormFieldWrapper';
import { AlignLeft, Calculator, DollarSign } from 'lucide-react';
import { InvoiceLineItemUpdate } from '../../../interface';
import { useInvoiceOptions } from '../../../../invoice/hooks/useInvoiceOptions';
import { useTaxCodeOptions } from '../../../../tax-code/hooks/useTaxCodeOptions';


const InvoiceLineItemForm = memo(() => {
	const form = useFormContext<InvoiceLineItemUpdate>();


	const { data : invoiceIds, isLoading : isLoadingInvoiceIds } = useInvoiceOptions();
	const { data : taxCodeIds, isLoading : isLoadingTaxCodeIds } = useTaxCodeOptions();




	return (
		<Form {...form}>
			<div className="flex flex-col gap-4">
<FormFieldSelect
                    name="invoiceId"
                    label="Invoice"
                    required
                    placeholder="Select Invoice"
                    options={invoiceIds}
                    loading={isLoadingInvoiceIds}
                />
<FormFieldText
                    name="description"
                    label="Description"
                    required
                    icon={<AlignLeft className="h-4 w-4" />}
                    placeholder="Enter Description"
                />
<FormFieldText
                    name="quantity"
                    label="Quantity"
                    required
                    icon={<Calculator className="h-4 w-4" />}
                    type="decimal"
                    placeholder="Enter Quantity"
                />
<FormFieldText
                    name="unitPrice"
                    label="Unit Price"
                    required
                    icon={<DollarSign className="h-4 w-4" />}
                    type="decimal"
                    placeholder="Enter Unit Price"
                />
<FormFieldText
                    name="lineTotal"
                    label="Line Total"
                    required
                    placeholder="Enter Line Total"
                />
<FormFieldSelect
                    name="taxCodeId"
                    label="Tax Code"
                    placeholder="Select Tax Code"
                    options={taxCodeIds}
                    loading={isLoadingTaxCodeIds}
                />
			</div>
		</Form>
	);
});
InvoiceLineItemForm.displayName = 'InvoiceLineItemForm';

export default InvoiceLineItemForm;