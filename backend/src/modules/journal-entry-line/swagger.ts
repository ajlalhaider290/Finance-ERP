import { SwaggerDefinition } from 'swagger-jsdoc';

const defaultAreaJournalEntryLineSwagger: SwaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'DefaultArea JournalEntryLine API',
		version: '1.0.0',
		description: 'API documentation for managing journal-entry-lines in the default-area area.',
	},
	paths: {
		'/journal-entry-lines': {
			get: {
				summary: 'Get list of journal-entry-lines (DefaultArea)',
				description: 'Retrieve a paginated list of journal-entry-lines with default-area access',
				tags: ['JournalEntryLines'],
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
						description: 'Search term for filtering journal-entry-lines',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'journalEntryId',
						description: 'Filter by journalEntryId',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'debitAmount',
						description: 'Filter by debitAmount',
						schema: { type: 'number' }
					},
					{
						in: 'query',
						name: 'creditAmount',
						description: 'Filter by creditAmount',
						schema: { type: 'number' }
					},
					{
						in: 'query',
						name: 'description',
						description: 'Filter by description',
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
						description: 'List of journal-entry-lines retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/JournalEntryLineListResponse' }
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
				summary: 'Create a new journal-entry-line (DefaultArea)',
				description: 'Add a new journal-entry-line to the system',
				tags: ['JournalEntryLines'],
				security: [{ bearerAuth: [] }],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/CreateJournalEntryLineInput' }
						}
					}
				},
				responses: {
					201: {
						description: 'JournalEntryLine created successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/JournalEntryLineCreateResponse' }
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
		'/journal-entry-lines/select': {
			get: {
				summary: 'Get journal-entry-lines for selection dropdown (DefaultArea)',
				description: 'Retrieve a simplified list of journal-entry-lines for dropdown selection purposes',
				tags: ['JournalEntryLines'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'query',
						name: 'search',
						description: 'Search term for filtering journal-entry-lines',
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
						description: 'JournalEntryLine selection list retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/JournalEntryLineSelectResponse' }
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
		'/journal-entry-lines/{lineId}': {
			get: {
				summary: 'Get journal-entry-line for editing (DefaultArea)',
				description: 'Retrieve detailed information about a specific journal-entry-line for editing',
				tags: ['JournalEntryLines'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'lineId',
						required: true,
						description: 'ID of the journal-entry-line to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'JournalEntryLine details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/JournalEntryLineEditResponse' }
							}
						}
					},
					404: {
						description: 'JournalEntryLine not found',
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
				summary: 'Update a journal-entry-line (DefaultArea)',
				description: 'Modify an existing journal-entry-line in the system',
				tags: ['JournalEntryLines'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'lineId',
						required: true,
						description: 'ID of the journal-entry-line to update',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/UpdateJournalEntryLineInput' }
						}
					}
				},
				responses: {
					200: {
						description: 'JournalEntryLine updated successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/JournalEntryLineUpdateResponse' }
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
						description: 'JournalEntryLine not found',
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
				summary: 'Delete a journal-entry-line (DefaultArea)',
				description: 'Remove a journal-entry-line from the system',
				tags: ['JournalEntryLines'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'lineId',
						required: true,
						description: 'ID of the journal-entry-line to delete',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					202: {
						description: 'JournalEntryLine deletion accepted',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/JournalEntryLineDeleteResponse' }
							}
						}
					},
					404: {
						description: 'JournalEntryLine not found',
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
		'/journal-entry-lines/detail/{lineId}': {
			get: {
				summary: 'Get detailed journal-entry-line information (DefaultArea)',
				description: 'Retrieve comprehensive details about a specific journal-entry-line',
				tags: ['JournalEntryLines'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'lineId',
						required: true,
						description: 'ID of the journal-entry-line to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'JournalEntryLine details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/JournalEntryLineDetailResponse' }
							}
						}
					},
					404: {
						description: 'JournalEntryLine not found',
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

			JournalEntryLineListItem: {
				type: 'object',
				properties: {
					journalEntryId: { type: 'string', description: 'journalEntryId' },
					debitAmount: { type: 'number', description: 'debitAmount' },
					creditAmount: { type: 'number', description: 'creditAmount' },
					description: { type: 'string', description: 'description' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				},
				required: ['journalEntryId', ' debitAmount', ' creditAmount', ' createdAt', ' updatedAt']
			},

			JournalEntryLineListResponse: {
				type: 'object',
				properties: {
					data: {
						type: 'array',
						items: { $ref: '#/components/schemas/JournalEntryLineListItem' }
					},
					meta: {
						type: 'object',
						properties: {
							total: { type: 'integer', description: 'Total number of journal-entry-lines' },
							page: { type: 'integer', description: 'Current page number' },
							pageSize: { type: 'integer', description: 'Number of items per page' }
						}
					}
				},
				required: ['data', 'meta']
			},

			JournalEntryLineSelectItem: {
				type: 'object',
				properties: {
					value: { type: 'string', format: 'uuid', description: 'Unique journalEntryLine identifier'},
					label: { type: 'string', description: 'JournalEntryLine display label'}
				},
				required: ['value', ' label']
			},

			JournalEntryLineSelectResponse: {
				type: 'array',
				items: { $ref: '#/components/schemas/JournalEntryLineSelectItem' }
			},

			JournalEntryLineDetailResponse: {
				type: 'object',
				properties: {
					journalEntryId: { type: 'string', description: 'journalEntryId' },
					debitAmount: { type: 'number', description: 'debitAmount' },
					creditAmount: { type: 'number', description: 'creditAmount' },
					description: { type: 'string', nullable: true, description: 'description' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				}
			},

			CreateJournalEntryLineInput: {
				type: 'object',
				properties: {
					journalEntryId: { type: 'string', description: 'journalEntryId' },
					debitAmount: { type: 'number', description: 'debitAmount', example: 123.45 },
					creditAmount: { type: 'number', description: 'creditAmount', example: 123.45 },
					description: { type: 'string', description: 'description', example: 'Example description' }
				},
				required: ['journalEntryId', 'debitAmount', 'creditAmount']
			},

			JournalEntryLineCreateResponse: {
				type: 'object',
				properties: {
					lineId: { type: 'string', format: 'uuid' }
				}
			},

			JournalEntryLineEditResponse: {
				type: 'object',
				properties: {
					journalEntryId: { type: 'string', description: 'journalEntryId' },
					debitAmount: { type: 'number', description: 'debitAmount' },
					creditAmount: { type: 'number', description: 'creditAmount' },
					description: { type: 'string', nullable: true, description: 'description' }
				}
			},

			UpdateJournalEntryLineInput: {
				type: 'object',
				properties: {
					journalEntryId: { type: 'string', description: 'journalEntryId' },
					debitAmount: { type: 'number', description: 'debitAmount' },
					creditAmount: { type: 'number', description: 'creditAmount' },
					description: { type: 'string', description: 'description' }
				},
				required: ['journalEntryId', 'debitAmount', 'creditAmount']
			},

			JournalEntryLineUpdateResponse: {
				type: 'object',
				properties: {
					message: { type: 'string', example: 'JournalEntryLine updated successfully' },
					data: {
						type: 'object',
						properties: {
							journalEntryId: { type: 'string', description: 'journalEntryId' },
							debitAmount: { type: 'number', description: 'debitAmount' },
							creditAmount: { type: 'number', description: 'creditAmount' },
							description: { type: 'string', nullable: true, description: 'description' }
						}
					}
				}
			},

			JournalEntryLineDeleteResponse: {
				type: 'object',
				properties: {
					messageCode: { type: 'string' },
					message: { type: 'string', example: 'JournalEntryLine deleted successfully' }
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

export default defaultAreaJournalEntryLineSwagger;
