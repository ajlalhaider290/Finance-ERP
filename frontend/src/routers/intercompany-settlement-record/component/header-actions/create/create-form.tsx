import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { FormFieldSelect, FormFieldDate, FormFieldText } from '@/components/FormFieldWrapper';
import { DollarSign } from 'lucide-react';
import { IntercompanySettlementRecordCreate } from '../../../interface';
import { useIntercompanyTransactionOptions } from '../../../../intercompany-transaction/hooks/useIntercompanyTransactionOptions';
import { useUserOptions } from '../../../../user/hooks/useUserOptions';


const IntercompanySettlementRecordForm = memo(() => {
	const form = useFormContext<IntercompanySettlementRecordCreate>();


	const { data : transactionIds, isLoading : isLoadingTransactionIds } = useIntercompanyTransactionOptions();
	const { data : recordedBies, isLoading : isLoadingRecordedBies } = useUserOptions();




	return (
		<Form {...form}>
			<div className="flex flex-col gap-4">
<FormFieldSelect
                    name="transactionId"
                    label="Transaction"
                    required
                    placeholder="Select Transaction"
                    options={transactionIds}
                    loading={isLoadingTransactionIds}
                />
<FormFieldDate
                    name="settlementDate"
                    label="Settlement Date"
                    required
                    placeholder="Select Settlement Date"
                />
<FormFieldText
                    name="settlementAmount"
                    label="Settlement Amount"
                    required
                    type="decimal"
                    placeholder="Enter Settlement Amount"
                />
<FormFieldText
                    name="currencyCode"
                    label="Currency Code"
                    required
                    icon={<DollarSign className="h-4 w-4" />}
                    placeholder="Enter Currency Code"
                />
<FormFieldSelect
                    name="status"
                    label="Status"
                    required
                    placeholder="Select Status"
                    options={[{"value":"pending","label":"pending"},{"value":"completed","label":"completed"},{"value":"cancelled","label":"cancelled"}]}
                />
<FormFieldSelect
                    name="recordedBy"
                    label="Recorded By"
                    required
                    placeholder="Select Recorded By"
                    options={recordedBies}
                    loading={isLoadingRecordedBies}
                />
			</div>
		</Form>
	);
});
IntercompanySettlementRecordForm.displayName = 'IntercompanySettlementRecordForm';

export default IntercompanySettlementRecordForm;