# Finance ERP

Internal finance operations ERP for reimbursement management, invoice management, intercompany transactions, approvals, payments, journal support, reporting, audit history, document handling, and role-based access control.

## What the System Covers

- Employee reimbursement submission, review, approval, status tracking, and supporting documents
- Vendor and customer invoice records, invoice status, payment status, and invoice documents
- Intercompany transaction records, settlement records, and reconciliation support
- Approval tasks and approval history
- Company entities, users, vendors, customers, tax codes, expense categories, and other master data
- Payments and payment allocations
- Journal entries and journal entry lines
- Finance dashboards for reimbursements, invoices, invoice amount, and payments
- Authentication, role-based access, and protected API routes

OCR is intentionally out of scope for this version.

## Project Structure

```text
Finance ERP/
  backend/    API, database models, migrations, auth, business modules
  frontend/   React application, dashboards, forms, tables, and layouts
```

## Demo Credentials

Use the prepared local demo account after the local database has been started and migrated:

```text
Email: demo.admin@finance-erp.local
Password: DemoPass123!
Role: superAdmin
```

## Local Demo Database

The project has an isolated local PostgreSQL data directory at:

```text
.postgres-data/
```

It runs on port `55432` so it does not conflict with existing system PostgreSQL services on port `5432`.

Start the local demo database:

```powershell
& 'C:\Program Files\PostgreSQL\16\bin\pg_ctl.exe' -D '.\.postgres-data' -l '.\.postgres-data\server.log' -o '-p 55432' start
```

Stop the local demo database:

```powershell
& 'C:\Program Files\PostgreSQL\16\bin\pg_ctl.exe' -D '.\.postgres-data' stop
```

The backend `.env` is configured for this local database:

```text
DB_HOST=localhost
DB_PORT=55432
DB_USER=postgres
DB_NAME=mydb
SYNC_DB=false
```

## Install

Install backend dependencies:

```powershell
cd backend
npm install
```

Install frontend dependencies:

```powershell
cd frontend
npm install
```

## Database Migration

From `backend/`:

```powershell
npm run migrate
npm run migrate:status
```

`migrate:status` shows pending migrations. No output means no pending migration files.

## Run the Application

Start the backend:

```powershell
cd backend
npm run dev
```

Backend runs at:

```text
http://localhost:8000
```

Start the frontend:

```powershell
cd frontend
npm run dev
```

Frontend runs at:

```text
http://localhost:3000
```

API documentation is available at:

```text
http://localhost:8000/documentation
http://localhost:8000/api-docs.json
```

Health check:

```text
http://localhost:8000/health
```

## Quality Checks

Backend:

```powershell
cd backend
npm run typecheck
npm run build
npm run lint
```

Frontend:

```powershell
cd frontend
npm run typecheck
npm run build
npm run lint
```

## Verified Demo Flow

The application has been smoke-tested end to end with:

1. Start local PostgreSQL on port `55432`.
2. Run backend migration.
3. Start backend on port `8000`.
4. Start frontend on port `3000`.
5. Register/login with the demo super admin.
6. Create a company entity.
7. Create an expense category.
8. Create a vendor.
9. Create a reimbursement request.
10. Create an invoice.
11. Open the dashboard and verify reimbursement and invoice KPIs.

## Suggested Presentation Flow

Use the 15-minute benchmark from the deck:

1. Problem and Solution, 3 minutes
   - Manual reimbursements, invoices, approvals, and intercompany tracking create delays, audit gaps, and poor visibility.
   - This ERP centralizes finance operations into one controlled workflow.

2. Live Demo, 7 minutes
   - Login as the demo admin.
   - Show dashboard KPIs.
   - Show company entities, vendors, expense categories, reimbursements, invoices, payments, journal entries, and approval modules.
   - Create or open a reimbursement request and invoice.
   - Show protected routes and role-based menu access.

3. HYPER Walkthrough, 3 minutes
   - Explain that the project was bootstrapped, inspected, corrected, documented, and verified with HYPER/Codex assistance.
   - Mention concrete fixes: runtime association alias repair, migration cleanup, frontend type/lint repair, finance-specific landing copy, isolated demo database, and end-to-end smoke flow.

4. Q&A, 2 minutes
   - Be ready to discuss production hardening: stronger workflow configuration, deeper accounting rules, audit reporting, deployment, backups, and integrations.

## Current Notes

- The app is not currently initialized as a Git repository.
- `.postgres-data/`, `node_modules/`, and `dist/` are ignored by the root `.gitignore`.
- Backend routes are protected by JWT. Use `/users-auth/login` to get a token before calling business routes directly.
- Existing PostgreSQL services on this machine use port `5432`; the demo database uses port `55432`.
