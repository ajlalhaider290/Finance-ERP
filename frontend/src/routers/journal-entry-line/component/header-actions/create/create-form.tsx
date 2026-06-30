import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { FormFieldSelect, FormFieldText } from '@/components/FormFieldWrapper';
import { ArrowUpCircle, ArrowDownCircle, AlignLeft } from 'lucide-react';
import { JournalEntryLineCreate } from '../../../interface';
import { useJournalEntryOptions } from '../../../../journal-entry/hooks/useJournalEntryOptions';


const JournalEntryLineForm = memo(() => {
	const form = useFormContext<JournalEntryLineCreate>();


	const { data : journalEntryIds, isLoading : isLoadingJournalEntryIds } = useJournalEntryOptions();




	return (
		<Form {...form}>
			<div className="flex flex-col gap-4">
<FormFieldSelect
                    name="journalEntryId"
                    label="Journal Entry"
                    required
                    placeholder="Select Journal Entry"
                    options={journalEntryIds}
                    loading={isLoadingJournalEntryIds}
                />
<FormFieldText
                    name="debitAmount"
                    label="Debit Amount"
                    required
                    icon={<ArrowUpCircle className="h-4 w-4" />}
                    type="decimal"
                    placeholder="Enter Debit Amount"
                />
<FormFieldText
                    name="creditAmount"
                    label="Credit Amount"
                    required
                    icon={<ArrowDownCircle className="h-4 w-4" />}
                    type="decimal"
                    placeholder="Enter Credit Amount"
                />
<FormFieldText
                    name="description"
                    label="Description"
                    icon={<AlignLeft className="h-4 w-4" />}
                    placeholder="Enter Description"
                />
			</div>
		</Form>
	);
});
JournalEntryLineForm.displayName = 'JournalEntryLineForm';

export default JournalEntryLineForm;