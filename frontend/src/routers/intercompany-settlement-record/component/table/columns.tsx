import { DataTableColumnHeader } from "@/components/DataTable/components/data-table-column-header"
import { ColumnDef, Row } from "@tanstack/react-table"
import { formatDate } from "@/util/formatDate"
import { IntercompanySettlementRecordIndex } from "../../interface"
import { IntercompanySettlementRecordRowActions } from "../row-actions"

export const intercompanySettlementRecordGetColumns = (hiddenActions?: string[]): ColumnDef<IntercompanySettlementRecordIndex>[] => {
	const allActionsHidden = hiddenActions && (hiddenActions.includes('all') || (hiddenActions.includes('view') && hiddenActions.includes('edit') && hiddenActions.includes('delete')));
	return [
		{
			accessorKey: "transactionId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Transaction Id" />
			),
			cell: ({ row }) => <span>{row.original.settlementRecordsLabel || row.getValue("transactionId")}</span>,
		},
		{
			accessorKey: "settlementDate",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Settlement Date" />
			),
			cell: ({ row }) => (<>{row.getValue("settlementDate") ? formatDate(row.getValue("settlementDate"), 'DATE') : '-'}</>),
		},
		{
			accessorKey: "settlementAmount",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Settlement Amount" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("settlementAmount"))
    ? (row.getValue("settlementAmount") as unknown[]).join(', ')
    : (typeof row.getValue("settlementAmount") === 'object' && row.getValue("settlementAmount") !== null
        ? JSON.stringify(row.getValue("settlementAmount"))
        : (row.getValue("settlementAmount") as string | number | boolean | null | undefined))) ?? '-'}</>),
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
			accessorKey: "recordedBy",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Recorded By Id" />
			),
			cell: ({ row }) => <span>{row.original.settlementsRecordedLabel || row.getValue("recordedBy")}</span>,
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
			cell: ({ row }: { row: Row<IntercompanySettlementRecordIndex> }) => <IntercompanySettlementRecordRowActions row={row} hiddenActions={hiddenActions} />,
		}] : []),
	]
}
