import { DataTableColumnHeader } from "@/components/DataTable/components/data-table-column-header"
import { ColumnDef, Row } from "@tanstack/react-table"
import { formatDate } from "@/util/formatDate"
import { CustomerIndex } from "../../interface"
import { CustomerRowActions } from "../row-actions"

export const customerGetColumns = (hiddenActions?: string[]): ColumnDef<CustomerIndex>[] => {
	const allActionsHidden = hiddenActions && (hiddenActions.includes('all') || (hiddenActions.includes('view') && hiddenActions.includes('edit') && hiddenActions.includes('delete')));
	return [
		{
			accessorKey: "customerName",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Customer Name" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("customerName"))
    ? (row.getValue("customerName") as unknown[]).join(', ')
    : (typeof row.getValue("customerName") === 'object' && row.getValue("customerName") !== null
        ? JSON.stringify(row.getValue("customerName"))
        : (row.getValue("customerName") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "contactEmail",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Contact Email" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("contactEmail"))
    ? (row.getValue("contactEmail") as unknown[]).join(', ')
    : (typeof row.getValue("contactEmail") === 'object' && row.getValue("contactEmail") !== null
        ? JSON.stringify(row.getValue("contactEmail"))
        : (row.getValue("contactEmail") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "contactPhone",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Contact Phone" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("contactPhone"))
    ? (row.getValue("contactPhone") as unknown[]).join(', ')
    : (typeof row.getValue("contactPhone") === 'object' && row.getValue("contactPhone") !== null
        ? JSON.stringify(row.getValue("contactPhone"))
        : (row.getValue("contactPhone") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "address",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Address" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("address"))
    ? (row.getValue("address") as unknown[]).join(', ')
    : (typeof row.getValue("address") === 'object' && row.getValue("address") !== null
        ? JSON.stringify(row.getValue("address"))
        : (row.getValue("address") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "entityId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Entity Id" />
			),
			cell: ({ row }) => <span>{row.original.customersLabel || row.getValue("entityId")}</span>,
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
			cell: ({ row }: { row: Row<CustomerIndex> }) => <CustomerRowActions row={row} hiddenActions={hiddenActions} />,
		}] : []),
	]
}
