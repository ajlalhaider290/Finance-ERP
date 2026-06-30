import { Application } from 'express';
import swaggerJsdoc, { SwaggerDefinition } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

// Swagger imports
import { default as authUserSwagger } from '../modules/user-auth/swagger';
import { default as approvalHistorySwagger } from '../modules/approval-history/swagger';
import { default as approvalTaskSwagger } from '../modules/approval-task/swagger';
import { default as companyEntitySwagger } from '../modules/company-entity/swagger';
import { default as customerSwagger } from '../modules/customer/swagger';
import { default as expenseCategorySwagger } from '../modules/expense-category/swagger';
import { default as intercompanySettlementRecordSwagger } from '../modules/intercompany-settlement-record/swagger';
import { default as intercompanyTransactionSwagger } from '../modules/intercompany-transaction/swagger';
import { default as invoiceDocumentSwagger } from '../modules/invoice-document/swagger';
import { default as invoiceLineItemSwagger } from '../modules/invoice-line-item/swagger';
import { default as invoiceSwagger } from '../modules/invoice/swagger';
import { default as journalEntrySwagger } from '../modules/journal-entry/swagger';
import { default as journalEntryLineSwagger } from '../modules/journal-entry-line/swagger';
import { default as paymentAllocationSwagger } from '../modules/payment-allocation/swagger';
import { default as paymentSwagger } from '../modules/payment/swagger';
import { default as reimbursementDocumentSwagger } from '../modules/reimbursement-document/swagger';
import { default as reimbursementRequestSwagger } from '../modules/reimbursement-request/swagger';
import { default as reimbursementStatusHistorySwagger } from '../modules/reimbursement-status-history/swagger';
import { default as taxCodeSwagger } from '../modules/tax-code/swagger';
import { default as userSwagger } from '../modules/user/swagger';
import { default as vendorSwagger } from '../modules/vendor/swagger';
import { default as dashboardSwagger } from '../modules/dashboard/swagger';

const mergeSwaggerConfigurations = (): SwaggerDefinition => {
  const allConfigs = [
    authUserSwagger,
		approvalHistorySwagger,
		approvalTaskSwagger,
		companyEntitySwagger,
		customerSwagger,
		expenseCategorySwagger,
		intercompanySettlementRecordSwagger,
		intercompanyTransactionSwagger,
		invoiceDocumentSwagger,
		invoiceLineItemSwagger,
		invoiceSwagger,
		journalEntrySwagger,
		journalEntryLineSwagger,
		paymentAllocationSwagger,
		paymentSwagger,
		reimbursementDocumentSwagger,
		reimbursementRequestSwagger,
		reimbursementStatusHistorySwagger,
		taxCodeSwagger,
		userSwagger,
		vendorSwagger,
		dashboardSwagger
  ];

  // Merge all paths
  const mergedPaths = {};
  const mergedSchemas = {};

  allConfigs.forEach(config => {
    if (config.paths) {
      Object.assign(mergedPaths, config.paths);
    }
    if (config.components?.schemas) {
      Object.assign(mergedSchemas, config.components.schemas);
    }
  });

  // Create the merged configuration
  const mergedConfig: SwaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Finance ERP API Documentation',
      version: '1.0.0',
      description: 'Comprehensive API documentation for the Finance ERP application.',
      contact: {
        name: 'API Support',
        email: 'support@sample.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 8000}`,
        description: 'Development server',
      }
    ],
    tags: [],
    paths: mergedPaths,
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"'
        },
      },
      schemas: mergedSchemas,
    },
    security: [{ bearerAuth: [] }],
  };

  return mergedConfig;
};

// Get the merged swagger configuration from separate files
const mergedSwaggerDefinition = mergeSwaggerConfigurations();

const options = {
  definition: mergedSwaggerDefinition,
  apis: ['./src/controller/*.ts', './src/areas/**/controller/*.ts'],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Application) => {
  app.use('/documentation', swaggerUi.serve, swaggerUi.setup(specs, {
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info { margin-bottom: 20px }
      .swagger-ui .scheme-container { background: #fafafa; padding: 15px; border-radius: 4px; margin-bottom: 20px }
    `,
    customSiteTitle: 'Finance ERP Documentation',
    customfavIcon: '/favicon.ico',
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      tryItOutEnabled: true,
    },
  }));

  // Add a JSON endpoint for the swagger definition
  app.get('/api-docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
};