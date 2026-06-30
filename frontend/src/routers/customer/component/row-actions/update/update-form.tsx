import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { FormFieldText, FormFieldTextarea, FormFieldSelect } from '@/components/FormFieldWrapper';
import { Users, Mail, Phone } from 'lucide-react';
import { CustomerUpdate } from '../../../interface';
import { useCompanyEntityOptions } from '../../../../company-entity/hooks/useCompanyEntityOptions';


const CustomerForm = memo(() => {
	const form = useFormContext<CustomerUpdate>();


	const { data : entityIds, isLoading : isLoadingEntityIds } = useCompanyEntityOptions();




	return (
		<Form {...form}>
			<div className="flex flex-col gap-4">
<FormFieldText
                    name="customerName"
                    label="Customer Name"
                    required
                    icon={<Users className="h-4 w-4" />}
                    placeholder="Enter Customer Name"
                />
<FormFieldText
                    name="contactEmail"
                    label="Contact Email"
                    icon={<Mail className="h-4 w-4" />}
                    type="email"
                    placeholder="Enter Contact Email"
                />
<FormFieldText
                    name="contactPhone"
                    label="Contact Phone"
                    icon={<Phone className="h-4 w-4" />}
                    type="tel"
                    placeholder="Enter Contact Phone"
                />
<FormFieldTextarea
                    name="address"
                    label="Address"
                    placeholder="Enter Address"
                    rows={3}
                    textareaClassName="resize-none"
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
CustomerForm.displayName = 'CustomerForm';

export default CustomerForm;