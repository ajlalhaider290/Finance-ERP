import { MenuItem } from "@/interface/common"
import * as LucideIcons from 'lucide-react';

export const authMenus : MenuItem[] = [
{
    label: 'user',
    key: '/userLogin',
	scope: []}]
export const defaultMenus : MenuItem[] = [
    {
        key: "/dashboard",
        label: "Dashboard",
        scope: [],
       icon: LucideIcons.LayoutDashboard
    },
    {
        key: "/reimbursement-requests",
        label: "Reimbursements",
        scope: ["user:superAdmin", "user:accountsManager", "user:accountant", "user:approver", "user:employee"],
        icon: LucideIcons.Receipt,
        children: [
            {
                key: "/reimbursement-requests",
                label: "Requests",
                scope: ["user:superAdmin", "user:accountsManager", "user:accountant", "user:approver", "user:employee"]
            },
            {
                key: "/reimbursement-documents",
                label: "Documents",
                scope: ["user:superAdmin"]
            },
            {
                key: "/reimbursement-status-histories",
                label: "Status History",
                scope: ["user:superAdmin"]
            }
        ]
    },
    {
        key: "/approval-tasks",
        label: "Approvals",
        scope: ["user:superAdmin", "user:accountsManager", "user:accountant", "user:approver"],
        icon: LucideIcons.ClipboardCheck,
        children: [
            {
                key: "/approval-tasks",
                label: "Pending Tasks",
                scope: ["user:superAdmin", "user:accountsManager", "user:accountant", "user:approver"]
            },
            {
                key: "/approval-histories",
                label: "Approval History",
                scope: ["user:superAdmin", "user:accountsManager", "user:accountant", "user:approver"]
            }
        ]
    },
    {
        key: "/invoices",
        label: "Invoices",
        scope: ["user:superAdmin", "user:accountsManager", "user:accountant", "user:approver"],
        icon: LucideIcons.FileText,
        children: [
            {
                key: "/invoices",
                label: "Invoices",
                scope: ["user:superAdmin", "user:accountsManager", "user:accountant", "user:approver"]
            },
            {
                key: "/invoice-documents",
                label: "Documents",
                scope: ["user:superAdmin", "user:accountant"]
            },
            {
                key: "/invoice-line-items",
                label: "Line Items",
                scope: ["user:superAdmin", "user:accountsManager", "user:accountant"]
            }
        ]
    },
    {
        key: "/intercompany-transactions",
        label: "Intercompany",
        scope: ["user:superAdmin", "user:accountsManager", "user:accountant", "user:approver"],
        icon: LucideIcons.GitFork,
        children: [
            {
                key: "/intercompany-transactions",
                label: "Transactions",
                scope: ["user:superAdmin", "user:accountsManager", "user:accountant", "user:approver"]
            },
            {
                key: "/intercompany-settlement-records",
                label: "Settlements",
                scope: ["user:superAdmin", "user:accountsManager", "user:accountant"]
            }
        ]
    },
    {
        key: "/journal-entries",
        label: "Accounting",
        scope: ["user:superAdmin", "user:accountsManager", "user:accountant"],
        icon: LucideIcons.BookText,
        children: [
            {
                key: "/journal-entries",
                label: "Journal Entries",
                scope: ["user:superAdmin", "user:accountsManager", "user:accountant"]
            },
            {
                key: "/payments",
                label: "Payments",
                scope: ["user:superAdmin", "user:accountsManager", "user:accountant"]
            },
            {
                key: "/tax-codes",
                label: "Tax Codes",
                scope: ["user:superAdmin", "user:accountsManager", "user:accountant"]
            },
            {
                key: "/journal-entry-lines",
                label: "Journal Lines",
                scope: ["user:superAdmin", "user:accountsManager", "user:accountant"]
            },
            {
                key: "/payment-allocations",
                label: "Payment Allocations",
                scope: ["user:superAdmin", "user:accountsManager", "user:accountant"]
            }
        ]
    },
    {
        key: "/vendors",
        label: "Master Data",
        scope: ["user:superAdmin", "user:accountsManager", "user:accountant", "user:approver"],
        icon: LucideIcons.Database,
        children: [
            {
                key: "/vendors",
                label: "Vendors",
                scope: ["user:superAdmin", "user:accountsManager", "user:accountant"]
            },
            {
                key: "/customers",
                label: "Customers",
                scope: ["user:superAdmin", "user:accountsManager", "user:accountant"]
            },
            {
                key: "/company-entities",
                label: "Company Entities",
                scope: ["user:superAdmin", "user:accountsManager", "user:accountant", "user:approver"]
            },
            {
                key: "/expense-categories",
                label: "Expense Categories",
                scope: ["user:superAdmin", "user:approver"]
            }
        ]
    },
    {
        key: "/users",
        label: "Administration",
        scope: ["user:superAdmin", "user:accountsManager", "user:accountant", "user:approver"],
        icon: LucideIcons.Users,
        children: [
            {
                key: "/users",
                label: "Users",
                scope: ["user:superAdmin", "user:accountsManager", "user:accountant", "user:approver"]
            }
        ]
    }
]
