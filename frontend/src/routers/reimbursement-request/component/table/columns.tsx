import { DataTableColumnHeader } from "@/components/DataTable/components/data-table-column-header"
import { ColumnDef, Row } from "@tanstack/react-table"
import { formatDate } from "@/util/formatDate"
import { ReimbursementRequestIndex } from "../../interface"
import { ReimbursementRequestRowActions } from "../row-actions"

const displayValue = (value: unknown) => {
	if (Array.isArray(value)) return value.join(', ');
	if (typeof value === 'object' && value !== null) return JSON.stringify(value);
	return (value as string | number | boolean | null | undefined) ?? '-';
};

const formatAmount = (value: unknown, currency: unknown) => {
	const amount = Number(value ?? 0);
	const currencyCode = typeof currency === 'string' && currency.length > 0 ? currency : 'USD';
	try {
		return new Intl.NumberFormat(undefined, { style: 'currency', currency: currencyCode }).format(amount);
	} catch {
		return `${currencyCode} ${amount.toFixed(2)}`;
	}
};

const statusClassName = (status: unknown) => {
	const normalized = String(status ?? '').toLowerCase();
	if (normalized === 'approved' || normalized === 'paid') return 'bg-green-50 text-green-700 border-green-200';
	if (normalized === 'rejected' || normalized === 'cancelled') return 'bg-red-50 text-red-700 border-red-200';
	if (normalized === 'returned') return 'bg-amber-50 text-amber-700 border-amber-200';
	if (normalized === 'submitted' || normalized === 'under review') return 'bg-blue-50 text-blue-700 border-blue-200';
	return 'bg-muted text-muted-foreground border-border';
};

export const reimbursementRequestGetColumns = (hiddenActions?: string[]): ColumnDef<ReimbursementRequestIndex>[] => {
	const allActionsHidden = hiddenActions && (hiddenActions.includes('all') || (hiddenActions.includes('view') && hiddenActions.includes('edit') && hiddenActions.includes('delete')));
	return [
		{
			accessorKey: "businessPurpose",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Business Purpose" />
			),
			cell: ({ row }) => <span className="font-medium">{displayValue(row.getValue("businessPurpose"))}</span>,
		},
		{
			accessorKey: "status",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Status" />
			),
			cell: ({ row }) => (
				<span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${statusClassName(row.getValue("status"))}`}>
					{displayValue(row.getValue("status"))}
				</span>
			),
		},
		{
			accessorKey: "totalAmount",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Total" />
			),
			cell: ({ row }) => <span>{formatAmount(row.getValue("totalAmount"), row.original.currencyCode)}</span>,
		},
		{
			accessorKey: "expenseDate",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Expense Date" />
			),
			cell: ({ row }) => (<>{row.getValue("expenseDate") ? formatDate(row.getValue("expenseDate"), 'DATE') : '-'}</>),
		},
		{
			accessorKey: "categoryId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Category" />
			),
			cell: ({ row }) => <span>{row.original.categoryLabel || row.getValue("categoryId")}</span>,
		},
		{
			accessorKey: "employeeId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Employee" />
			),
			cell: ({ row }) => <span>{row.original.employeeLabel || row.getValue("employeeId")}</span>,
		},
		{
			accessorKey: "entityId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Entity" />
			),
			cell: ({ row }) => <span>{row.original.entityLabel || row.getValue("entityId")}</span>,
		},
		{
			accessorKey: "amount",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Amount" />
			),
			cell: ({ row }) => <span>{formatAmount(row.getValue("amount"), row.original.currencyCode)}</span>,
		},
		{
			accessorKey: "taxAmount",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Tax" />
			),
			cell: ({ row }) => <span>{formatAmount(row.getValue("taxAmount"), row.original.currencyCode)}</span>,
		},
		{
			accessorKey: "currencyCode",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Currency" />
			),
			cell: ({ row }) => <>{displayValue(row.getValue("currencyCode"))}</>,
		},
		{
			accessorKey: "costCenter",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Cost Center" />
			),
			cell: ({ row }) => <>{displayValue(row.getValue("costCenter"))}</>,
		},
		{
			accessorKey: "department",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Department" />
			),
			cell: ({ row }) => <>{displayValue(row.getValue("department"))}</>,
		},
		{
			accessorKey: "currentApproverId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Current Approver" />
			),
			cell: ({ row }) => <span>{row.original.approvalsAssignedLabel || row.getValue("currentApproverId")}</span>,
		},
		{
			accessorKey: "paidDate",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Paid Date" />
			),
			cell: ({ row }) => (<>{row.getValue("paidDate") ? formatDate(row.getValue("paidDate"), 'DATE') : '-'}</>),
		},
		{
			accessorKey: "createdAt",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Created" />
			),
			cell: ({ row }) => (<>{row.getValue("createdAt") ? formatDate(row.getValue("createdAt"), 'TIMESTAMP') : '-'}</>),
		},
		{
			accessorKey: "updatedAt",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Updated" />
			),
			cell: ({ row }) => (<>{row.getValue("updatedAt") ? formatDate(row.getValue("updatedAt"), 'TIMESTAMP') : '-'}</>),
		},
		...(!allActionsHidden ? [{
			id: "actions",
			header: "Actions",
			cell: ({ row }: { row: Row<ReimbursementRequestIndex> }) => <ReimbursementRequestRowActions row={row} hiddenActions={hiddenActions} />,
		}] : []),
	]
}
