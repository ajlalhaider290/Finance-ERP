import { DataTableColumnHeader } from "@/components/DataTable/components/data-table-column-header"
import { ColumnDef, Row } from "@tanstack/react-table"
import { formatDate } from "@/util/formatDate"
import { InvoiceLineItemIndex } from "../../interface"
import { InvoiceLineItemRowActions } from "../row-actions"

export const invoiceLineItemGetColumns = (hiddenActions?: string[]): ColumnDef<InvoiceLineItemIndex>[] => {
	const allActionsHidden = hiddenActions && (hiddenActions.includes('all') || (hiddenActions.includes('view') && hiddenActions.includes('edit') && hiddenActions.includes('delete')));
	return [
		{
			accessorKey: "invoiceId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Invoice Id" />
			),
			cell: ({ row }) => <span>{row.original.lineItemsLabel || row.getValue("invoiceId")}</span>,
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
			accessorKey: "quantity",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Quantity" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("quantity"))
    ? (row.getValue("quantity") as unknown[]).join(', ')
    : (typeof row.getValue("quantity") === 'object' && row.getValue("quantity") !== null
        ? JSON.stringify(row.getValue("quantity"))
        : (row.getValue("quantity") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "unitPrice",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Unit Price" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("unitPrice"))
    ? (row.getValue("unitPrice") as unknown[]).join(', ')
    : (typeof row.getValue("unitPrice") === 'object' && row.getValue("unitPrice") !== null
        ? JSON.stringify(row.getValue("unitPrice"))
        : (row.getValue("unitPrice") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "lineTotal",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Line Total" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("lineTotal"))
    ? (row.getValue("lineTotal") as unknown[]).join(', ')
    : (typeof row.getValue("lineTotal") === 'object' && row.getValue("lineTotal") !== null
        ? JSON.stringify(row.getValue("lineTotal"))
        : (row.getValue("lineTotal") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "taxCodeId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Tax Code Id" />
			),
			cell: ({ row }) => <span>{row.original.invoiceLineItemsLabel || row.getValue("taxCodeId")}</span>,
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
			cell: ({ row }: { row: Row<InvoiceLineItemIndex> }) => <InvoiceLineItemRowActions row={row} hiddenActions={hiddenActions} />,
		}] : []),
	]
}
