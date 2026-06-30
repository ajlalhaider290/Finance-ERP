import { SwaggerDefinition } from 'swagger-jsdoc';

const defaultAreaIntercompanySettlementRecordSwagger: SwaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'DefaultArea IntercompanySettlementRecord API',
		version: '1.0.0',
		description: 'API documentation for managing intercompany-settlement-records in the default-area area.',
	},
	paths: {
		'/intercompany-settlement-records': {
			get: {
				summary: 'Get list of intercompany-settlement-records (DefaultArea)',
				description: 'Retrieve a paginated list of intercompany-settlement-records with default-area access',
				tags: ['IntercompanySettlementRecords'],
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
						description: 'Search term for filtering intercompany-settlement-records',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'transactionId',
						description: 'Filter by transactionId',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'settlementDate',
						description: 'Filter by settlementDate',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'settlementAmount',
						description: 'Filter by settlementAmount',
						schema: { type: 'number' }
					},
					{
						in: 'query',
						name: 'currencyCode',
						description: 'Filter by currencyCode',
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
						name: 'recordedBy',
						description: 'Filter by recordedById',
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
						description: 'List of intercompany-settlement-records retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/IntercompanySettlementRecordListResponse' }
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
				summary: 'Create a new intercompany-settlement-record (DefaultArea)',
				description: 'Add a new intercompany-settlement-record to the system',
				tags: ['IntercompanySettlementRecords'],
				security: [{ bearerAuth: [] }],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/CreateIntercompanySettlementRecordInput' }
						}
					}
				},
				responses: {
					201: {
						description: 'IntercompanySettlementRecord created successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/IntercompanySettlementRecordCreateResponse' }
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
		'/intercompany-settlement-records/select': {
			get: {
				summary: 'Get intercompany-settlement-records for selection dropdown (DefaultArea)',
				description: 'Retrieve a simplified list of intercompany-settlement-records for dropdown selection purposes',
				tags: ['IntercompanySettlementRecords'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'query',
						name: 'search',
						description: 'Search term for filtering intercompany-settlement-records',
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
						description: 'IntercompanySettlementRecord selection list retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/IntercompanySettlementRecordSelectResponse' }
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
		'/intercompany-settlement-records/{settlementRecordId}': {
			get: {
				summary: 'Get intercompany-settlement-record for editing (DefaultArea)',
				description: 'Retrieve detailed information about a specific intercompany-settlement-record for editing',
				tags: ['IntercompanySettlementRecords'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'settlementRecordId',
						required: true,
						description: 'ID of the intercompany-settlement-record to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'IntercompanySettlementRecord details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/IntercompanySettlementRecordEditResponse' }
							}
						}
					},
					404: {
						description: 'IntercompanySettlementRecord not found',
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
				summary: 'Update a intercompany-settlement-record (DefaultArea)',
				description: 'Modify an existing intercompany-settlement-record in the system',
				tags: ['IntercompanySettlementRecords'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'settlementRecordId',
						required: true,
						description: 'ID of the intercompany-settlement-record to update',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/UpdateIntercompanySettlementRecordInput' }
						}
					}
				},
				responses: {
					200: {
						description: 'IntercompanySettlementRecord updated successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/IntercompanySettlementRecordUpdateResponse' }
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
						description: 'IntercompanySettlementRecord not found',
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
				summary: 'Delete a intercompany-settlement-record (DefaultArea)',
				description: 'Remove a intercompany-settlement-record from the system',
				tags: ['IntercompanySettlementRecords'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'settlementRecordId',
						required: true,
						description: 'ID of the intercompany-settlement-record to delete',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					202: {
						description: 'IntercompanySettlementRecord deletion accepted',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/IntercompanySettlementRecordDeleteResponse' }
							}
						}
					},
					404: {
						description: 'IntercompanySettlementRecord not found',
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
		'/intercompany-settlement-records/detail/{settlementRecordId}': {
			get: {
				summary: 'Get detailed intercompany-settlement-record information (DefaultArea)',
				description: 'Retrieve comprehensive details about a specific intercompany-settlement-record',
				tags: ['IntercompanySettlementRecords'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'settlementRecordId',
						required: true,
						description: 'ID of the intercompany-settlement-record to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'IntercompanySettlementRecord details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/IntercompanySettlementRecordDetailResponse' }
							}
						}
					},
					404: {
						description: 'IntercompanySettlementRecord not found',
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

			IntercompanySettlementRecordListItem: {
				type: 'object',
				properties: {
					transactionId: { type: 'string', description: 'transactionId' },
					settlementDate: { type: 'string', format: 'date', description: 'settlementDate' },
					settlementAmount: { type: 'number', description: 'settlementAmount' },
					currencyCode: { type: 'string', description: 'currencyCode' },
					status: { type: 'string', description: 'status' },
					recordedBy: { type: 'string', description: 'recordedById' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				},
				required: ['transactionId', ' settlementDate', ' settlementAmount', ' currencyCode', ' status', ' recordedBy', ' createdAt', ' updatedAt']
			},

			IntercompanySettlementRecordListResponse: {
				type: 'object',
				properties: {
					data: {
						type: 'array',
						items: { $ref: '#/components/schemas/IntercompanySettlementRecordListItem' }
					},
					meta: {
						type: 'object',
						properties: {
							total: { type: 'integer', description: 'Total number of intercompany-settlement-records' },
							page: { type: 'integer', description: 'Current page number' },
							pageSize: { type: 'integer', description: 'Number of items per page' }
						}
					}
				},
				required: ['data', 'meta']
			},

			IntercompanySettlementRecordSelectItem: {
				type: 'object',
				properties: {
					value: { type: 'string', format: 'uuid', description: 'Unique intercompanySettlementRecord identifier'},
					label: { type: 'string', description: 'IntercompanySettlementRecord display label'}
				},
				required: ['value', ' label']
			},

			IntercompanySettlementRecordSelectResponse: {
				type: 'array',
				items: { $ref: '#/components/schemas/IntercompanySettlementRecordSelectItem' }
			},

			IntercompanySettlementRecordDetailResponse: {
				type: 'object',
				properties: {
					transactionId: { type: 'string', description: 'transactionId' },
					settlementDate: { type: 'string', format: 'date', description: 'settlementDate' },
					settlementAmount: { type: 'number', description: 'settlementAmount' },
					currencyCode: { type: 'string', description: 'currencyCode' },
					status: { type: 'string', description: 'status' },
					recordedBy: { type: 'string', description: 'recordedById' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				}
			},

			CreateIntercompanySettlementRecordInput: {
				type: 'object',
				properties: {
					transactionId: { type: 'string', description: 'transactionId' },
					settlementDate: { type: 'string', format: 'date', description: 'settlementDate', example: '2024-01-01' },
					settlementAmount: { type: 'number', description: 'settlementAmount', example: 123.45 },
					currencyCode: { type: 'string', description: 'currencyCode', example: 'Example currencyCode' },
					status: { type: 'string', description: 'status', example: 'status Option' },
					recordedBy: { type: 'string', description: 'recordedById' }
				},
				required: ['transactionId', 'settlementDate', 'settlementAmount', 'currencyCode', 'status', 'recordedBy']
			},

			IntercompanySettlementRecordCreateResponse: {
				type: 'object',
				properties: {
					settlementRecordId: { type: 'string', format: 'uuid' }
				}
			},

			IntercompanySettlementRecordEditResponse: {
				type: 'object',
				properties: {
					transactionId: { type: 'string', description: 'transactionId' },
					settlementDate: { type: 'string', format: 'date', description: 'settlementDate' },
					settlementAmount: { type: 'number', description: 'settlementAmount' },
					currencyCode: { type: 'string', description: 'currencyCode' },
					status: { type: 'string', description: 'status' },
					recordedBy: { type: 'string', description: 'recordedById' }
				}
			},

			UpdateIntercompanySettlementRecordInput: {
				type: 'object',
				properties: {
					transactionId: { type: 'string', description: 'transactionId' },
					settlementDate: { type: 'string', format: 'date', description: 'settlementDate' },
					settlementAmount: { type: 'number', description: 'settlementAmount' },
					currencyCode: { type: 'string', description: 'currencyCode' },
					status: { type: 'string', description: 'status' },
					recordedBy: { type: 'string', description: 'recordedById' }
				},
				required: ['transactionId', 'settlementDate', 'settlementAmount', 'currencyCode', 'status', 'recordedBy']
			},

			IntercompanySettlementRecordUpdateResponse: {
				type: 'object',
				properties: {
					message: { type: 'string', example: 'IntercompanySettlementRecord updated successfully' },
					data: {
						type: 'object',
						properties: {
							transactionId: { type: 'string', description: 'transactionId' },
							settlementDate: { type: 'string', format: 'date', description: 'settlementDate' },
							settlementAmount: { type: 'number', description: 'settlementAmount' },
							currencyCode: { type: 'string', description: 'currencyCode' },
							status: { type: 'string', description: 'status' },
							recordedBy: { type: 'string', description: 'recordedById' }
						}
					}
				}
			},

			IntercompanySettlementRecordDeleteResponse: {
				type: 'object',
				properties: {
					messageCode: { type: 'string' },
					message: { type: 'string', example: 'IntercompanySettlementRecord deleted successfully' }
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

export default defaultAreaIntercompanySettlementRecordSwagger;
