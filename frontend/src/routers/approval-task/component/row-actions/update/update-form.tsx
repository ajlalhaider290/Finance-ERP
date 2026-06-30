import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { FormFieldSelect, FormFieldText, FormFieldTextarea, FormFieldDate } from '@/components/FormFieldWrapper';
import { FileText, UserCheck } from 'lucide-react';
import { ApprovalTaskUpdate } from '../../../interface';
import { useUserOptions } from '../../../../user/hooks/useUserOptions';


const ApprovalTaskForm = memo(() => {
	const form = useFormContext<ApprovalTaskUpdate>();


	const { data : assignedToUserIds, isLoading : isLoadingAssignedToUserIds } = useUserOptions();
	const { data : actionedBies, isLoading : isLoadingActionedBies } = useUserOptions();




	return (
		<Form {...form}>
			<div className="flex flex-col gap-4">
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
                    name="assignedToUserId"
                    label="Assigned To User"
                    placeholder="Select Assigned To User"
                    options={assignedToUserIds}
                    loading={isLoadingAssignedToUserIds}
                />
<FormFieldText
                    name="assignedToRole"
                    label="Assigned To Role"
                    icon={<UserCheck className="h-4 w-4" />}
                    placeholder="Enter Assigned To Role"
                />
<FormFieldSelect
                    name="status"
                    label="Status"
                    required
                    placeholder="Select Status"
                    options={[{"value":"pending","label":"pending"},{"value":"approved","label":"approved"},{"value":"rejected","label":"rejected"},{"value":"returned","label":"returned"},{"value":"delegated","label":"delegated"}]}
                />
<FormFieldTextarea
                    name="userComment"
                    label="User Comment"
                    placeholder="Enter User Comment"
                    rows={3}
                    textareaClassName="resize-none"
                />
<FormFieldSelect
                    name="actionedBy"
                    label="Actioned By"
                    placeholder="Select Actioned By"
                    options={actionedBies}
                    loading={isLoadingActionedBies}
                />
<FormFieldDate
                    name="actionedAt"
                    label="Actioned At"
                    placeholder="Select Actioned At"
                    mode="datetime"
                />
			</div>
		</Form>
	);
});
ApprovalTaskForm.displayName = 'ApprovalTaskForm';

export default ApprovalTaskForm;