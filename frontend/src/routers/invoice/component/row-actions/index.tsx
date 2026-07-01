import { DataTableAction } from "@/components/DataTable/components/actions/data-table-action"
import { EyeIcon, EditIcon, Trash2, Send, CheckCircle2, XCircle, Undo2 } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { RootState, useAppDispatch, useAppSelector } from "@/store"
import { setSelectedObj } from "@/store/slice/selectedObjSlice"
import INVOICE_CONSTANTS from "../../constants"
import { InvoiceIndex} from "../../interface"
import { approveInvoice, rejectInvoice, returnInvoice, submitInvoice } from "../../service"
import { CleanError } from "@/util/CleanError"

interface InvoiceRowActionsProps {
    row: {
        original: InvoiceIndex
    }
    hiddenActions?: string[]
}

export const InvoiceRowActions: React.FC<InvoiceRowActionsProps> = ({ row, hiddenActions = [] }) => {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    const { user } = useAppSelector((state: RootState) => state.session);

    const { _meta } = row.original;
    const label = _meta?.label || '';
    const objKey = INVOICE_CONSTANTS.ENTITY_KEY;
    const primaryKeys = _meta?.primaryKeys || {};
    const scopes = user?.scope || [];
    const canSubmit = scopes.some((scope: string) => ['user:accountant', 'user:accountsManager', 'user:superAdmin'].includes(scope));
    const canReview = scopes.some((scope: string) => ['user:approver', 'user:accountsManager', 'user:superAdmin'].includes(scope));
    const isAssignedApprover = row.original.currentApproverId === user?.userId;
    const reviewVisible = canReview && (scopes.includes('user:accountsManager') || scopes.includes('user:superAdmin') || isAssignedApprover);
    const submitVisible = canSubmit && ['draft', 'returned', 'rejected'].includes(row.original.status);
    const approvalVisible = reviewVisible && ['submitted', 'under review'].includes(row.original.status);

    const workflowMutation = useMutation({
        mutationFn: async (action: 'submit' | 'approve' | 'reject' | 'return') => {
            if (action === 'submit') return submitInvoice(primaryKeys);
            if (action === 'approve') return approveInvoice(primaryKeys);
            if (action === 'reject') return rejectInvoice(primaryKeys);
            return returnInvoice(primaryKeys);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [INVOICE_CONSTANTS.QUERY_KEY], exact: false });
            toast.success('Invoice status updated');
        },
        onError: (error) => toast.error(CleanError(error)),
    });

    const handleAction = (mode: string) => {
        dispatch(setSelectedObj({
            objKey,
            mode,
            label,
            primaryKeys
        }));
    };

    if (hiddenActions.includes('all')) return null;

    const showView = !hiddenActions.includes('view');
    const showEdit = !hiddenActions.includes('edit');
    const showDelete = !hiddenActions.includes('delete');

    return (
        <div className="flex space-x-2">
            {submitVisible && (
                <DataTableAction
                    label="Submit"
                    title="Submit Invoice"
                    colorVariant="primary"
                    icon={Send}
                    onClick={() => workflowMutation.mutate('submit')}
                    disabled={workflowMutation.isPending}
                    permission={{
                        module: INVOICE_CONSTANTS.PERMISSIONS.MODULE,
                        resource: INVOICE_CONSTANTS.PERMISSIONS.RESOURCE,
                        action: INVOICE_CONSTANTS.PERMISSIONS.ACTIONS.EDIT,
                    }}
                />
            )}
            {approvalVisible && (
                <>
                    <DataTableAction
                        label="Approve"
                        title="Approve Invoice"
                        colorVariant="success"
                        icon={CheckCircle2}
                        onClick={() => workflowMutation.mutate('approve')}
                        disabled={workflowMutation.isPending}
                        permission={{
                            module: INVOICE_CONSTANTS.PERMISSIONS.MODULE,
                            resource: INVOICE_CONSTANTS.PERMISSIONS.RESOURCE,
                            action: INVOICE_CONSTANTS.PERMISSIONS.ACTIONS.EDIT,
                        }}
                    />
                    <DataTableAction
                        label="Return"
                        title="Return Invoice"
                        colorVariant="warning"
                        icon={Undo2}
                        onClick={() => workflowMutation.mutate('return')}
                        disabled={workflowMutation.isPending}
                        permission={{
                            module: INVOICE_CONSTANTS.PERMISSIONS.MODULE,
                            resource: INVOICE_CONSTANTS.PERMISSIONS.RESOURCE,
                            action: INVOICE_CONSTANTS.PERMISSIONS.ACTIONS.EDIT,
                        }}
                    />
                    <DataTableAction
                        label="Reject"
                        title="Reject Invoice"
                        colorVariant="destructive"
                        icon={XCircle}
                        onClick={() => workflowMutation.mutate('reject')}
                        disabled={workflowMutation.isPending}
                        permission={{
                            module: INVOICE_CONSTANTS.PERMISSIONS.MODULE,
                            resource: INVOICE_CONSTANTS.PERMISSIONS.RESOURCE,
                            action: INVOICE_CONSTANTS.PERMISSIONS.ACTIONS.EDIT,
                        }}
                    />
                </>
            )}
            {showView && (
                <DataTableAction
                    label={label}
                    title="View Details"
                    variant="outline"
                    size="icon"
                    icon={EyeIcon}
                    onClick={() => handleAction('view')}
                    permission={{
                        module: INVOICE_CONSTANTS.PERMISSIONS.MODULE,
                        resource: INVOICE_CONSTANTS.PERMISSIONS.RESOURCE,
                        action: INVOICE_CONSTANTS.PERMISSIONS.ACTIONS.VIEW,
                    }}
                />
            )}
            {showEdit && (
                <DataTableAction
                    label={label}
                    title="Edit"
                    colorVariant="warning"
                    icon={EditIcon}
                    onClick={() => handleAction('edit')}
                    permission={{
                        module: INVOICE_CONSTANTS.PERMISSIONS.MODULE,
                        resource: INVOICE_CONSTANTS.PERMISSIONS.RESOURCE,
                        action: INVOICE_CONSTANTS.PERMISSIONS.ACTIONS.EDIT,
                    }}
                />
            )}
            {showDelete && (
                <DataTableAction
                    label={label}
                    title="Delete"
                    colorVariant="destructive"
                    icon={Trash2}
                    onClick={() => handleAction('delete')}
                    permission={{
                        module: INVOICE_CONSTANTS.PERMISSIONS.MODULE,
                        resource: INVOICE_CONSTANTS.PERMISSIONS.RESOURCE,
                        action: INVOICE_CONSTANTS.PERMISSIONS.ACTIONS.DELETE,
                    }}
                />
            )}
        </div>
    )
}
