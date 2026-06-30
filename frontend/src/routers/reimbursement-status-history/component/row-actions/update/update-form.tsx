import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { FormFieldSelect, FormFieldText, FormFieldTextarea } from '@/components/FormFieldWrapper';
import { ReimbursementStatusHistoryUpdate } from '../../../interface';
import { useReimbursementRequestOptions } from '../../../../reimbursement-request/hooks/useReimbursementRequestOptions';
import { useUserOptions } from '../../../../user/hooks/useUserOptions';


const ReimbursementStatusHistoryForm = memo(() => {
	const form = useFormContext<ReimbursementStatusHistoryUpdate>();


	const { data : reimbursementRequestIds, isLoading : isLoadingReimbursementRequestIds } = useReimbursementRequestOptions();
	const { data : changedBies, isLoading : isLoadingChangedBies } = useUserOptions();




	return (
		<Form {...form}>
			<div className="flex flex-col gap-4">
<FormFieldSelect
                    name="reimbursementRequestId"
                    label="Reimbursement Request"
                    required
                    placeholder="Select Reimbursement Request"
                    options={reimbursementRequestIds}
                    loading={isLoadingReimbursementRequestIds}
                />
<FormFieldText
                    name="oldStatus"
                    label="Old Status"
                    placeholder="Enter Old Status"
                />
<FormFieldText
                    name="newStatus"
                    label="New Status"
                    required
                    placeholder="Enter New Status"
                />
<FormFieldSelect
                    name="changedBy"
                    label="Changed By"
                    required
                    placeholder="Select Changed By"
                    options={changedBies}
                    loading={isLoadingChangedBies}
                />
<FormFieldTextarea
                    name="userComment"
                    label="User Comment"
                    placeholder="Enter User Comment"
                    rows={3}
                    textareaClassName="resize-none"
                />
			</div>
		</Form>
	);
});
ReimbursementStatusHistoryForm.displayName = 'ReimbursementStatusHistoryForm';

export default ReimbursementStatusHistoryForm;