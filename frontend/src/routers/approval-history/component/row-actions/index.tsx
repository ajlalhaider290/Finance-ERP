import { DataTableAction } from "@/components/DataTable/components/actions/data-table-action"
import { EyeIcon, EditIcon, Trash2 } from "lucide-react"
import { useAppDispatch } from "@/store"
import { setSelectedObj } from "@/store/slice/selectedObjSlice"
import APPROVAL_HISTORY_CONSTANTS from "../../constants"
import { ApprovalHistoryIndex} from "../../interface"

interface ApprovalHistoryRowActionsProps {
    row: {
        original: ApprovalHistoryIndex
    }
    hiddenActions?: string[]
}

export const ApprovalHistoryRowActions: React.FC<ApprovalHistoryRowActionsProps> = ({ row, hiddenActions = [] }) => {
    const dispatch = useAppDispatch();

    const { _meta } = row.original;
    const label = _meta?.label || '';
    const objKey = APPROVAL_HISTORY_CONSTANTS.ENTITY_KEY;
    const primaryKeys = _meta?.primaryKeys || {};

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
            {showView && (
                <DataTableAction
                    label={label}
                    title="View Details"
                    variant="outline"
                    size="icon"
                    icon={EyeIcon}
                    onClick={() => handleAction('view')}
                    permission={{
                        module: APPROVAL_HISTORY_CONSTANTS.PERMISSIONS.MODULE,
                        resource: APPROVAL_HISTORY_CONSTANTS.PERMISSIONS.RESOURCE,
                        action: APPROVAL_HISTORY_CONSTANTS.PERMISSIONS.ACTIONS.VIEW,
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
                        module: APPROVAL_HISTORY_CONSTANTS.PERMISSIONS.MODULE,
                        resource: APPROVAL_HISTORY_CONSTANTS.PERMISSIONS.RESOURCE,
                        action: APPROVAL_HISTORY_CONSTANTS.PERMISSIONS.ACTIONS.EDIT,
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
                        module: APPROVAL_HISTORY_CONSTANTS.PERMISSIONS.MODULE,
                        resource: APPROVAL_HISTORY_CONSTANTS.PERMISSIONS.RESOURCE,
                        action: APPROVAL_HISTORY_CONSTANTS.PERMISSIONS.ACTIONS.DELETE,
                    }}
                />
            )}
        </div>
    )
}
