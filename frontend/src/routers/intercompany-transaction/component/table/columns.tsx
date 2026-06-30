import { DataTableColumnHeader } from "@/components/DataTable/components/data-table-column-header"
import { ColumnDef, Row } from "@tanstack/react-table"
import { JSONValueRenderer } from "@/components/JSONValueRenderer"
import { formatDate } from "@/util/formatDate"
import { IntercompanyTransactionIndex } from "../../interface"
import { IntercompanyTransactionRowActions } from "../row-actions"

export const intercompanyTransactionGetColumns = (hiddenActions?: string[]): ColumnDef<IntercompanyTransactionIndex>[] => {
	const allActionsHidden = hiddenActions && (hiddenActions.includes('all') || (hiddenActions.includes('view') && hiddenActions.includes('edit') && hiddenActions.includes('delete')));
	return [
		{
			accessorKey: "sourceEntityId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Source Entity Id" />
			),
			cell: ({ row }) => <span>{row.original.transactionsFromSourceLabel || row.getValue("sourceEntityId")}</span>,
		},
		{
			accessorKey: "targetEntityId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Target Entity Id" />
			),
			cell: ({ row }) => <span>{row.original.transactionsToTargetLabel || row.getValue("targetEntityId")}</span>,
		},
		{
			accessorKey: "transactionDate",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Transaction Date" />
			),
			cell: ({ row }) => (<>{row.getValue("transactionDate") ? formatDate(row.getValue("transactionDate"), 'DATE') : '-'}</>),
		},
		{
			accessorKey: "transactionType",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Transaction Type" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("transactionType"))
    ? (row.getValue("transactionType") as unknown[]).join(', ')
    : (typeof row.getValue("transactionType") === 'object' && row.getValue("transactionType") !== null
        ? JSON.stringify(row.getValue("transactionType"))
        : (row.getValue("transactionType") as string | number | boolean | null | undefined))) ?? '-'}</>),
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
			accessorKey: "amount",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Amount" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("amount"))
    ? (row.getValue("amount") as unknown[]).join(', ')
    : (typeof row.getValue("amount") === 'object' && row.getValue("amount") !== null
        ? JSON.stringify(row.getValue("amount"))
        : (row.getValue("amount") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "lineDetail",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Line Details" />
			),
			cell: ({ row }) => (<>{<JSONValueRenderer value={row.getValue("lineDetail")} />}</>),
		},
		{
			accessorKey: "taxAmount",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Tax Amount" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("taxAmount"))
    ? (row.getValue("taxAmount") as unknown[]).join(', ')
    : (typeof row.getValue("taxAmount") === 'object' && row.getValue("taxAmount") !== null
        ? JSON.stringify(row.getValue("taxAmount"))
        : (row.getValue("taxAmount") as string | number | boolean | null | undefined))) ?? '-'}</>),
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
			accessorKey: "currentApproverId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Current Approver Id" />
			),
			cell: ({ row }) => <span>{row.original.intercompanyApprovalsAssignedLabel || row.getValue("currentApproverId")}</span>,
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
			cell: ({ row }: { row: Row<IntercompanyTransactionIndex> }) => <IntercompanyTransactionRowActions row={row} hiddenActions={hiddenActions} />,
		}] : []),
	]
}
