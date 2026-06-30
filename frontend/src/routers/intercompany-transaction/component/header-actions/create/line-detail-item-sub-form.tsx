import { memo } from 'react';
import { FormFieldText } from '@/components/FormFieldWrapper';

interface LineDetailItemSubFormProps {
	namePrefix: string;
}

const LineDetailItemSubForm = memo(({ namePrefix }: LineDetailItemSubFormProps) => {

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start [&>*]:min-w-0">
			<FormFieldText
				name={`${namePrefix}.description`}
				label="Description"
				required
				placeholder="Enter description"
			/>
			<FormFieldText
				name={`${namePrefix}.amount`}
				label="Amount"
				required
				type="integer"
				placeholder="Enter amount"
			/>
			<FormFieldText
				name={`${namePrefix}.accountId`}
				label="Account Id"
				required
				placeholder="Enter account id"
			/>
			<FormFieldText
				name={`${namePrefix}.taxCodeId`}
				label="Tax Code Id"
				required
				placeholder="Enter tax code id"
			/>
		</div>
	);
});
LineDetailItemSubForm.displayName = 'LineDetailItemSubForm';

export default LineDetailItemSubForm;
