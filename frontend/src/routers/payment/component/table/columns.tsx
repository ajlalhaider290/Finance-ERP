import { DataTableColumnHeader } from "@/components/DataTable/components/data-table-column-header"
import { ColumnDef, Row } from "@tanstack/react-table"
import { formatDate } from "@/util/formatDate"
import { PaymentIndex } from "../../interface"
import { PaymentRowActions } from "../row-actions"

export const paymentGetColumns = (hiddenActions?: string[]): ColumnDef<PaymentIndex>[] => {
	const allActionsHidden = hiddenActions && (hiddenActions.includes('all') || (hiddenActions.includes('view') && hiddenActions.includes('edit') && hiddenActions.includes('delete')));
	return [
		{
			accessorKey: "paymentDate",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Payment Date" />
			),
			cell: ({ row }) => (<>{row.getValue("paymentDate") ? formatDate(row.getValue("paymentDate"), 'DATE') : '-'}</>),
		},
		{
			accessorKey: "amount",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Amount" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("amount"))
    ? (row.getValue("amount") as unknown[]).join(', ')
    : (typeof row.getValue("amount") === 'object' && row.getValue("amount") !== null
        ? JSON.stringify(row.getValue("amount"))
        : (row.getValue("amount") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "currencyCode",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Currency Code" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("currencyCode"))
    ? (row.getValue("currencyCode") as unknown[]).join(', ')
    : (typeof row.getValue("currencyCode") === 'object' && row.getValue("currencyCode") !== null
        ? JSON.stringify(row.getValue("currencyCode"))
        : (row.getValue("currencyCode") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "paymentMethod",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Payment Method" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("paymentMethod"))
    ? (row.getValue("paymentMethod") as unknown[]).join(', ')
    : (typeof row.getValue("paymentMethod") === 'object' && row.getValue("paymentMethod") !== null
        ? JSON.stringify(row.getValue("paymentMethod"))
        : (row.getValue("paymentMethod") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "status",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Status" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("status"))
    ? (row.getValue("status") as unknown[]).join(', ')
    : (typeof row.getValue("status") === 'object' && row.getValue("status") !== null
        ? JSON.stringify(row.getValue("status"))
        : (row.getValue("status") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "paidBy",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Paid By Id" />
			),
			cell: ({ row }) => <span>{row.original.paymentsMadeLabel || row.getValue("paidBy")}</span>,
		},
		{
			accessorKey: "entityId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Entity Id" />
			),
			cell: ({ row }) => <span>{row.original.paymentsLabel || row.getValue("entityId")}</span>,
		},
		{
			accessorKey: "createdAt",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Created At" />
			),
			cell: ({ row }) => (<>{row.getValue("createdAt") ? formatDate(row.getValue("createdAt"), 'TIMESTAMP') : '-'}</>),
		},
		{
			accessorKey: "updatedAt",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Updated At" />
			),
			cell: ({ row }) => (<>{row.getValue("updatedAt") ? formatDate(row.getValue("updatedAt"), 'TIMESTAMP') : '-'}</>),
		},
		...(!allActionsHidden ? [{
			id: "actions",
			header: "Actions",
			cell: ({ row }: { row: Row<PaymentIndex> }) => <PaymentRowActions row={row} hiddenActions={hiddenActions} />,
		}] : []),
	]
}
