import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { FormFieldSelect, FormFieldText } from '@/components/FormFieldWrapper';
import { FileText } from 'lucide-react';
import { PaymentAllocationCreate } from '../../../interface';
import { usePaymentOptions } from '../../../../payment/hooks/usePaymentOptions';


const PaymentAllocationForm = memo(() => {
	const form = useFormContext<PaymentAllocationCreate>();


	const { data : paymentIds, isLoading : isLoadingPaymentIds } = usePaymentOptions();




	return (
		<Form {...form}>
			<div className="flex flex-col gap-4">
<FormFieldSelect
                    name="paymentId"
                    label="Payment"
                    required
                    placeholder="Select Payment"
                    options={paymentIds}
                    loading={isLoadingPaymentIds}
                />
<FormFieldSelect
                    name="allocatedToType"
                    label="Allocated To Type"
                    required
                    placeholder="Select Allocated To Type"
                    options={[{"value":"invoice","label":"invoice"},{"value":"reimbursement","label":"reimbursement"},{"value":"intercompany_transaction","label":"intercompany_transaction"}]}
                />
<FormFieldText
                    name="allocatedToId"
                    label="Allocated To Id"
                    required
                    icon={<FileText className="h-4 w-4" />}
                    placeholder="Enter Allocated To Id"
                />
<FormFieldText
                    name="allocatedAmount"
                    label="Allocated Amount"
                    required
                    type="decimal"
                    placeholder="Enter Allocated Amount"
                />
			</div>
		</Form>
	);
});
PaymentAllocationForm.displayName = 'PaymentAllocationForm';

export default PaymentAllocationForm;