import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { FormFieldText, FormFieldTextarea, FormFieldSelect } from '@/components/FormFieldWrapper';
import { Tag } from 'lucide-react';
import { ExpenseCategoryUpdate } from '../../../interface';
import { useCompanyEntityOptions } from '../../../../company-entity/hooks/useCompanyEntityOptions';


const ExpenseCategoryForm = memo(() => {
	const form = useFormContext<ExpenseCategoryUpdate>();


	const { data : entityIds, isLoading : isLoadingEntityIds } = useCompanyEntityOptions();




	return (
		<Form {...form}>
			<div className="flex flex-col gap-4">
<FormFieldText
                    name="categoryName"
                    label="Category Name"
                    required
                    icon={<Tag className="h-4 w-4" />}
                    placeholder="Enter Category Name"
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
			</div>
		</Form>
	);
});
ExpenseCategoryForm.displayName = 'ExpenseCategoryForm';

export default ExpenseCategoryForm;