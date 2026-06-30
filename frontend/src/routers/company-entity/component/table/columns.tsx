import { DataTableColumnHeader } from "@/components/DataTable/components/data-table-column-header"
import { ColumnDef, Row } from "@tanstack/react-table"
import { formatDate } from "@/util/formatDate"
import { CompanyEntityIndex } from "../../interface"
import { CompanyEntityRowActions } from "../row-actions"

export const companyEntityGetColumns = (hiddenActions?: string[]): ColumnDef<CompanyEntityIndex>[] => {
	const allActionsHidden = hiddenActions && (hiddenActions.includes('all') || (hiddenActions.includes('view') && hiddenActions.includes('edit') && hiddenActions.includes('delete')));
	return [
		{
			accessorKey: "entityName",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Entity Name" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("entityName"))
    ? (row.getValue("entityName") as unknown[]).join(', ')
    : (typeof row.getValue("entityName") === 'object' && row.getValue("entityName") !== null
        ? JSON.stringify(row.getValue("entityName"))
        : (row.getValue("entityName") as string | number | boolean | null | undefined))) ?? '-'}</>),
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
			cell: ({ row }: { row: Row<CompanyEntityIndex> }) => <CompanyEntityRowActions row={row} hiddenActions={hiddenActions} />,
		}] : []),
	]
}
