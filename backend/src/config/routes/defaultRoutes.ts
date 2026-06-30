import { RouteConfig } from '../../util/routeConfig';
import { LookupRoutes } from '../../modules/look-ups/router';
import { ApprovalHistoryRoutes } from '../../modules/approval-history/router';
import { ApprovalTaskRoutes } from '../../modules/approval-task/router';
import { CompanyEntityRoutes } from '../../modules/company-entity/router';
import { CustomerRoutes } from '../../modules/customer/router';
import { ExpenseCategoryRoutes } from '../../modules/expense-category/router';
import { IntercompanySettlementRecordRoutes } from '../../modules/intercompany-settlement-record/router';
import { IntercompanyTransactionRoutes } from '../../modules/intercompany-transaction/router';
import { InvoiceDocumentRoutes } from '../../modules/invoice-document/router';
import { InvoiceLineItemRoutes } from '../../modules/invoice-line-item/router';
import { InvoiceRoutes } from '../../modules/invoice/router';
import { JournalEntryRoutes } from '../../modules/journal-entry/router';
import { JournalEntryLineRoutes } from '../../modules/journal-entry-line/router';
import { PaymentAllocationRoutes } from '../../modules/payment-allocation/router';
import { PaymentRoutes } from '../../modules/payment/router';
import { ReimbursementDocumentRoutes } from '../../modules/reimbursement-document/router';
import { ReimbursementRequestRoutes } from '../../modules/reimbursement-request/router';
import { ReimbursementStatusHistoryRoutes } from '../../modules/reimbursement-status-history/router';
import { TaxCodeRoutes } from '../../modules/tax-code/router';
import { UserRoutes } from '../../modules/user/router';
import { VendorRoutes } from '../../modules/vendor/router';
import { UserAuthRoutes } from '../../modules/user-auth/router';
import { DashboardRoutes } from '../../modules/dashboard/router';
import { SupportAgentRoutes } from '../../modules/support-agent/router';


export const defaultRoutes: RouteConfig[] = [
{ path: '/look-ups', tags: ['api', 'Look Ups'], routes: LookupRoutes },
{ path: '/approval-histories', tags: ['api', 'Approval History'], routes: ApprovalHistoryRoutes },
{ path: '/approval-tasks', tags: ['api', 'Approval Task'], routes: ApprovalTaskRoutes },
{ path: '/company-entities', tags: ['api', 'Company Entity'], routes: CompanyEntityRoutes },
{ path: '/customers', tags: ['api', 'Customer'], routes: CustomerRoutes },
{ path: '/expense-categories', tags: ['api', 'Expense Category'], routes: ExpenseCategoryRoutes },
{ path: '/intercompany-settlement-records', tags: ['api', 'Intercompany Settlement Record'], routes: IntercompanySettlementRecordRoutes },
{ path: '/intercompany-transactions', tags: ['api', 'Intercompany Transaction'], routes: IntercompanyTransactionRoutes },
{ path: '/invoice-documents', tags: ['api', 'Invoice Document'], routes: InvoiceDocumentRoutes },
{ path: '/invoice-line-items', tags: ['api', 'Invoice Line Item'], routes: InvoiceLineItemRoutes },
{ path: '/invoices', tags: ['api', 'Invoice'], routes: InvoiceRoutes },
{ path: '/journal-entries', tags: ['api', 'Journal Entry'], routes: JournalEntryRoutes },
{ path: '/journal-entry-lines', tags: ['api', 'Journal Entry Line'], routes: JournalEntryLineRoutes },
{ path: '/payment-allocations', tags: ['api', 'Payment Allocation'], routes: PaymentAllocationRoutes },
{ path: '/payments', tags: ['api', 'Payment'], routes: PaymentRoutes },
{ path: '/reimbursement-documents', tags: ['api', 'Reimbursement Document'], routes: ReimbursementDocumentRoutes },
{ path: '/reimbursement-requests', tags: ['api', 'Reimbursement Request'], routes: ReimbursementRequestRoutes },
{ path: '/reimbursement-status-histories', tags: ['api', 'Reimbursement Status History'], routes: ReimbursementStatusHistoryRoutes },
{ path: '/tax-codes', tags: ['api', 'Tax Code'], routes: TaxCodeRoutes },
{ path: '/users', tags: ['api', 'User'], routes: UserRoutes },
{ path: '/vendors', tags: ['api', 'Vendor'], routes: VendorRoutes },
{ path: '/users-auth', tags: ['api', 'User Auth'], routes: UserAuthRoutes },
{ path: '/dashboard', tags: ['api', 'Dashboard'], routes: DashboardRoutes },
{ path: '/support-agent', tags: ['api', 'Support Agent'], routes: SupportAgentRoutes },
];