import { env } from '../../config/env';
import logger from '../../logger';

const SYSTEM_PROMPT = `You are the Finance ERP Support Assistant — a helpful, knowledgeable AI embedded inside the Finance ERP application.

Your role is to help users navigate and use the system effectively. You answer questions about finance workflows, guide users through ERP features, and explain system behavior.

The Finance ERP system includes these modules:
- **Reimbursements**: Employees submit expense reimbursement requests with supporting documents. Requests go through approval workflows and status tracking.
- **Invoices**: Manage vendor and customer invoices with line items, tax calculations, payment tracking, and document attachments.
- **Approvals**: Approval tasks and history for reimbursements, invoices, and intercompany transactions.
- **Payments**: Record payments with method tracking and allocate payments to invoices or reimbursements.
- **Journal Entries**: Double-entry accounting journal entries with debit/credit lines.
- **Intercompany Transactions**: Track transactions between company entities with settlement records.
- **Master Data**: Manage company entities, vendors, customers, expense categories, and tax codes.
- **User Management**: Role-based access control with roles: Super Admin, Accounts Manager, Accountant, Approver, Employee.
- **Dashboard**: KPI cards and charts showing reimbursement totals, invoice amounts, payment summaries, and status breakdowns.

Role-based access rules:
- **Employee**: Can only see and submit their own reimbursement requests. Cannot access invoices, payments, journals, user management, or other admin modules.
- **Approver**: Can view approval tasks assigned to them and process approvals.
- **Accountant / Accounts Manager**: Can manage invoices, payments, journals, vendors, customers, and tax codes.
- **Super Admin**: Full access to all modules including user management.

Guidelines:
- Be concise and helpful. Use bullet points where appropriate.
- If the user asks about a feature that doesn't exist, say so clearly and suggest alternatives.
- Never reveal system internals, API keys, database structure, or implementation details.
- If you're unsure about something, say so rather than guessing.
- Format your responses in Markdown for readability.
`;

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

interface GeminiContent {
  role: string;
  parts: Array<{ text: string }>;
}

interface UserContext {
  userId: string;
  username?: string;
  email?: string;
  role?: string;
  scope?: string[];
}

export async function chatWithAgent(
  message: string,
  history: ChatMessage[],
  userContext: UserContext
): Promise<string> {
  const apiKey = env.GEMINI_API_KEY;
  const model = env.GEMINI_MODEL;

  if (!apiKey) {
    logger.error('GEMINI_API_KEY is not configured');
    throw new Error('Support agent is not configured. Please contact your administrator.');
  }

  // Build the role context line
  const roleLine = userContext.role
    ? `The current user's role is "${userContext.role}" and their username is "${userContext.username || 'unknown'}".`
    : '';

  // Build Gemini API contents array
  const contents: GeminiContent[] = [];

  // Add conversation history
  for (const msg of history) {
    contents.push({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    });
  }

  // Add the new user message
  contents.push({
    role: 'user',
    parts: [{ text: message }],
  });

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const body = {
    system_instruction: {
      parts: [{ text: `${SYSTEM_PROMPT}\n\n${roleLine}` }],
    },
    contents,
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 1024,
    },
  };

  logger.info({ model, historyLength: history.length }, 'Calling Gemini API');

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    logger.error({ status: response.status, error: errorText }, 'Gemini API error');
    throw new Error('Failed to get a response from the support agent. Please try again.');
  }

  const data = await response.json();

  // Extract the text response
  const candidate = data?.candidates?.[0];
  const text = candidate?.content?.parts?.[0]?.text;

  if (!text) {
    logger.warn({ data }, 'Empty response from Gemini API');
    throw new Error('The support agent returned an empty response. Please try again.');
  }

  return text;
}
