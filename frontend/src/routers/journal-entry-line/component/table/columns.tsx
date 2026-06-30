import { DataTableColumnHeader } from "@/components/DataTable/components/data-table-column-header"
import { ColumnDef, Row } from "@tanstack/react-table"
import { formatDate } from "@/util/formatDate"
import { JournalEntryLineIndex } from "../../interface"
import { JournalEntryLineRowActions } from "../row-actions"

export const journalEntryLineGetColumns = (hiddenActions?: string[]): ColumnDef<JournalEntryLineIndex>[] => {
	const allActionsHidden = hiddenActions && (hiddenActions.includes('all') || (hiddenActions.includes('view') && hiddenActions.includes('edit') && hiddenActions.includes('delete')));
	return [
		{
			accessorKey: "journalEntryId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Journal Entry Id" />
			),
			cell: ({ row }) => <span>{row.original.entryLinesLabel || row.getValue("journalEntryId")}</span>,
		},
		{
			accessorKey: "debitAmount",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Debit Amount" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("debitAmount"))
    ? (row.getValue("debitAmount") as unknown[]).join(', ')
    : (typeof row.getValue("debitAmount") === 'object' && row.getValue("debitAmount") !== null
        ? JSON.stringify(row.getValue("debitAmount"))
        : (row.getValue("debitAmount") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "creditAmount",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Credit Amount" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("creditAmount"))
    ? (row.getValue("creditAmount") as unknown[]).join(', ')
    : (typeof row.getValue("creditAmount") === 'object' && row.getValue("creditAmount") !== null
        ? JSON.stringify(row.getValue("creditAmount"))
        : (row.getValue("creditAmount") as string | number | boolean | null | undefined))) ?? '-'}</>),
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
			cell: ({ row }: { row: Row<JournalEntryLineIndex> }) => <JournalEntryLineRowActions row={row} hiddenActions={hiddenActions} />,
		}] : []),
	]
}
