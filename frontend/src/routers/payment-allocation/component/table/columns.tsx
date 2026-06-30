import { DataTableColumnHeader } from "@/components/DataTable/components/data-table-column-header"
import { ColumnDef, Row } from "@tanstack/react-table"
import { formatDate } from "@/util/formatDate"
import { PaymentAllocationIndex } from "../../interface"
import { PaymentAllocationRowActions } from "../row-actions"

export const paymentAllocationGetColumns = (hiddenActions?: string[]): ColumnDef<PaymentAllocationIndex>[] => {
	const allActionsHidden = hiddenActions && (hiddenActions.includes('all') || (hiddenActions.includes('view') && hiddenActions.includes('edit') && hiddenActions.includes('delete')));
	return [
		{
			accessorKey: "paymentId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Payment Id" />
			),
			cell: ({ row }) => <span>{row.original.allocationsLabel || row.getValue("paymentId")}</span>,
		},
		{
			accessorKey: "allocatedToType",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Allocated To Type" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("allocatedToType"))
    ? (row.getValue("allocatedToType") as unknown[]).join(', ')
    : (typeof row.getValue("allocatedToType") === 'object' && row.getValue("allocatedToType") !== null
        ? JSON.stringify(row.getValue("allocatedToType"))
        : (row.getValue("allocatedToType") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "allocatedToId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Allocated To Id" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("allocatedToId"))
    ? (row.getValue("allocatedToId") as unknown[]).join(', ')
    : (typeof row.getValue("allocatedToId") === 'object' && row.getValue("allocatedToId") !== null
        ? JSON.stringify(row.getValue("allocatedToId"))
        : (row.getValue("allocatedToId") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "allocatedAmount",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Allocated Amount" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("allocatedAmount"))
    ? (row.getValue("allocatedAmount") as unknown[]).join(', ')
    : (typeof row.getValue("allocatedAmount") === 'object' && row.getValue("allocatedAmount") !== null
        ? JSON.stringify(row.getValue("allocatedAmount"))
        : (row.getValue("allocatedAmount") as string | number | boolean | null | undefined))) ?? '-'}</>),
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
			cell: ({ row }: { row: Row<PaymentAllocationIndex> }) => <PaymentAllocationRowActions row={row} hiddenActions={hiddenActions} />,
		}] : []),
	]
}
