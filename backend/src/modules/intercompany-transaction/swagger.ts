import { SwaggerDefinition } from 'swagger-jsdoc';

const defaultAreaIntercompanyTransactionSwagger: SwaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'DefaultArea IntercompanyTransaction API',
		version: '1.0.0',
		description: 'API documentation for managing intercompany-transactions in the default-area area.',
	},
	paths: {
		'/intercompany-transactions': {
			get: {
				summary: 'Get list of intercompany-transactions (DefaultArea)',
				description: 'Retrieve a paginated list of intercompany-transactions with default-area access',
				tags: ['IntercompanyTransactions'],
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
						description: 'Search term for filtering intercompany-transactions',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'sourceEntityId',
						description: 'Filter by sourceEntityId',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'targetEntityId',
						description: 'Filter by targetEntityId',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'transactionDate',
						description: 'Filter by transactionDate',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'transactionType',
						description: 'Filter by transactionType',
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
						name: 'amount',
						description: 'Filter by amount',
						schema: { type: 'number' }
					},
					{
						in: 'query',
						name: 'lineDetail',
						description: 'Filter by lineDetails',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'taxAmount',
						description: 'Filter by taxAmount',
						schema: { type: 'number' }
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
						description: 'List of intercompany-transactions retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/IntercompanyTransactionListResponse' }
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
				summary: 'Create a new intercompany-transaction (DefaultArea)',
				description: 'Add a new intercompany-transaction to the system',
				tags: ['IntercompanyTransactions'],
				security: [{ bearerAuth: [] }],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/CreateIntercompanyTransactionInput' }
						}
					}
				},
				responses: {
					201: {
						description: 'IntercompanyTransaction created successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/IntercompanyTransactionCreateResponse' }
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
		'/intercompany-transactions/select': {
			get: {
				summary: 'Get intercompany-transactions for selection dropdown (DefaultArea)',
				description: 'Retrieve a simplified list of intercompany-transactions for dropdown selection purposes',
				tags: ['IntercompanyTransactions'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'query',
						name: 'search',
						description: 'Search term for filtering intercompany-transactions',
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
						description: 'IntercompanyTransaction selection list retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/IntercompanyTransactionSelectResponse' }
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
		'/intercompany-transactions/{transactionId}': {
			get: {
				summary: 'Get intercompany-transaction for editing (DefaultArea)',
				description: 'Retrieve detailed information about a specific intercompany-transaction for editing',
				tags: ['IntercompanyTransactions'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'transactionId',
						required: true,
						description: 'ID of the intercompany-transaction to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'IntercompanyTransaction details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/IntercompanyTransactionEditResponse' }
							}
						}
					},
					404: {
						description: 'IntercompanyTransaction not found',
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
				summary: 'Update a intercompany-transaction (DefaultArea)',
				description: 'Modify an existing intercompany-transaction in the system',
				tags: ['IntercompanyTransactions'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'transactionId',
						required: true,
						description: 'ID of the intercompany-transaction to update',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/UpdateIntercompanyTransactionInput' }
						}
					}
				},
				responses: {
					200: {
						description: 'IntercompanyTransaction updated successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/IntercompanyTransactionUpdateResponse' }
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
						description: 'IntercompanyTransaction not found',
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
				summary: 'Delete a intercompany-transaction (DefaultArea)',
				description: 'Remove a intercompany-transaction from the system',
				tags: ['IntercompanyTransactions'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'transactionId',
						required: true,
						description: 'ID of the intercompany-transaction to delete',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					202: {
						description: 'IntercompanyTransaction deletion accepted',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/IntercompanyTransactionDeleteResponse' }
							}
						}
					},
					404: {
						description: 'IntercompanyTransaction not found',
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
		'/intercompany-transactions/detail/{transactionId}': {
			get: {
				summary: 'Get detailed intercompany-transaction information (DefaultArea)',
				description: 'Retrieve comprehensive details about a specific intercompany-transaction',
				tags: ['IntercompanyTransactions'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'transactionId',
						required: true,
						description: 'ID of the intercompany-transaction to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'IntercompanyTransaction details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/IntercompanyTransactionDetailResponse' }
							}
						}
					},
					404: {
						description: 'IntercompanyTransaction not found',
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

			IntercompanyTransactionListItem: {
				type: 'object',
				properties: {
					sourceEntityId: { type: 'string', description: 'sourceEntityId' },
					targetEntityId: { type: 'string', description: 'targetEntityId' },
					transactionDate: { type: 'string', format: 'date', description: 'transactionDate' },
					transactionType: { type: 'string', description: 'transactionType' },
					currencyCode: { type: 'string', description: 'currencyCode' },
					amount: { type: 'number', description: 'amount' },
					lineDetail: { type: 'string', description: 'lineDetails' },
					taxAmount: { type: 'number', description: 'taxAmount' },
					status: { type: 'string', description: 'status' },
					currentApproverId: { type: 'string', description: 'currentApproverId' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				},
				required: ['sourceEntityId', ' targetEntityId', ' transactionDate', ' transactionType', ' currencyCode', ' amount', ' taxAmount', ' status', ' createdAt', ' updatedAt']
			},

			IntercompanyTransactionListResponse: {
				type: 'object',
				properties: {
					data: {
						type: 'array',
						items: { $ref: '#/components/schemas/IntercompanyTransactionListItem' }
					},
					meta: {
						type: 'object',
						properties: {
							total: { type: 'integer', description: 'Total number of intercompany-transactions' },
							page: { type: 'integer', description: 'Current page number' },
							pageSize: { type: 'integer', description: 'Number of items per page' }
						}
					}
				},
				required: ['data', 'meta']
			},

			IntercompanyTransactionSelectItem: {
				type: 'object',
				properties: {
					value: { type: 'string', format: 'uuid', description: 'Unique intercompanyTransaction identifier'},
					label: { type: 'string', description: 'IntercompanyTransaction display label'}
				},
				required: ['value', ' label']
			},

			IntercompanyTransactionSelectResponse: {
				type: 'array',
				items: { $ref: '#/components/schemas/IntercompanyTransactionSelectItem' }
			},

			IntercompanyTransactionDetailResponse: {
				type: 'object',
				properties: {
					sourceEntityId: { type: 'string', description: 'sourceEntityId' },
					targetEntityId: { type: 'string', description: 'targetEntityId' },
					transactionDate: { type: 'string', format: 'date', description: 'transactionDate' },
					transactionType: { type: 'string', description: 'transactionType' },
					currencyCode: { type: 'string', description: 'currencyCode' },
					amount: { type: 'number', description: 'amount' },
					lineDetail: { type: 'string', nullable: true, description: 'lineDetails' },
					taxAmount: { type: 'number', description: 'taxAmount' },
					status: { type: 'string', description: 'status' },
					currentApproverId: { type: 'string', nullable: true, description: 'currentApproverId' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				}
			},

			CreateIntercompanyTransactionInput: {
				type: 'object',
				properties: {
					sourceEntityId: { type: 'string', description: 'sourceEntityId' },
					targetEntityId: { type: 'string', description: 'targetEntityId' },
					transactionDate: { type: 'string', format: 'date', description: 'transactionDate', example: '2024-01-01' },
					transactionType: { type: 'string', description: 'transactionType', example: 'transactionType Option' },
					currencyCode: { type: 'string', description: 'currencyCode', example: 'Example currencyCode' },
					amount: { type: 'number', description: 'amount', example: 123.45 },
					lineDetail: { type: 'string', description: 'lineDetails' },
					taxAmount: { type: 'number', description: 'taxAmount', example: 123.45 },
					status: { type: 'string', description: 'status', example: 'status Option' },
					currentApproverId: { type: 'string', description: 'currentApproverId' }
				},
				required: ['sourceEntityId', 'targetEntityId', 'transactionDate', 'transactionType', 'currencyCode', 'amount', 'taxAmount', 'status']
			},

			IntercompanyTransactionCreateResponse: {
				type: 'object',
				properties: {
					transactionId: { type: 'string', format: 'uuid' }
				}
			},

			IntercompanyTransactionEditResponse: {
				type: 'object',
				properties: {
					sourceEntityId: { type: 'string', description: 'sourceEntityId' },
					targetEntityId: { type: 'string', description: 'targetEntityId' },
					transactionDate: { type: 'string', format: 'date', description: 'transactionDate' },
					transactionType: { type: 'string', description: 'transactionType' },
					currencyCode: { type: 'string', description: 'currencyCode' },
					amount: { type: 'number', description: 'amount' },
					lineDetail: { type: 'string', nullable: true, description: 'lineDetails' },
					taxAmount: { type: 'number', description: 'taxAmount' },
					status: { type: 'string', description: 'status' },
					currentApproverId: { type: 'string', nullable: true, description: 'currentApproverId' }
				}
			},

			UpdateIntercompanyTransactionInput: {
				type: 'object',
				properties: {
					sourceEntityId: { type: 'string', description: 'sourceEntityId' },
					targetEntityId: { type: 'string', description: 'targetEntityId' },
					transactionDate: { type: 'string', format: 'date', description: 'transactionDate' },
					transactionType: { type: 'string', description: 'transactionType' },
					currencyCode: { type: 'string', description: 'currencyCode' },
					amount: { type: 'number', description: 'amount' },
					lineDetail: { type: 'string', description: 'lineDetails' },
					taxAmount: { type: 'number', description: 'taxAmount' },
					status: { type: 'string', description: 'status' },
					currentApproverId: { type: 'string', description: 'currentApproverId' }
				},
				required: ['sourceEntityId', 'targetEntityId', 'transactionDate', 'transactionType', 'currencyCode', 'amount', 'taxAmount', 'status']
			},

			IntercompanyTransactionUpdateResponse: {
				type: 'object',
				properties: {
					message: { type: 'string', example: 'IntercompanyTransaction updated successfully' },
					data: {
						type: 'object',
						properties: {
							sourceEntityId: { type: 'string', description: 'sourceEntityId' },
							targetEntityId: { type: 'string', description: 'targetEntityId' },
							transactionDate: { type: 'string', format: 'date', description: 'transactionDate' },
							transactionType: { type: 'string', description: 'transactionType' },
							currencyCode: { type: 'string', description: 'currencyCode' },
							amount: { type: 'number', description: 'amount' },
							lineDetail: { type: 'string', nullable: true, description: 'lineDetails' },
							taxAmount: { type: 'number', description: 'taxAmount' },
							status: { type: 'string', description: 'status' },
							currentApproverId: { type: 'string', nullable: true, description: 'currentApproverId' }
						}
					}
				}
			},

			IntercompanyTransactionDeleteResponse: {
				type: 'object',
				properties: {
					messageCode: { type: 'string' },
					message: { type: 'string', example: 'IntercompanyTransaction deleted successfully' }
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

export default defaultAreaIntercompanyTransactionSwagger;
