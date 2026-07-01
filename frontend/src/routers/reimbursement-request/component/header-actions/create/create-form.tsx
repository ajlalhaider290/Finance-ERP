import { memo, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { FormFieldSelect, FormFieldText, FormFieldDate } from '@/components/FormFieldWrapper';
import { Briefcase, LayoutGrid, Building, DollarSign, Percent } from 'lucide-react';
import { ReimbursementRequestCreate } from '../../../interface';
import { useUserOptions } from '../../../../user/hooks/useUserOptions';
import { useExpenseCategoryOptions } from '../../../../expense-category/hooks/useExpenseCategoryOptions';
import { useCompanyEntityOptions } from '../../../../company-entity/hooks/useCompanyEntityOptions';
import { RootState, useAppSelector } from '@/store';


const ReimbursementRequestForm = memo(() => {
	const form = useFormContext<ReimbursementRequestCreate>();
	const { user } = useAppSelector((state: RootState) => state.session);
	const isEmployee = Boolean(user?.scope?.includes('user:employee'));
	const shouldShowEntity = !isEmployee || !user?.entityId;


	const { data : employeeIds, isLoading : isLoadingEmployeeIds } = useUserOptions(!isEmployee);
	const { data : categoryIds, isLoading : isLoadingCategoryIds } = useExpenseCategoryOptions();
	const { data : currentApproverIds, isLoading : isLoadingCurrentApproverIds } = useUserOptions(!isEmployee);
	const { data : entityIds, isLoading : isLoadingEntityIds } = useCompanyEntityOptions(shouldShowEntity);

	const amount = form.watch('amount');
	const taxAmount = form.watch('taxAmount');

	const prevTotalRef = useRef<string>('');

	useEffect(() => {
		const total = Number(amount || 0) + Number(taxAmount || 0);
		const newTotal = total.toFixed(2);
		// Only update if the value actually changed to prevent re-render cascades
		if (prevTotalRef.current !== newTotal) {
			prevTotalRef.current = newTotal;
			form.setValue('totalAmount', newTotal);
		}
	}, [amount, taxAmount, form]);



	return (
		<Form {...form}>
			<div className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{!isEmployee && (
						<FormFieldSelect
							name="employeeId"
							label="Employee"
							required
							placeholder="Select Employee"
							options={employeeIds}
							loading={isLoadingEmployeeIds}
						/>
					)}
					<FormFieldText
						name="businessPurpose"
						label="Business Purpose"
						required
						icon={<Briefcase className="h-4 w-4" />}
						placeholder="Enter Business Purpose"
					/>
					<FormFieldDate
						name="expenseDate"
						label="Expense Date"
						required
						placeholder="Select Expense Date"
					/>
					<FormFieldSelect
						name="categoryId"
						label="Category"
						required
						placeholder="Select Category"
						options={categoryIds}
						loading={isLoadingCategoryIds}
					/>
					<FormFieldText
						name="costCenter"
						label="Cost Center"
						icon={<LayoutGrid className="h-4 w-4" />}
						placeholder="Enter Cost Center"
					/>
					<FormFieldText
						name="department"
						label="Department"
						icon={<Building className="h-4 w-4" />}
						placeholder="Enter Department"
					/>
					{shouldShowEntity && (
						<FormFieldSelect
							name="entityId"
							label="Company Entity"
							required
							placeholder="Select Company Entity"
							options={entityIds}
							loading={isLoadingEntityIds}
						/>
					)}
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormFieldText
						name="currencyCode"
						label="Currency"
						required
						icon={<DollarSign className="h-4 w-4" />}
						placeholder="Enter Currency"
					/>
					<FormFieldText
						name="amount"
						label="Amount"
						required
						type="decimal"
						placeholder="Enter Amount"
					/>
					<FormFieldText
						name="taxAmount"
						label="Tax Amount"
						required
						icon={<Percent className="h-4 w-4" />}
						type="decimal"
						placeholder="Enter Tax Amount"
					/>
					<FormFieldText
						name="totalAmount"
						label="Total Amount"
						required
						disabled
						placeholder="0.00"
					/>
				</div>

				{!isEmployee && (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormFieldSelect
							name="status"
							label="Status"
							required
							placeholder="Select Status"
							options={[{"value":"draft","label":"Draft"},{"value":"submitted","label":"Submitted"},{"value":"under review","label":"Under Review"},{"value":"approved","label":"Approved"},{"value":"rejected","label":"Rejected"},{"value":"returned","label":"Returned"},{"value":"paid","label":"Paid"},{"value":"cancelled","label":"Cancelled"}]}
						/>
						<FormFieldSelect
							name="currentApproverId"
							label="Current Approver"
							placeholder="Select Current Approver"
							options={currentApproverIds}
							loading={isLoadingCurrentApproverIds}
						/>
						<FormFieldDate
							name="paidDate"
							label="Paid Date"
							placeholder="Select Paid Date"
						/>
					</div>
				)}
			</div>
		</Form>
	);
});
ReimbursementRequestForm.displayName = 'ReimbursementRequestForm';

export default ReimbursementRequestForm;
