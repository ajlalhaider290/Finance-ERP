import { DataTableColumnHeader } from "@/components/DataTable/components/data-table-column-header"
import { ColumnDef, Row } from "@tanstack/react-table"
import { formatDate } from "@/util/formatDate"
import { ReimbursementStatusHistoryIndex } from "../../interface"
import { ReimbursementStatusHistoryRowActions } from "../row-actions"

export const reimbursementStatusHistoryGetColumns = (hiddenActions?: string[]): ColumnDef<ReimbursementStatusHistoryIndex>[] => {
	const allActionsHidden = hiddenActions && (hiddenActions.includes('all') || (hiddenActions.includes('view') && hiddenActions.includes('edit') && hiddenActions.includes('delete')));
	return [
		{
			accessorKey: "reimbursementRequestId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Reimbursement Request Id" />
			),
			cell: ({ row }) => <span>{row.original.statusHistoryLabel || row.getValue("reimbursementRequestId")}</span>,
		},
		{
			accessorKey: "oldStatus",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Old Status" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("oldStatus"))
    ? (row.getValue("oldStatus") as unknown[]).join(', ')
    : (typeof row.getValue("oldStatus") === 'object' && row.getValue("oldStatus") !== null
        ? JSON.stringify(row.getValue("oldStatus"))
        : (row.getValue("oldStatus") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "newStatus",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="New Status" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("newStatus"))
    ? (row.getValue("newStatus") as unknown[]).join(', ')
    : (typeof row.getValue("newStatus") === 'object' && row.getValue("newStatus") !== null
        ? JSON.stringify(row.getValue("newStatus"))
        : (row.getValue("newStatus") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "changedBy",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Changed By Id" />
			),
			cell: ({ row }) => <span>{row.original.statusChangesMadeLabel || row.getValue("changedBy")}</span>,
		},
		{
			accessorKey: "changeDate",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Change Date" />
			),
			cell: ({ row }) => (<>{row.getValue("changeDate") ? formatDate(row.getValue("changeDate"), 'TIMESTAMP') : '-'}</>),
		},
		{
			accessorKey: "userComment",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="User Comment" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("userComment"))
    ? (row.getValue("userComment") as unknown[]).join(', ')
    : (typeof row.getValue("userComment") === 'object' && row.getValue("userComment") !== null
        ? JSON.stringify(row.getValue("userComment"))
        : (row.getValue("userComment") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		...(!allActionsHidden ? [{
			id: "actions",
			header: "Actions",
			cell: ({ row }: { row: Row<ReimbursementStatusHistoryIndex> }) => <ReimbursementStatusHistoryRowActions row={row} hiddenActions={hiddenActions} />,
		}] : []),
	]
}
