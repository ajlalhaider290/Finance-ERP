import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { FormFieldFile, FormFieldText, FormFieldSelect } from '@/components/FormFieldWrapper';
import { useNotificationContext } from '@/context/NotificationContext';
import { useMutation } from '@tanstack/react-query';
import { uploadInvoiceDocument} from '../../../service';
import { InvoiceDocumentCreate } from '../../../interface';
import { fileUrlFileSchema } from '../../../validation';
import { useUserOptions } from '../../../../user/hooks/useUserOptions';


const InvoiceDocumentForm = memo(() => {
	const form = useFormContext<InvoiceDocumentCreate>();

	const { showNotification } = useNotificationContext();


	const { data : uploadedBies, isLoading : isLoadingUploadedBies } = useUserOptions();


	const uploadMutation = useMutation({
        mutationFn: uploadInvoiceDocument,
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
InvoiceDocumentForm.displayName = 'InvoiceDocumentForm';

export default InvoiceDocumentForm;