import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { FormFieldSelect, FormFieldFile, FormFieldText } from '@/components/FormFieldWrapper';
import { useNotificationContext } from '@/context/NotificationContext';
import { useMutation } from '@tanstack/react-query';
import { uploadReimbursementDocument} from '../../../service';
import { ReimbursementDocumentCreate } from '../../../interface';
import { fileUrlFileSchema } from '../../../validation';
import { useReimbursementRequestOptions } from '../../../../reimbursement-request/hooks/useReimbursementRequestOptions';
import { useUserOptions } from '../../../../user/hooks/useUserOptions';


const ReimbursementDocumentForm = memo(() => {
	const form = useFormContext<ReimbursementDocumentCreate>();

	const { showNotification } = useNotificationContext();


	const { data : reimbursementRequestIds, isLoading : isLoadingReimbursementRequestIds } = useReimbursementRequestOptions();
	const { data : uploadedBies, isLoading : isLoadingUploadedBies } = useUserOptions();


	const uploadMutation = useMutation({
        mutationFn: uploadReimbursementDocument,
      });



    const handleUpload = async (file:File, fieldName:string) => {
        const formData = new FormData();
        formData.append(fieldName, file);
        const res = await uploadMutation.mutateAsync(formData);
        if (res.status !== 200) {
            showNotification('Error', 'Upload failed', 'error');
            return '';
        }
        return res?.data?.url ?? '';
      }
	  

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
<FormFieldSelect
                    name="documentType"
                    label="Document Type"
                    required
                    placeholder="Select Document Type"
                    options={[{"value":"receipt","label":"receipt"},{"value":"invoice","label":"invoice"},{"value":"supporting_file","label":"supporting_file"}]}
                />
<FormFieldFile
                    name="fileUrl"
                    label="File Url"
                    required
                    validateFileSchema={fileUrlFileSchema}
                    sizePx={128}
                    onUpload={async (file) => await handleUpload(file, 'fileUrl')}
                />
<FormFieldText
                    name="fileName"
                    label="File Name"
                    required
                    placeholder="Enter File Name"
                />
<FormFieldSelect
                    name="uploadedBy"
                    label="Uploaded By"
                    required
                    placeholder="Select Uploaded By"
                    options={uploadedBies}
                    loading={isLoadingUploadedBies}
                />
			</div>
		</Form>
	);
});
ReimbursementDocumentForm.displayName = 'ReimbursementDocumentForm';

export default ReimbursementDocumentForm;