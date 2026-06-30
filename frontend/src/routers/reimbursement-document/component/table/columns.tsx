import { DataTableColumnHeader } from "@/components/DataTable/components/data-table-column-header"
import { ColumnDef, Row } from "@tanstack/react-table"
import FileViewer from "@/components/FileViewer"
import { formatDate } from "@/util/formatDate"
import { ReimbursementDocumentIndex } from "../../interface"
import { ReimbursementDocumentRowActions } from "../row-actions"

export const reimbursementDocumentGetColumns = (hiddenActions?: string[]): ColumnDef<ReimbursementDocumentIndex>[] => {
	const allActionsHidden = hiddenActions && (hiddenActions.includes('all') || (hiddenActions.includes('view') && hiddenActions.includes('edit') && hiddenActions.includes('delete')));
	return [
		{
			accessorKey: "reimbursementRequestId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Reimbursement Request Id" />
			),
			cell: ({ row }) => <span>{row.original.reimbursementDocumentsLabel || row.getValue("reimbursementRequestId")}</span>,
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
			accessorKey: "fileUrl",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="File Url" />
			),
			cell: ({ row }) => (<>{<FileViewer size={25} value={row.getValue("fileUrl")} />}</>),
		},
		{
			accessorKey: "fileName",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="File Name" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("fileName"))
    ? (row.getValue("fileName") as unknown[]).join(', ')
    : (typeof row.getValue("fileName") === 'object' && row.getValue("fileName") !== null
        ? JSON.stringify(row.getValue("fileName"))
        : (row.getValue("fileName") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "uploadedBy",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Uploaded By Id" />
			),
			cell: ({ row }) => <span>{row.original.documentsUploadedLabel || row.getValue("uploadedBy")}</span>,
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
			cell: ({ row }: { row: Row<ReimbursementDocumentIndex> }) => <ReimbursementDocumentRowActions row={row} hiddenActions={hiddenActions} />,
		}] : []),
	]
}
