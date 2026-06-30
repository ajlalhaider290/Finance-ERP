import { DataTableColumnHeader } from "@/components/DataTable/components/data-table-column-header"
import { ColumnDef, Row } from "@tanstack/react-table"
import { formatDate } from "@/util/formatDate"
import { ApprovalHistoryIndex } from "../../interface"
import { ApprovalHistoryRowActions } from "../row-actions"

export const approvalHistoryGetColumns = (hiddenActions?: string[]): ColumnDef<ApprovalHistoryIndex>[] => {
	const allActionsHidden = hiddenActions && (hiddenActions.includes('all') || (hiddenActions.includes('view') && hiddenActions.includes('edit') && hiddenActions.includes('delete')));
	return [
		{
			accessorKey: "taskId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Task Id" />
			),
			cell: ({ row }) => <span>{row.original.approvalHistoryLabel || row.getValue("taskId")}</span>,
		},
		{
			accessorKey: "documentType",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Document Type" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("documentType"))
    ? (row.getValue("documentType") as unknown[]).join(', ')
    : (typeof row.getValue("documentType") === 'object' && row.getValue("documentType") !== null
        ? JSON.stringify(row.getValue("documentType"))
        : (row.getValue("documentType") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "documentId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Document Id" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("documentId"))
    ? (row.getValue("documentId") as unknown[]).join(', ')
    : (typeof row.getValue("documentId") === 'object' && row.getValue("documentId") !== null
        ? JSON.stringify(row.getValue("documentId"))
        : (row.getValue("documentId") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "approverId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Approver Id" />
			),
			cell: ({ row }) => <span>{row.original.approvalsMadeLabel || row.getValue("approverId")}</span>,
		},
		{
			accessorKey: "actionValue",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Action Value" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("actionValue"))
    ? (row.getValue("actionValue") as unknown[]).join(', ')
    : (typeof row.getValue("actionValue") === 'object' && row.getValue("actionValue") !== null
        ? JSON.stringify(row.getValue("actionValue"))
        : (row.getValue("actionValue") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "actionDate",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Action Date" />
			),
			cell: ({ row }) => (<>{row.getValue("actionDate") ? formatDate(row.getValue("actionDate"), 'TIMESTAMP') : '-'}</>),
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
			cell: ({ row }: { row: Row<ApprovalHistoryIndex> }) => <ApprovalHistoryRowActions row={row} hiddenActions={hiddenActions} />,
		}] : []),
	]
}
