import { DataTableColumnHeader } from "@/components/DataTable/components/data-table-column-header"
import { ColumnDef, Row } from "@tanstack/react-table"
import { formatDate } from "@/util/formatDate"
import { ApprovalTaskIndex } from "../../interface"
import { ApprovalTaskRowActions } from "../row-actions"

export const approvalTaskGetColumns = (hiddenActions?: string[]): ColumnDef<ApprovalTaskIndex>[] => {
	const allActionsHidden = hiddenActions && (hiddenActions.includes('all') || (hiddenActions.includes('view') && hiddenActions.includes('edit') && hiddenActions.includes('delete')));
	return [
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
			accessorKey: "assignedToUserId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Assigned To User Id" />
			),
			cell: ({ row }) => <span>{row.original.assignedApprovalTasksLabel || row.getValue("assignedToUserId")}</span>,
		},
		{
			accessorKey: "assignedToRole",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Assigned To Role" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("assignedToRole"))
    ? (row.getValue("assignedToRole") as unknown[]).join(', ')
    : (typeof row.getValue("assignedToRole") === 'object' && row.getValue("assignedToRole") !== null
        ? JSON.stringify(row.getValue("assignedToRole"))
        : (row.getValue("assignedToRole") as string | number | boolean | null | undefined))) ?? '-'}</>),
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
		{
			accessorKey: "actionedBy",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Actioned By Id" />
			),
			cell: ({ row }) => <span>{row.original.actionedApprovalTasksLabel || row.getValue("actionedBy")}</span>,
		},
		{
			accessorKey: "actionedAt",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Actioned At" />
			),
			cell: ({ row }) => (<>{row.getValue("actionedAt") ? formatDate(row.getValue("actionedAt"), 'DATE_TIME') : '-'}</>),
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
			cell: ({ row }: { row: Row<ApprovalTaskIndex> }) => <ApprovalTaskRowActions row={row} hiddenActions={hiddenActions} />,
		}] : []),
	]
}
