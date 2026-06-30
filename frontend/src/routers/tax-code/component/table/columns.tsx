import { DataTableColumnHeader } from "@/components/DataTable/components/data-table-column-header"
import { ColumnDef, Row } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/util/formatDate"
import { TaxCodeIndex } from "../../interface"
import { TaxCodeRowActions } from "../row-actions"

export const taxCodeGetColumns = (hiddenActions?: string[]): ColumnDef<TaxCodeIndex>[] => {
	const allActionsHidden = hiddenActions && (hiddenActions.includes('all') || (hiddenActions.includes('view') && hiddenActions.includes('edit') && hiddenActions.includes('delete')));
	return [
		{
			accessorKey: "taxCodeName",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Tax Code Name" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("taxCodeName"))
    ? (row.getValue("taxCodeName") as unknown[]).join(', ')
    : (typeof row.getValue("taxCodeName") === 'object' && row.getValue("taxCodeName") !== null
        ? JSON.stringify(row.getValue("taxCodeName"))
        : (row.getValue("taxCodeName") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "rate",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Rate" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("rate"))
    ? (row.getValue("rate") as unknown[]).join(', ')
    : (typeof row.getValue("rate") === 'object' && row.getValue("rate") !== null
        ? JSON.stringify(row.getValue("rate"))
        : (row.getValue("rate") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "description",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Description" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("description"))
    ? (row.getValue("description") as unknown[]).join(', ')
    : (typeof row.getValue("description") === 'object' && row.getValue("description") !== null
        ? JSON.stringify(row.getValue("description"))
        : (row.getValue("description") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "entityId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Entity Id" />
			),
			cell: ({ row }) => <span>{row.original.taxCodesLabel || row.getValue("entityId")}</span>,
		},
		{
			accessorKey: "isActive",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Is Active" />
			),
			cell: ({ row }) => (<>{<Badge variant={row.getValue("isActive") ? 'default' : 'secondary'}>{row.getValue("isActive") === true ? 'Active' : 'Inactive'}</Badge>}</>),
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
			cell: ({ row }: { row: Row<TaxCodeIndex> }) => <TaxCodeRowActions row={row} hiddenActions={hiddenActions} />,
		}] : []),
	]
}
