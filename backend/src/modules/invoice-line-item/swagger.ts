import { SwaggerDefinition } from 'swagger-jsdoc';

const defaultAreaInvoiceLineItemSwagger: SwaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'DefaultArea InvoiceLineItem API',
		version: '1.0.0',
		description: 'API documentation for managing invoice-line-items in the default-area area.',
	},
	paths: {
		'/invoice-line-items': {
			get: {
				summary: 'Get list of invoice-line-items (DefaultArea)',
				description: 'Retrieve a paginated list of invoice-line-items with default-area access',
				tags: ['InvoiceLineItems'],
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
						description: 'Search term for filtering invoice-line-items',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'invoiceId',
						description: 'Filter by invoiceId',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'description',
						description: 'Filter by description',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'quantity',
						description: 'Filter by quantity',
						schema: { type: 'number' }
					},
					{
						in: 'query',
						name: 'unitPrice',
						description: 'Filter by unitPrice',
						schema: { type: 'number' }
					},
					{
						in: 'query',
						name: 'lineTotal',
						description: 'Filter by lineTotal',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'taxCodeId',
						description: 'Filter by taxCodeId',
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
						description: 'List of invoice-line-items retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/InvoiceLineItemListResponse' }
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
				summary: 'Create a new invoice-line-item (DefaultArea)',
				description: 'Add a new invoice-line-item to the system',
				tags: ['InvoiceLineItems'],
				security: [{ bearerAuth: [] }],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/CreateInvoiceLineItemInput' }
						}
					}
				},
				responses: {
					201: {
						description: 'InvoiceLineItem created successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/InvoiceLineItemCreateResponse' }
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
		'/invoice-line-items/select': {
			get: {
				summary: 'Get invoice-line-items for selection dropdown (DefaultArea)',
				description: 'Retrieve a simplified list of invoice-line-items for dropdown selection purposes',
				tags: ['InvoiceLineItems'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'query',
						name: 'search',
						description: 'Search term for filtering invoice-line-items',
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
						description: 'InvoiceLineItem selection list retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/InvoiceLineItemSelectResponse' }
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
		'/invoice-line-items/{lineItemId}': {
			get: {
				summary: 'Get invoice-line-item for editing (DefaultArea)',
				description: 'Retrieve detailed information about a specific invoice-line-item for editing',
				tags: ['InvoiceLineItems'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'lineItemId',
						required: true,
						description: 'ID of the invoice-line-item to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'InvoiceLineItem details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/InvoiceLineItemEditResponse' }
							}
						}
					},
					404: {
						description: 'InvoiceLineItem not found',
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
				summary: 'Update a invoice-line-item (DefaultArea)',
				description: 'Modify an existing invoice-line-item in the system',
				tags: ['InvoiceLineItems'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'lineItemId',
						required: true,
						description: 'ID of the invoice-line-item to update',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/UpdateInvoiceLineItemInput' }
						}
					}
				},
				responses: {
					200: {
						description: 'InvoiceLineItem updated successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/InvoiceLineItemUpdateResponse' }
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
						description: 'InvoiceLineItem not found',
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
				summary: 'Delete a invoice-line-item (DefaultArea)',
				description: 'Remove a invoice-line-item from the system',
				tags: ['InvoiceLineItems'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'lineItemId',
						required: true,
						description: 'ID of the invoice-line-item to delete',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					202: {
						description: 'InvoiceLineItem deletion accepted',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/InvoiceLineItemDeleteResponse' }
							}
						}
					},
					404: {
						description: 'InvoiceLineItem not found',
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
		'/invoice-line-items/detail/{lineItemId}': {
			get: {
				summary: 'Get detailed invoice-line-item information (DefaultArea)',
				description: 'Retrieve comprehensive details about a specific invoice-line-item',
				tags: ['InvoiceLineItems'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'lineItemId',
						required: true,
						description: 'ID of the invoice-line-item to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'InvoiceLineItem details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/InvoiceLineItemDetailResponse' }
							}
						}
					},
					404: {
						description: 'InvoiceLineItem not found',
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

			InvoiceLineItemListItem: {
				type: 'object',
				properties: {
					invoiceId: { type: 'string', description: 'invoiceId' },
					description: { type: 'string', description: 'description' },
					quantity: { type: 'number', description: 'quantity' },
					unitPrice: { type: 'number', description: 'unitPrice' },
					lineTotal: { type: 'string', description: 'lineTotal' },
					taxCodeId: { type: 'string', description: 'taxCodeId' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				},
				required: ['invoiceId', ' description', ' quantity', ' unitPrice', ' lineTotal', ' createdAt', ' updatedAt']
			},

			InvoiceLineItemListResponse: {
				type: 'object',
				properties: {
					data: {
						type: 'array',
						items: { $ref: '#/components/schemas/InvoiceLineItemListItem' }
					},
					meta: {
						type: 'object',
						properties: {
							total: { type: 'integer', description: 'Total number of invoice-line-items' },
							page: { type: 'integer', description: 'Current page number' },
							pageSize: { type: 'integer', description: 'Number of items per page' }
						}
					}
				},
				required: ['data', 'meta']
			},

			InvoiceLineItemSelectItem: {
				type: 'object',
				properties: {
					value: { type: 'string', format: 'uuid', description: 'Unique invoiceLineItem identifier'},
					label: { type: 'string', description: 'InvoiceLineItem display label'}
				},
				required: ['value', ' label']
			},

			InvoiceLineItemSelectResponse: {
				type: 'array',
				items: { $ref: '#/components/schemas/InvoiceLineItemSelectItem' }
			},

			InvoiceLineItemDetailResponse: {
				type: 'object',
				properties: {
					invoiceId: { type: 'string', description: 'invoiceId' },
					description: { type: 'string', description: 'description' },
					quantity: { type: 'number', description: 'quantity' },
					unitPrice: { type: 'number', description: 'unitPrice' },
					lineTotal: { type: 'string', description: 'lineTotal' },
					taxCodeId: { type: 'string', nullable: true, description: 'taxCodeId' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				}
			},

			CreateInvoiceLineItemInput: {
				type: 'object',
				properties: {
					invoiceId: { type: 'string', description: 'invoiceId' },
					description: { type: 'string', description: 'description', example: 'Example description' },
					quantity: { type: 'number', description: 'quantity', example: 123.45 },
					unitPrice: { type: 'number', description: 'unitPrice', example: 123.45 },
					lineTotal: { type: 'string', description: 'lineTotal', example: 'Example lineTotal' },
					taxCodeId: { type: 'string', description: 'taxCodeId' }
				},
				required: ['invoiceId', 'description', 'quantity', 'unitPrice', 'lineTotal']
			},

			InvoiceLineItemCreateResponse: {
				type: 'object',
				properties: {
					lineItemId: { type: 'string', format: 'uuid' }
				}
			},

			InvoiceLineItemEditResponse: {
				type: 'object',
				properties: {
					invoiceId: { type: 'string', description: 'invoiceId' },
					description: { type: 'string', description: 'description' },
					quantity: { type: 'number', description: 'quantity' },
					unitPrice: { type: 'number', description: 'unitPrice' },
					lineTotal: { type: 'string', description: 'lineTotal' },
					taxCodeId: { type: 'string', nullable: true, description: 'taxCodeId' }
				}
			},

			UpdateInvoiceLineItemInput: {
				type: 'object',
				properties: {
					invoiceId: { type: 'string', description: 'invoiceId' },
					description: { type: 'string', description: 'description' },
					quantity: { type: 'number', description: 'quantity' },
					unitPrice: { type: 'number', description: 'unitPrice' },
					lineTotal: { type: 'string', description: 'lineTotal' },
					taxCodeId: { type: 'string', description: 'taxCodeId' }
				},
				required: ['invoiceId', 'description', 'quantity', 'unitPrice', 'lineTotal']
			},

			InvoiceLineItemUpdateResponse: {
				type: 'object',
				properties: {
					message: { type: 'string', example: 'InvoiceLineItem updated successfully' },
					data: {
						type: 'object',
						properties: {
							invoiceId: { type: 'string', description: 'invoiceId' },
							description: { type: 'string', description: 'description' },
							quantity: { type: 'number', description: 'quantity' },
							unitPrice: { type: 'number', description: 'unitPrice' },
							lineTotal: { type: 'string', description: 'lineTotal' },
							taxCodeId: { type: 'string', nullable: true, description: 'taxCodeId' }
						}
					}
				}
			},

			InvoiceLineItemDeleteResponse: {
				type: 'object',
				properties: {
					messageCode: { type: 'string' },
					message: { type: 'string', example: 'InvoiceLineItem deleted successfully' }
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

export default defaultAreaInvoiceLineItemSwagger;
