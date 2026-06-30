import { SwaggerDefinition } from 'swagger-jsdoc';

const defaultAreaInvoiceSwagger: SwaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'DefaultArea Invoice API',
		version: '1.0.0',
		description: 'API documentation for managing invoices in the default-area area.',
	},
	paths: {
		'/invoices': {
			get: {
				summary: 'Get list of invoices (DefaultArea)',
				description: 'Retrieve a paginated list of invoices with default-area access',
				tags: ['Invoices'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'query',
						name: 'page',
						description: 'Page number for pagination',
						schema: { type: 'integer', minimum: 1, default: 1 }
					},
					{
						in: 'query',
						name: 'pageSize',
						description: 'Number of items per page',
						schema: { type: 'integer', minimum: 1, maximum: 100, default: 10 }
					},
					{
						in: 'query',
						name: 'search',
						description: 'Search term for filtering invoices',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'vendorId',
						description: 'Filter by vendorId',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'customerId',
						description: 'Filter by customerId',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'invoiceNumber',
						description: 'Filter by invoiceNumber',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'invoiceDate',
						description: 'Filter by invoiceDate',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'dueDate',
						description: 'Filter by dueDate',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'currencyCode',
						description: 'Filter by currencyCode',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'subtotal',
						description: 'Filter by subtotal',
						schema: { type: 'number' }
					},
					{
						in: 'query',
						name: 'taxAmount',
						description: 'Filter by taxAmount',
						schema: { type: 'number' }
					},
					{
						in: 'query',
						name: 'totalAmount',
						description: 'Filter by totalAmount',
						schema: { type: 'number' }
					},
					{
						in: 'query',
						name: 'paidAmount',
						description: 'Filter by paidAmount',
						schema: { type: 'number' }
					},
					{
						in: 'query',
						name: 'balanceDue',
						description: 'Filter by balanceDue',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'paymentStatus',
						description: 'Filter by paymentStatus',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'status',
						description: 'Filter by status',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'currentApproverId',
						description: 'Filter by currentApproverId',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'invoiceDocumentId',
						description: 'Filter by invoiceDocumentId',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'entityId',
						description: 'Filter by entityId',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'createdAt',
						description: 'Filter by createdAt',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'updatedAt',
						description: 'Filter by updatedAt',
						schema: { type: 'string' }
					},
				],
				responses: {
					200: {
						description: 'List of invoices retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/InvoiceListResponse' }
							}
						}
					},
					401: {
						description: 'Unauthorized - Invalid or missing token',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ErrorResponse' }
							}
						}
					},
					403: {
						description: 'Forbidden - Insufficient permissions',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ErrorResponse' }
							}
						}
					},
					500: {
						description: 'Internal server error',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ErrorResponse' }
							}
						}
					}				}
			},
			post: {
				summary: 'Create a new invoice (DefaultArea)',
				description: 'Add a new invoice to the system',
				tags: ['Invoices'],
				security: [{ bearerAuth: [] }],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/CreateInvoiceInput' }
						}
					}
				},
				responses: {
					201: {
						description: 'Invoice created successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/InvoiceCreateResponse' }
							}
						}
					},
					400: {
						description: 'Bad request - Invalid input data',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ValidationErrorResponse' }
							}
						}
					},
					401: {
						description: 'Unauthorized - Invalid or missing token',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ErrorResponse' }
							}
						}
					},
					403: {
						description: 'Forbidden - Insufficient permissions',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ErrorResponse' }
							}
						}
					},
					500: {
						description: 'Internal server error',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ErrorResponse' }
							}
						}
					}				}
			},
		},
		'/invoices/select': {
			get: {
				summary: 'Get invoices for selection dropdown (DefaultArea)',
				description: 'Retrieve a simplified list of invoices for dropdown selection purposes',
				tags: ['Invoices'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'query',
						name: 'search',
						description: 'Search term for filtering invoices',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'limit',
						description: 'Number of items to return',
						schema: { type: 'integer', minimum: 1, maximum: 50, default: 10 }
					}
				],
				responses: {
					200: {
						description: 'Invoice selection list retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/InvoiceSelectResponse' }
							}
						}
					},
					401: {
						description: 'Unauthorized - Invalid or missing token',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ErrorResponse' }
							}
						}
					},
					403: {
						description: 'Forbidden - Insufficient permissions',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ErrorResponse' }
							}
						}
					},
					500: {
						description: 'Internal server error',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ErrorResponse' }
							}
						}
					}				}
			},
		},
		'/invoices/{invoiceId}': {
			get: {
				summary: 'Get invoice for editing (DefaultArea)',
				description: 'Retrieve detailed information about a specific invoice for editing',
				tags: ['Invoices'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'invoiceId',
						required: true,
						description: 'ID of the invoice to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'Invoice details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/InvoiceEditResponse' }
							}
						}
					},
					404: {
						description: 'Invoice not found',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ErrorResponse' }
							}
						}
					},
					401: {
						description: 'Unauthorized - Invalid or missing token',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ErrorResponse' }
							}
						}
					},
					403: {
						description: 'Forbidden - Insufficient permissions',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ErrorResponse' }
							}
						}
					},
					500: {
						description: 'Internal server error',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ErrorResponse' }
							}
						}
					}				}
			},
			put: {
				summary: 'Update a invoice (DefaultArea)',
				description: 'Modify an existing invoice in the system',
				tags: ['Invoices'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'invoiceId',
						required: true,
						description: 'ID of the invoice to update',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/UpdateInvoiceInput' }
						}
					}
				},
				responses: {
					200: {
						description: 'Invoice updated successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/InvoiceUpdateResponse' }
							}
						}
					},
					400: {
						description: 'Bad request - Invalid input data',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ValidationErrorResponse' }
							}
						}
					},
					404: {
						description: 'Invoice not found',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ErrorResponse' }
							}
						}
					},
					401: {
						description: 'Unauthorized - Invalid or missing token',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ErrorResponse' }
							}
						}
					},
					403: {
						description: 'Forbidden - Insufficient permissions',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ErrorResponse' }
							}
						}
					},
					500: {
						description: 'Internal server error',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ErrorResponse' }
							}
						}
					}				}
			},
			delete: {
				summary: 'Delete a invoice (DefaultArea)',
				description: 'Remove a invoice from the system',
				tags: ['Invoices'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'invoiceId',
						required: true,
						description: 'ID of the invoice to delete',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					202: {
						description: 'Invoice deletion accepted',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/InvoiceDeleteResponse' }
							}
						}
					},
					404: {
						description: 'Invoice not found',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ErrorResponse' }
							}
						}
					},
					401: {
						description: 'Unauthorized - Invalid or missing token',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ErrorResponse' }
							}
						}
					},
					403: {
						description: 'Forbidden - Insufficient permissions',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ErrorResponse' }
							}
						}
					},
					500: {
						description: 'Internal server error',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ErrorResponse' }
							}
						}
					}				}
			},
		},
		'/invoices/detail/{invoiceId}': {
			get: {
				summary: 'Get detailed invoice information (DefaultArea)',
				description: 'Retrieve comprehensive details about a specific invoice',
				tags: ['Invoices'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'invoiceId',
						required: true,
						description: 'ID of the invoice to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'Invoice details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/InvoiceDetailResponse' }
							}
						}
					},
					404: {
						description: 'Invoice not found',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ErrorResponse' }
							}
						}
					},
					401: {
						description: 'Unauthorized - Invalid or missing token',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ErrorResponse' }
							}
						}
					},
					403: {
						description: 'Forbidden - Insufficient permissions',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ErrorResponse' }
							}
						}
					},
					500: {
						description: 'Internal server error',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ErrorResponse' }
							}
						}
					}				}
			},
		},
	},
	components: {
		schemas: {
			ItemMeta: {
				type: 'object',
				properties: {
					label: { type: 'string' },
					primaryKeys: { type: 'object', additionalProperties: true },
				},
			},

			InvoiceListItem: {
				type: 'object',
				properties: {
					vendorId: { type: 'string', description: 'vendorId' },
					customerId: { type: 'string', description: 'customerId' },
					invoiceNumber: { type: 'string', description: 'invoiceNumber' },
					invoiceDate: { type: 'string', format: 'date', description: 'invoiceDate' },
					dueDate: { type: 'string', format: 'date', description: 'dueDate' },
					currencyCode: { type: 'string', description: 'currencyCode' },
					subtotal: { type: 'number', description: 'subtotal' },
					taxAmount: { type: 'number', description: 'taxAmount' },
					totalAmount: { type: 'number', description: 'totalAmount' },
					paidAmount: { type: 'number', description: 'paidAmount' },
					balanceDue: { type: 'string', description: 'balanceDue' },
					paymentStatus: { type: 'string', description: 'paymentStatus' },
					status: { type: 'string', description: 'status' },
					currentApproverId: { type: 'string', description: 'currentApproverId' },
					invoiceDocumentId: { type: 'string', description: 'invoiceDocumentId' },
					entityId: { type: 'string', description: 'entityId' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				},
				required: ['invoiceNumber', ' invoiceDate', ' dueDate', ' currencyCode', ' subtotal', ' taxAmount', ' totalAmount', ' paidAmount', ' balanceDue', ' paymentStatus', ' status', ' entityId', ' createdAt', ' updatedAt']
			},

			InvoiceListResponse: {
				type: 'object',
				properties: {
					data: {
						type: 'array',
						items: { $ref: '#/components/schemas/InvoiceListItem' }
					},
					meta: {
						type: 'object',
						properties: {
							total: { type: 'integer', description: 'Total number of invoices' },
							page: { type: 'integer', description: 'Current page number' },
							pageSize: { type: 'integer', description: 'Number of items per page' }
						}
					}
				},
				required: ['data', 'meta']
			},

			InvoiceSelectItem: {
				type: 'object',
				properties: {
					value: { type: 'string', format: 'uuid', description: 'Unique invoice identifier'},
					label: { type: 'string', description: 'Invoice display label'}
				},
				required: ['value', ' label']
			},

			InvoiceSelectResponse: {
				type: 'array',
				items: { $ref: '#/components/schemas/InvoiceSelectItem' }
			},

			InvoiceDetailResponse: {
				type: 'object',
				properties: {
					vendorId: { type: 'string', nullable: true, description: 'vendorId' },
					customerId: { type: 'string', nullable: true, description: 'customerId' },
					invoiceNumber: { type: 'string', description: 'invoiceNumber' },
					invoiceDate: { type: 'string', format: 'date', description: 'invoiceDate' },
					dueDate: { type: 'string', format: 'date', description: 'dueDate' },
					currencyCode: { type: 'string', description: 'currencyCode' },
					subtotal: { type: 'number', description: 'subtotal' },
					taxAmount: { type: 'number', description: 'taxAmount' },
					totalAmount: { type: 'number', description: 'totalAmount' },
					paidAmount: { type: 'number', description: 'paidAmount' },
					balanceDue: { type: 'string', description: 'balanceDue' },
					paymentStatus: { type: 'string', description: 'paymentStatus' },
					status: { type: 'string', description: 'status' },
					currentApproverId: { type: 'string', nullable: true, description: 'currentApproverId' },
					invoiceDocumentId: { type: 'string', nullable: true, description: 'invoiceDocumentId' },
					entityId: { type: 'string', description: 'entityId' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				}
			},

			CreateInvoiceInput: {
				type: 'object',
				properties: {
					vendorId: { type: 'string', description: 'vendorId' },
					customerId: { type: 'string', description: 'customerId' },
					invoiceNumber: { type: 'string', description: 'invoiceNumber', example: 'Example invoiceNumber' },
					invoiceDate: { type: 'string', format: 'date', description: 'invoiceDate', example: '2024-01-01' },
					dueDate: { type: 'string', format: 'date', description: 'dueDate', example: '2024-01-01' },
					currencyCode: { type: 'string', description: 'currencyCode', example: 'Example currencyCode' },
					subtotal: { type: 'number', description: 'subtotal', example: 123.45 },
					taxAmount: { type: 'number', description: 'taxAmount', example: 123.45 },
					totalAmount: { type: 'number', description: 'totalAmount', example: 123.45 },
					paidAmount: { type: 'number', description: 'paidAmount', example: 123.45 },
					balanceDue: { type: 'string', description: 'balanceDue', example: 'Example balanceDue' },
					paymentStatus: { type: 'string', description: 'paymentStatus', example: 'paymentStatus Option' },
					status: { type: 'string', description: 'status', example: 'status Option' },
					currentApproverId: { type: 'string', description: 'currentApproverId' },
					invoiceDocumentId: { type: 'string', description: 'invoiceDocumentId' },
					entityId: { type: 'string', description: 'entityId' }
				},
				required: ['invoiceNumber', 'invoiceDate', 'dueDate', 'currencyCode', 'subtotal', 'taxAmount', 'totalAmount', 'paidAmount', 'balanceDue', 'paymentStatus', 'status', 'entityId']
			},

			InvoiceCreateResponse: {
				type: 'object',
				properties: {
					invoiceId: { type: 'string', format: 'uuid' }
				}
			},

			InvoiceEditResponse: {
				type: 'object',
				properties: {
					vendorId: { type: 'string', nullable: true, description: 'vendorId' },
					customerId: { type: 'string', nullable: true, description: 'customerId' },
					invoiceNumber: { type: 'string', description: 'invoiceNumber' },
					invoiceDate: { type: 'string', format: 'date', description: 'invoiceDate' },
					dueDate: { type: 'string', format: 'date', description: 'dueDate' },
					currencyCode: { type: 'string', description: 'currencyCode' },
					subtotal: { type: 'number', description: 'subtotal' },
					taxAmount: { type: 'number', description: 'taxAmount' },
					totalAmount: { type: 'number', description: 'totalAmount' },
					paidAmount: { type: 'number', description: 'paidAmount' },
					balanceDue: { type: 'string', description: 'balanceDue' },
					paymentStatus: { type: 'string', description: 'paymentStatus' },
					status: { type: 'string', description: 'status' },
					currentApproverId: { type: 'string', nullable: true, description: 'currentApproverId' },
					invoiceDocumentId: { type: 'string', nullable: true, description: 'invoiceDocumentId' },
					entityId: { type: 'string', description: 'entityId' }
				}
			},

			UpdateInvoiceInput: {
				type: 'object',
				properties: {
					vendorId: { type: 'string', description: 'vendorId' },
					customerId: { type: 'string', description: 'customerId' },
					invoiceNumber: { type: 'string', description: 'invoiceNumber' },
					invoiceDate: { type: 'string', format: 'date', description: 'invoiceDate' },
					dueDate: { type: 'string', format: 'date', description: 'dueDate' },
					currencyCode: { type: 'string', description: 'currencyCode' },
					subtotal: { type: 'number', description: 'subtotal' },
					taxAmount: { type: 'number', description: 'taxAmount' },
					totalAmount: { type: 'number', description: 'totalAmount' },
					paidAmount: { type: 'number', description: 'paidAmount' },
					balanceDue: { type: 'string', description: 'balanceDue' },
					paymentStatus: { type: 'string', description: 'paymentStatus' },
					status: { type: 'string', description: 'status' },
					currentApproverId: { type: 'string', description: 'currentApproverId' },
					invoiceDocumentId: { type: 'string', description: 'invoiceDocumentId' },
					entityId: { type: 'string', description: 'entityId' }
				},
				required: ['invoiceNumber', 'invoiceDate', 'dueDate', 'currencyCode', 'subtotal', 'taxAmount', 'totalAmount', 'paidAmount', 'balanceDue', 'paymentStatus', 'status', 'entityId']
			},

			InvoiceUpdateResponse: {
				type: 'object',
				properties: {
					message: { type: 'string', example: 'Invoice updated successfully' },
					data: {
						type: 'object',
						properties: {
							vendorId: { type: 'string', nullable: true, description: 'vendorId' },
							customerId: { type: 'string', nullable: true, description: 'customerId' },
							invoiceNumber: { type: 'string', description: 'invoiceNumber' },
							invoiceDate: { type: 'string', format: 'date', description: 'invoiceDate' },
							dueDate: { type: 'string', format: 'date', description: 'dueDate' },
							currencyCode: { type: 'string', description: 'currencyCode' },
							subtotal: { type: 'number', description: 'subtotal' },
							taxAmount: { type: 'number', description: 'taxAmount' },
							totalAmount: { type: 'number', description: 'totalAmount' },
							paidAmount: { type: 'number', description: 'paidAmount' },
							balanceDue: { type: 'string', description: 'balanceDue' },
							paymentStatus: { type: 'string', description: 'paymentStatus' },
							status: { type: 'string', description: 'status' },
							currentApproverId: { type: 'string', nullable: true, description: 'currentApproverId' },
							invoiceDocumentId: { type: 'string', nullable: true, description: 'invoiceDocumentId' },
							entityId: { type: 'string', description: 'entityId' }
						}
					}
				}
			},

			InvoiceDeleteResponse: {
				type: 'object',
				properties: {
					messageCode: { type: 'string' },
					message: { type: 'string', example: 'Invoice deleted successfully' }
				}
			},

			ErrorResponse: {
				type: 'object',
				properties: {
					message: { type: 'string', description: 'Error message' },
					timestamp: { type: 'string', format: 'date-time', description: 'Error timestamp' }
				},
				required: ['message']
			},

		},
	},
};

export default defaultAreaInvoiceSwagger;
