import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { FormFieldDate, FormFieldText, FormFieldSelect } from '@/components/FormFieldWrapper';
import { AlignLeft, Link } from 'lucide-react';
import { JournalEntryUpdate } from '../../../interface';
import { useCompanyEntityOptions } from '../../../../company-entity/hooks/useCompanyEntityOptions';
import { useUserOptions } from '../../../../user/hooks/useUserOptions';


const JournalEntryForm = memo(() => {
	const form = useFormContext<JournalEntryUpdate>();


	const { data : entityIds, isLoading : isLoadingEntityIds } = useCompanyEntityOptions();
	const { data : postedBies, isLoading : isLoadingPostedBies } = useUserOptions();




	return (
		<Form {...form}>
			<div className="flex flex-col gap-4">
<FormFieldDate
                    name="entryDate"
                    label="Entry Date"
                    required
                    placeholder="Select Entry Date"
                />
<FormFieldText
                    name="description"
                    label="Description"
                    required
                    icon={<AlignLeft className="h-4 w-4" />}
                    placeholder="Enter Description"
                />
<FormFieldSelect
                    name="sourceDocumentType"
                    label="Source Document Type"
                    placeholder="Select Source Document Type"
                    options={[{"value":"reimbursement","label":"reimbursement"},{"value":"invoice","label":"invoice"},{"value":"intercompany_transaction","label":"intercompany_transaction"},{"value":"payment","label":"payment"}]}
                />
<FormFieldText
                    name="sourceDocumentId"
                    label="Source Document Id"
                    icon={<Link className="h-4 w-4" />}
                    placeholder="Enter Source Document Id"
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
                    name="postedBy"
                    label="Posted By"
                    placeholder="Select Posted By"
                    options={postedBies}
                    loading={isLoadingPostedBies}
                />
<FormFieldDate
                    name="postedAt"
                    label="Posted At"
                    placeholder="Select Posted At"
                    mode="datetime"
                />
<FormFieldSelect
                    name="status"
                    label="Status"
                    required
                    placeholder="Select Status"
                    options={[{"value":"draft","label":"draft"},{"value":"submitted","label":"submitted"},{"value":"approved","label":"approved"},{"value":"posted","label":"posted"},{"value":"cancelled","label":"cancelled"}]}
                />
			</div>
		</Form>
	);
});
JournalEntryForm.displayName = 'JournalEntryForm';

export default JournalEntryForm;