import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { FormFieldText } from '@/components/FormFieldWrapper';
import { Building, DollarSign } from 'lucide-react';
import { CompanyEntityCreate } from '../../../interface';


const CompanyEntityForm = memo(() => {
	const form = useFormContext<CompanyEntityCreate>();






	return (
		<Form {...form}>
			<div className="flex flex-col gap-4">
<FormFieldText
                    name="entityName"
                    label="Entity Name"
                    required
                    icon={<Building className="h-4 w-4" />}
                    placeholder="Enter Entity Name"
                />
<FormFieldText
                    name="currencyCode"
                    label="Currency Code"
                    required
                    icon={<DollarSign className="h-4 w-4" />}
                    placeholder="Enter Currency Code"
                />
			</div>
		</Form>
	);
});
CompanyEntityForm.displayName = 'CompanyEntityForm';

export default CompanyEntityForm;