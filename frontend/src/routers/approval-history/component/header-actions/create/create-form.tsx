import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { FormFieldSelect, FormFieldText, FormFieldTextarea } from '@/components/FormFieldWrapper';
import { FileText } from 'lucide-react';
import { ApprovalHistoryCreate } from '../../../interface';
import { useApprovalTaskOptions } from '../../../../approval-task/hooks/useApprovalTaskOptions';
import { useUserOptions } from '../../../../user/hooks/useUserOptions';


const ApprovalHistoryForm = memo(() => {
	const form = useFormContext<ApprovalHistoryCreate>();


	const { data : taskIds, isLoading : isLoadingTaskIds } = useApprovalTaskOptions();
	const { data : approverIds, isLoading : isLoadingApproverIds } = useUserOptions();




	return (
		<Form {...form}>
			<div className="flex flex-col gap-4">
<FormFieldSelect
                    name="taskId"
                    label="Task"
                    required
                    placeholder="Select Task"
                    options={taskIds}
                    loading={isLoadingTaskIds}
                />
<FormFieldSelect
                    name="documentType"
                    label="Document Type"
                    required
                    placeholder="Select Document Type"
                    options={[{"value":"reimbursement","label":"reimbursement"},{"value":"invoice","label":"invoice"},{"value":"intercompany_transaction","label":"intercompany_transaction"}]}
                />
<FormFieldText
                    name="documentId"
                    label="Document Id"
                    required
                    icon={<FileText className="h-4 w-4" />}
                    placeholder="Enter Document Id"
                />
<FormFieldSelect
                    name="approverId"
                    label="Approver"
                    required
                    placeholder="Select Approver"
                    options={approverIds}
                    loading={isLoadingApproverIds}
                />
<FormFieldSelect
                    name="actionValue"
                    label="Action Value"
                    required
                    placeholder="Select Action Value"
                    options={[{"value":"approved","label":"approved"},{"value":"rejected","label":"rejected"},{"value":"returned","label":"returned"},{"value":"delegated","label":"delegated"},{"value":"commented","label":"commented"}]}
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
ApprovalHistoryForm.displayName = 'ApprovalHistoryForm';

export default ApprovalHistoryForm;