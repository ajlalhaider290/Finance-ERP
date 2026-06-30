import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { FormFieldDate, FormFieldText, FormFieldSelect } from '@/components/FormFieldWrapper';
import { DollarSign } from 'lucide-react';
import { PaymentCreate } from '../../../interface';
import { useUserOptions } from '../../../../user/hooks/useUserOptions';
import { useCompanyEntityOptions } from '../../../../company-entity/hooks/useCompanyEntityOptions';


const PaymentForm = memo(() => {
	const form = useFormContext<PaymentCreate>();


	const { data : paidBies, isLoading : isLoadingPaidBies } = useUserOptions();
	const { data : entityIds, isLoading : isLoadingEntityIds } = useCompanyEntityOptions();




	return (
		<Form {...form}>
			<div className="flex flex-col gap-4">
<FormFieldDate
                    name="paymentDate"
                    label="Payment Date"
                    required
                    placeholder="Select Payment Date"
                />
<FormFieldText
                    name="amount"
                    label="Amount"
                    required
                    type="decimal"
                    placeholder="Enter Amount"
                />
<FormFieldText
                    name="currencyCode"
                    label="Currency Code"
                    required
                    icon={<DollarSign className="h-4 w-4" />}
                    placeholder="Enter Currency Code"
                />
<FormFieldSelect
                    name="paymentMethod"
                    label="Payment Method"
                    required
                    placeholder="Select Payment Method"
                    options={[{"value":"bank_transfer","label":"bank_transfer"},{"value":"credit_card","label":"credit_card"},{"value":"check","label":"check"},{"value":"cash","label":"cash"}]}
                />
<FormFieldSelect
                    name="status"
                    label="Status"
                    required
                    placeholder="Select Status"
                    options={[{"value":"pending","label":"pending"},{"value":"completed","label":"completed"},{"value":"failed","label":"failed"},{"value":"cancelled","label":"cancelled"}]}
                />
<FormFieldSelect
                    name="paidBy"
                    label="Paid By"
                    placeholder="Select Paid By"
                    options={paidBies}
                    loading={isLoadingPaidBies}
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
PaymentForm.displayName = 'PaymentForm';

export default PaymentForm;