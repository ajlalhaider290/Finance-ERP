import { DataTableColumnHeader } from "@/components/DataTable/components/data-table-column-header"
import { ColumnDef, Row } from "@tanstack/react-table"
import { formatDate } from "@/util/formatDate"
import { JournalEntryIndex } from "../../interface"
import { JournalEntryRowActions } from "../row-actions"

export const journalEntryGetColumns = (hiddenActions?: string[]): ColumnDef<JournalEntryIndex>[] => {
	const allActionsHidden = hiddenActions && (hiddenActions.includes('all') || (hiddenActions.includes('view') && hiddenActions.includes('edit') && hiddenActions.includes('delete')));
	return [
		{
			accessorKey: "entryDate",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Entry Date" />
			),
			cell: ({ row }) => (<>{row.getValue("entryDate") ? formatDate(row.getValue("entryDate"), 'DATE') : '-'}</>),
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
			accessorKey: "sourceDocumentType",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Source Document Type" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("sourceDocumentType"))
    ? (row.getValue("sourceDocumentType") as unknown[]).join(', ')
    : (typeof row.getValue("sourceDocumentType") === 'object' && row.getValue("sourceDocumentType") !== null
        ? JSON.stringify(row.getValue("sourceDocumentType"))
        : (row.getValue("sourceDocumentType") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "sourceDocumentId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Source Document Id" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("sourceDocumentId"))
    ? (row.getValue("sourceDocumentId") as unknown[]).join(', ')
    : (typeof row.getValue("sourceDocumentId") === 'object' && row.getValue("sourceDocumentId") !== null
        ? JSON.stringify(row.getValue("sourceDocumentId"))
        : (row.getValue("sourceDocumentId") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "entityId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Entity Id" />
			),
			cell: ({ row }) => <span>{row.original.journalEntriesLabel || row.getValue("entityId")}</span>,
		},
		{
			accessorKey: "postedBy",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Posted By Id" />
			),
			cell: ({ row }) => <span>{row.original.journalEntriesPostedLabel || row.getValue("postedBy")}</span>,
		},
		{
			accessorKey: "postedAt",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Posted At" />
			),
			cell: ({ row }) => (<>{row.getValue("postedAt") ? formatDate(row.getValue("postedAt"), 'DATE_TIME') : '-'}</>),
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
			cell: ({ row }: { row: Row<JournalEntryIndex> }) => <JournalEntryRowActions row={row} hiddenActions={hiddenActions} />,
		}] : []),
	]
}
