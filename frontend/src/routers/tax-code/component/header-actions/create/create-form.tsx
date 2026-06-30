import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { FormFieldText, FormFieldTextarea, FormFieldSelect } from '@/components/FormFieldWrapper';
import { Tag, Percent } from 'lucide-react';
import { TaxCodeCreate } from '../../../interface';
import { useCompanyEntityOptions } from '../../../../company-entity/hooks/useCompanyEntityOptions';


const TaxCodeForm = memo(() => {
	const form = useFormContext<TaxCodeCreate>();


	const { data : entityIds, isLoading : isLoadingEntityIds } = useCompanyEntityOptions();




	return (
		<Form {...form}>
			<div className="flex flex-col gap-4">
<FormFieldText
                    name="taxCodeName"
                    label="Tax Code Name"
                    required
                    icon={<Tag className="h-4 w-4" />}
                    placeholder="Enter Tax Code Name"
                />
<FormFieldText
                    name="rate"
                    label="Rate"
                    required
                    icon={<Percent className="h-4 w-4" />}
                    type="decimal"
                    placeholder="Enter Rate"
                />
<FormFieldTextarea
                    name="description"
                    label="Description"
                    placeholder="Enter Description"
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
<FormFieldSelect
                    name="isActive"
                    label="Is Active"
                    required
                    valueType="boolean"
                    placeholder="Select Active/Inactive"
                    options={[{"value":"true","label":"Active"},{"value":"false","label":"Inactive"}]}
                />
			</div>
		</Form>
	);
});
TaxCodeForm.displayName = 'TaxCodeForm';

export default TaxCodeForm;