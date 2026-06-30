import { DataTableAction } from "@/components/DataTable/components/actions/data-table-action"
import { EyeIcon, EditIcon, Trash2 } from "lucide-react"
import { useAppDispatch } from "@/store"
import { setSelectedObj } from "@/store/slice/selectedObjSlice"
import TAX_CODE_CONSTANTS from "../../constants"
import { TaxCodeIndex} from "../../interface"

interface TaxCodeRowActionsProps {
    row: {
        original: TaxCodeIndex
    }
    hiddenActions?: string[]
}

export const TaxCodeRowActions: React.FC<TaxCodeRowActionsProps> = ({ row, hiddenActions = [] }) => {
    const dispatch = useAppDispatch();

    const { _meta } = row.original;
    const label = _meta?.label || '';
    const objKey = TAX_CODE_CONSTANTS.ENTITY_KEY;
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
                        module: TAX_CODE_CONSTANTS.PERMISSIONS.MODULE,
                        resource: TAX_CODE_CONSTANTS.PERMISSIONS.RESOURCE,
                        action: TAX_CODE_CONSTANTS.PERMISSIONS.ACTIONS.VIEW,
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
                        module: TAX_CODE_CONSTANTS.PERMISSIONS.MODULE,
                        resource: TAX_CODE_CONSTANTS.PERMISSIONS.RESOURCE,
                        action: TAX_CODE_CONSTANTS.PERMISSIONS.ACTIONS.EDIT,
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
                        module: TAX_CODE_CONSTANTS.PERMISSIONS.MODULE,
                        resource: TAX_CODE_CONSTANTS.PERMISSIONS.RESOURCE,
                        action: TAX_CODE_CONSTANTS.PERMISSIONS.ACTIONS.DELETE,
                    }}
                />
            )}
        </div>
    )
}
