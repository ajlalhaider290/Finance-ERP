import { DataTableColumnHeader } from "@/components/DataTable/components/data-table-column-header"
import { ColumnDef, Row } from "@tanstack/react-table"
import { formatDate } from "@/util/formatDate"
import { ExpenseCategoryIndex } from "../../interface"
import { ExpenseCategoryRowActions } from "../row-actions"

export const expenseCategoryGetColumns = (hiddenActions?: string[]): ColumnDef<ExpenseCategoryIndex>[] => {
	const allActionsHidden = hiddenActions && (hiddenActions.includes('all') || (hiddenActions.includes('view') && hiddenActions.includes('edit') && hiddenActions.includes('delete')));
	return [
		{
			accessorKey: "categoryName",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Category Name" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("categoryName"))
    ? (row.getValue("categoryName") as unknown[]).join(', ')
    : (typeof row.getValue("categoryName") === 'object' && row.getValue("categoryName") !== null
        ? JSON.stringify(row.getValue("categoryName"))
        : (row.getValue("categoryName") as string | number | boolean | null | undefined))) ?? '-'}</>),
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
			cell: ({ row }) => <span>{row.original.expenseCategoriesLabel || row.getValue("entityId")}</span>,
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
			cell: ({ row }: { row: Row<ExpenseCategoryIndex> }) => <ExpenseCategoryRowActions row={row} hiddenActions={hiddenActions} />,
		}] : []),
	]
}
