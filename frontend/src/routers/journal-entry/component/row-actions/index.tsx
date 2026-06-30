import { DataTableAction } from "@/components/DataTable/components/actions/data-table-action"
import { EyeIcon, EditIcon, Trash2 } from "lucide-react"
import { useAppDispatch } from "@/store"
import { setSelectedObj } from "@/store/slice/selectedObjSlice"
import JOURNAL_ENTRY_CONSTANTS from "../../constants"
import { JournalEntryIndex} from "../../interface"

interface JournalEntryRowActionsProps {
    row: {
        original: JournalEntryIndex
    }
    hiddenActions?: string[]
}

export const JournalEntryRowActions: React.FC<JournalEntryRowActionsProps> = ({ row, hiddenActions = [] }) => {
    const dispatch = useAppDispatch();

    const { _meta } = row.original;
    const label = _meta?.label || '';
    const objKey = JOURNAL_ENTRY_CONSTANTS.ENTITY_KEY;
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
                        module: JOURNAL_ENTRY_CONSTANTS.PERMISSIONS.MODULE,
                        resource: JOURNAL_ENTRY_CONSTANTS.PERMISSIONS.RESOURCE,
                        action: JOURNAL_ENTRY_CONSTANTS.PERMISSIONS.ACTIONS.VIEW,
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
                        module: JOURNAL_ENTRY_CONSTANTS.PERMISSIONS.MODULE,
                        resource: JOURNAL_ENTRY_CONSTANTS.PERMISSIONS.RESOURCE,
                        action: JOURNAL_ENTRY_CONSTANTS.PERMISSIONS.ACTIONS.EDIT,
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
                        module: JOURNAL_ENTRY_CONSTANTS.PERMISSIONS.MODULE,
                        resource: JOURNAL_ENTRY_CONSTANTS.PERMISSIONS.RESOURCE,
                        action: JOURNAL_ENTRY_CONSTANTS.PERMISSIONS.ACTIONS.DELETE,
                    }}
                />
            )}
        </div>
    )
}
