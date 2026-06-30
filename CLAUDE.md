# CLAUDE.md

## Project Goal

Finance ERP is an internal finance operations application for reimbursements, invoices, approvals, intercompany transactions, payments, journals, dashboards, audit history, document records, and role-based access control.

OCR is out of scope for this version. Do not reintroduce OCR requirements unless the user explicitly asks.

## Judging Context

The user is preparing for the HYPER Build Sprint demo. Scoring criteria from the provided deck:

- Business Impact: 25
- HYPER Utilization: 25
- Technical Quality: 20
- Demo and Presentation: 15
- Innovation and Creativity: 15

Prioritize a working live demo, clear finance story, and clean handoff documentation.

## Important Paths

```text
Project root: C:\Users\MuhammadAjlalHaider\Desktop\Finance ERP
Backend:      C:\Users\MuhammadAjlalHaider\Desktop\Finance ERP\backend
Frontend:     C:\Users\MuhammadAjlalHaider\Desktop\Finance ERP\frontend
Deck:         C:\Users\MuhammadAjlalHaider\Downloads\HYPER_Final_Presentations_Opening.pptx
```

## Local Database

Use the isolated local PostgreSQL cluster under:

```text
.postgres-data/
```

It runs on port `55432`. Backend `.env` points to this database.

Start:

```powershell
& 'C:\Program Files\PostgreSQL\16\bin\pg_ctl.exe' -D '.\.postgres-data' -l '.\.postgres-data\server.log' -o '-p 55432' start
```

Stop:

```powershell
& 'C:\Program Files\PostgreSQL\16\bin\pg_ctl.exe' -D '.\.postgres-data' stop
```

If migration scripts hang, check for leftover `npm run migrate` or `ts-node src/migrations/umzug.ts` node processes. The migration runner was patched to close Sequelize after CLI completion.

## Demo Account

```text
Email: demo.admin@finance-erp.local
Password: DemoPass123!
Role: superAdmin
```

Do not print JWTs or secrets in user-facing responses.

## Commands

Backend:

```powershell
cd "C:\Users\MuhammadAjlalHaider\Desktop\Finance ERP\backend"
npm run typecheck
npm run build
npm run lint
npm run migrate
npm run migrate:status
npm run dev
```

Frontend:

```powershell
cd "C:\Users\MuhammadAjlalHaider\Desktop\Finance ERP\frontend"
npm run typecheck
npm run build
npm run lint
npm run dev
```

Runtime URLs:

```text
Backend:       http://localhost:8000
Frontend:      http://localhost:3000
Health:        http://localhost:8000/health
API docs:      http://localhost:8000/documentation
OpenAPI JSON:  http://localhost:8000/api-docs.json
```

## Changes Already Made

- Added root `.gitignore` for `.postgres-data/`, temp password file, logs, `node_modules/`, and `dist/`.
- Added backend ESLint 9 flat config and relaxed generator-hostile rules so lint can run cleanly.
- Fixed backend and frontend phone regex lint issues.
- Fixed frontend duplicate `reimbursementRequestsLabel` type fields.
- Fixed generated React Query keys by including `primaryKeys`.
- Fixed frontend `handleApiFormErrors` generic typing.
- Fixed unused layout prop alias in `HeaderActions`.
- Fixed duplicate Sequelize association aliases in `ReimbursementRequest`.
- Renamed reimbursement lookup labels to `employeeLabel`, `categoryLabel`, and `entityLabel`.
- Fixed `migrate:status` package script to use Umzug `pending`.
- Patched `src/migrations/umzug.ts` to close Sequelize after CLI completion.
- Updated the public home page from generic platform copy to finance ERP demo copy.
- Created and verified local demo data through API calls.

## Verification Already Completed

Backend:

- `npm run typecheck`
- `npm run build`
- `npm run lint`
- `npm run migrate`
- `npm run migrate:status`
- `GET /health`
- `GET /documentation`
- `GET /api-docs.json`
- Authenticated API smoke flow

Frontend:

- `npm run typecheck`
- `npm run build`
- `npm run lint`
- Browser smoke test at `http://localhost:3000`
- Login through UI
- Dashboard reached at `/dashboard`

## API Smoke Flow

Business routes are JWT protected. Authenticate first:

```text
POST /users-auth/login
```

Verified protected flow:

1. Login as demo admin.
2. Create company entity.
3. Create expense category.
4. Create vendor.
5. Create reimbursement request.
6. Create invoice.
7. Dashboard displays reimbursement/invoice KPIs.

## Project Notes

- The project is not currently a Git repository.
- The generated backend uses many modules with similar CRUD patterns.
- `SYNC_DB=false` is intentional. Use migrations as the schema path.
- The frontend home page should remain finance-specific for presentation impact.
- Avoid broad refactors before the demo. Prefer small fixes that protect the live flow.
