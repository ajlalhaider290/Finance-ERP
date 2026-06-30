import { DataTableColumnHeader } from "@/components/DataTable/components/data-table-column-header"
import { ColumnDef, Row } from "@tanstack/react-table"
import { formatDate } from "@/util/formatDate"
import { VendorIndex } from "../../interface"
import { VendorRowActions } from "../row-actions"

export const vendorGetColumns = (hiddenActions?: string[]): ColumnDef<VendorIndex>[] => {
	const allActionsHidden = hiddenActions && (hiddenActions.includes('all') || (hiddenActions.includes('view') && hiddenActions.includes('edit') && hiddenActions.includes('delete')));
	return [
		{
			accessorKey: "vendorName",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Vendor Name" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("vendorName"))
    ? (row.getValue("vendorName") as unknown[]).join(', ')
    : (typeof row.getValue("vendorName") === 'object' && row.getValue("vendorName") !== null
        ? JSON.stringify(row.getValue("vendorName"))
        : (row.getValue("vendorName") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "contactEmail",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Contact Email" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("contactEmail"))
    ? (row.getValue("contactEmail") as unknown[]).join(', ')
    : (typeof row.getValue("contactEmail") === 'object' && row.getValue("contactEmail") !== null
        ? JSON.stringify(row.getValue("contactEmail"))
        : (row.getValue("contactEmail") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "contactPhone",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Contact Phone" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("contactPhone"))
    ? (row.getValue("contactPhone") as unknown[]).join(', ')
    : (typeof row.getValue("contactPhone") === 'object' && row.getValue("contactPhone") !== null
        ? JSON.stringify(row.getValue("contactPhone"))
        : (row.getValue("contactPhone") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "address",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Address" />
			),
			cell: ({ row }) => (<>{(Array.isArray(row.getValue("address"))
    ? (row.getValue("address") as unknown[]).join(', ')
    : (typeof row.getValue("address") === 'object' && row.getValue("address") !== null
        ? JSON.stringify(row.getValue("address"))
        : (row.getValue("address") as string | number | boolean | null | undefined))) ?? '-'}</>),
		},
		{
			accessorKey: "entityId",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Entity Id" />
			),
			cell: ({ row }) => <span>{row.original.vendorsLabel || row.getValue("entityId")}</span>,
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
			cell: ({ row }: { row: Row<VendorIndex> }) => <VendorRowActions row={row} hiddenActions={hiddenActions} />,
		}] : []),
	]
}
