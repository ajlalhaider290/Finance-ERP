import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { FormFieldSelect, FormFieldDate, FormFieldText } from '@/components/FormFieldWrapper';
import { DollarSign, Percent } from 'lucide-react';
import { IntercompanyTransactionUpdate } from '../../../interface';
import { useCompanyEntityOptions } from '../../../../company-entity/hooks/useCompanyEntityOptions';
import { useUserOptions } from '../../../../user/hooks/useUserOptions';
import LineDetailSubForm from './line-detail-sub-form';


const IntercompanyTransactionForm = memo(() => {
	const form = useFormContext<IntercompanyTransactionUpdate>();


	const { data : sourceEntityIds, isLoading : isLoadingSourceEntityIds } = useCompanyEntityOptions();
	const { data : targetEntityIds, isLoading : isLoadingTargetEntityIds } = useCompanyEntityOptions();
	const { data : currentApproverIds, isLoading : isLoadingCurrentApproverIds } = useUserOptions();




	return (
		<Form {...form}>
			<div className="flex flex-col gap-4">
<FormFieldSelect
                    name="sourceEntityId"
                    label="Source Entity"
                    required
                    placeholder="Select Source Entity"
                    options={sourceEntityIds}
                    loading={isLoadingSourceEntityIds}
                />
<FormFieldSelect
                    name="targetEntityId"
                    label="Target Entity"
                    required
                    placeholder="Select Target Entity"
                    options={targetEntityIds}
                    loading={isLoadingTargetEntityIds}
                />
<FormFieldDate
                    name="transactionDate"
                    label="Transaction Date"
                    required
                    placeholder="Select Transaction Date"
                />
<FormFieldSelect
                    name="transactionType"
                    label="Transaction Type"
                    required
                    placeholder="Select Transaction Type"
                    options={[{"value":"billing","label":"billing"},{"value":"settlement","label":"settlement"},{"value":"loan","label":"loan"},{"value":"expense_allocation","label":"expense_allocation"}]}
                />
<FormFieldText
                    name="currencyCode"
                    label="Currency Code"
                    required
                    icon={<DollarSign className="h-4 w-4" />}
                    placeholder="Enter Currency Code"
                />
<FormFieldText
                    name="amount"
                    label="Amount"
                    required
                    type="decimal"
                    placeholder="Enter Amount"
                />
				<div className="lg:col-span-1">
					<LineDetailSubForm namePrefix="lineDetail" />
				</div>
<FormFieldText
                    name="taxAmount"
                    label="Tax Amount"
                    required
                    icon={<Percent className="h-4 w-4" />}
                    type="decimal"
                    placeholder="Enter Tax Amount"
                />
<FormFieldSelect
                    name="status"
                    label="Status"
                    required
                    placeholder="Select Status"
                    options={[{"value":"draft","label":"draft"},{"value":"submitted","label":"submitted"},{"value":"under review","label":"under review"},{"value":"approved","label":"approved"},{"value":"rejected","label":"rejected"},{"value":"posted","label":"posted"},{"value":"settled","label":"settled"},{"value":"cancelled","label":"cancelled"}]}
                />
<FormFieldSelect
                    name="currentApproverId"
                    label="Current Approver"
                    placeholder="Select Current Approver"
                    options={currentApproverIds}
                    loading={isLoadingCurrentApproverIds}
                />
			</div>
		</Form>
	);
});
IntercompanyTransactionForm.displayName = 'IntercompanyTransactionForm';

export default IntercompanyTransactionForm;