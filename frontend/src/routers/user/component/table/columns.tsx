import { DataTableColumnHeader } from "@/components/DataTable/components/data-table-column-header"
import { ColumnDef, Row } from "@tanstack/react-table"
import { formatDate } from "@/util/formatDate"
import { UserIndex } from "../../interface"
import { UserRowActions } from "../row-actions"

export const userGetColumns = (hiddenActions?: string[]): ColumnDef<UserIndex>[] => {
	const allActionsHidden = hiddenActions && (hiddenActions.includes('all') || (hiddenActions.includes('view') && hiddenActions.includes('edit') && hiddenActions.includes('delete')));
	return [
		{
			accessorKey: "email",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Email" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("email"))
    ? (row.getValue("email") as unknown[]).join(', ')
    : (typeof row.getValue("email") === 'object' && row.getValue("email") !== null
        ? JSON.stringify(row.getValue("email"))
        : (row.getValue("email") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "username",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Username" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("username"))
    ? (row.getValue("username") as unknown[]).join(', ')
    : (typeof row.getValue("username") === 'object' && row.getValue("username") !== null
        ? JSON.stringify(row.getValue("username"))
        : (row.getValue("username") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "role",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Role" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("role"))
    ? (row.getValue("role") as unknown[]).join(', ')
    : (typeof row.getValue("role") === 'object' && row.getValue("role") !== null
        ? JSON.stringify(row.getValue("role"))
        : (row.getValue("role") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "department",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Department" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("department"))
    ? (row.getValue("department") as unknown[]).join(', ')
    : (typeof row.getValue("department") === 'object' && row.getValue("department") !== null
        ? JSON.stringify(row.getValue("department"))
        : (row.getValue("department") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "entityId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Entity Id" />
			),
			cell: ({ row }) => <span>{row.original.usersLabel || row.getValue("entityId")}</span>,
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
			cell: ({ row }: { row: Row<UserIndex> }) => <UserRowActions row={row} hiddenActions={hiddenActions} />,
		}] : []),
	]
}
