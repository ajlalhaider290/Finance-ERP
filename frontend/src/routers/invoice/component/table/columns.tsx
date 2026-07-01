import { DataTableColumnHeader } from "@/components/DataTable/components/data-table-column-header"
import { ColumnDef, Row } from "@tanstack/react-table"
import { formatDate } from "@/util/formatDate"
import { InvoiceIndex } from "../../interface"
import { InvoiceRowActions } from "../row-actions"

export const invoiceGetColumns = (hiddenActions?: string[]): ColumnDef<InvoiceIndex>[] => {
	const allActionsHidden = hiddenActions && (hiddenActions.includes('all') || (hiddenActions.includes('view') && hiddenActions.includes('edit') && hiddenActions.includes('delete')));
	return [
		{
			accessorKey: "vendorId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Vendor Id" />
			),
			cell: ({ row }) => <span>{row.original.invoicesFromVendorLabel || row.getValue("vendorId")}</span>,
		},
		{
			accessorKey: "customerId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Customer Id" />
			),
			cell: ({ row }) => <span>{row.original.invoicesToCustomerLabel || row.getValue("customerId")}</span>,
		},
		{
			accessorKey: "invoiceNumber",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Invoice Number" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("invoiceNumber"))
    ? (row.getValue("invoiceNumber") as unknown[]).join(', ')
    : (typeof row.getValue("invoiceNumber") === 'object' && row.getValue("invoiceNumber") !== null
        ? JSON.stringify(row.getValue("invoiceNumber"))
        : (row.getValue("invoiceNumber") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "sourceType",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Source" />
			),
			cell: ({ row }) => {
				const sourceType = row.original.sourceType || 'manual';
				const sourceLabel = row.original.sourceReimbursementRequestLabel || row.original.sourceIntercompanyTransactionLabel;
				return <span>{sourceLabel ? `${sourceType}: ${sourceLabel}` : sourceType}</span>;
			},
		},
		{
			accessorKey: "invoiceDate",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Invoice Date" />
			),
			cell: ({ row }) => (<>{row.getValue("invoiceDate") ? formatDate(row.getValue("invoiceDate"), 'DATE') : '-'}</>),
		},
		{
			accessorKey: "dueDate",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Due Date" />
			),
			cell: ({ row }) => (<>{row.getValue("dueDate") ? formatDate(row.getValue("dueDate"), 'DATE') : '-'}</>),
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
			accessorKey: "subtotal",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Subtotal" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("subtotal"))
    ? (row.getValue("subtotal") as unknown[]).join(', ')
    : (typeof row.getValue("subtotal") === 'object' && row.getValue("subtotal") !== null
        ? JSON.stringify(row.getValue("subtotal"))
        : (row.getValue("subtotal") as string | number | boolean | null | undefined))) ?? '-'}</>),
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
			accessorKey: "totalAmount",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Total Amount" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("totalAmount"))
    ? (row.getValue("totalAmount") as unknown[]).join(', ')
    : (typeof row.getValue("totalAmount") === 'object' && row.getValue("totalAmount") !== null
        ? JSON.stringify(row.getValue("totalAmount"))
        : (row.getValue("totalAmount") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "paidAmount",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Paid Amount" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("paidAmount"))
    ? (row.getValue("paidAmount") as unknown[]).join(', ')
    : (typeof row.getValue("paidAmount") === 'object' && row.getValue("paidAmount") !== null
        ? JSON.stringify(row.getValue("paidAmount"))
        : (row.getValue("paidAmount") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "balanceDue",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Balance Due" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("balanceDue"))
    ? (row.getValue("balanceDue") as unknown[]).join(', ')
    : (typeof row.getValue("balanceDue") === 'object' && row.getValue("balanceDue") !== null
        ? JSON.stringify(row.getValue("balanceDue"))
        : (row.getValue("balanceDue") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "paymentStatus",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Payment Status" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("paymentStatus"))
    ? (row.getValue("paymentStatus") as unknown[]).join(', ')
    : (typeof row.getValue("paymentStatus") === 'object' && row.getValue("paymentStatus") !== null
        ? JSON.stringify(row.getValue("paymentStatus"))
        : (row.getValue("paymentStatus") as string | number | boolean | null | undefined))) ?? '-'}</>),
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
			cell: ({ row }) => <span>{row.original.invoiceApprovalsAssignedLabel || row.getValue("currentApproverId")}</span>,
		},
		{
			accessorKey: "invoiceDocumentId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Invoice Document Id" />
			),
			cell: ({ row }) => <span>{row.original.invoiceRecordsLabel || row.getValue("invoiceDocumentId")}</span>,
		},
		{
			accessorKey: "entityId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Entity Id" />
			),
			cell: ({ row }) => <span>{row.original.invoicesLabel || row.getValue("entityId")}</span>,
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
			cell: ({ row }: { row: Row<InvoiceIndex> }) => <InvoiceRowActions row={row} hiddenActions={hiddenActions} />,
		}] : []),
	]
}
