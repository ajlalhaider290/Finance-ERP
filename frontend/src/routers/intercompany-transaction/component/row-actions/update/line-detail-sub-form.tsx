import { memo } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import LineDetailItemSubForm from './line-detail-item-sub-form';

interface LineDetailSubFormProps {
	namePrefix: string;
}

const LineDetailSubForm = memo(({ namePrefix }: LineDetailSubFormProps) => {
	const form = useFormContext();
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: namePrefix,
	});

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h4 className="text-sm font-medium">Line Details</h4>
				<Button type="button" variant="outline" size="sm" onClick={() => append({})}>
					<Plus className="h-4 w-4 mr-1" /> Add
				</Button>
			</div>
			{fields.map((item, index) => (
				<div key={item.id} className="relative border rounded-lg p-4">
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className="absolute top-2 right-2 h-8 w-8"
						onClick={() => remove(index)}
					>
						<Trash2 className="h-4 w-4" />
					</Button>
					<LineDetailItemSubForm namePrefix={`${namePrefix}.${index}`} />
				</div>
			))}
			{fields.length === 0 && (
				<div className="text-center py-8 text-muted-foreground border border-dashed rounded-lg">
					<p className="text-sm">No items added yet. Click "Add" to get started.</p>
				</div>
			)}
		</div>
	);
});
LineDetailSubForm.displayName = 'LineDetailSubForm';

export default LineDetailSubForm;
