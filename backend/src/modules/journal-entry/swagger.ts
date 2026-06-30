import { SwaggerDefinition } from 'swagger-jsdoc';

const defaultAreaJournalEntrySwagger: SwaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'DefaultArea JournalEntry API',
		version: '1.0.0',
		description: 'API documentation for managing journal-entries in the default-area area.',
	},
	paths: {
		'/journal-entries': {
			get: {
				summary: 'Get list of journal-entries (DefaultArea)',
				description: 'Retrieve a paginated list of journal-entries with default-area access',
				tags: ['JournalEntries'],
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
						description: 'Search term for filtering journal-entries',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'entryDate',
						description: 'Filter by entryDate',
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
						name: 'sourceDocumentType',
						description: 'Filter by sourceDocumentType',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'sourceDocumentId',
						description: 'Filter by sourceDocumentId',
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
						name: 'postedBy',
						description: 'Filter by postedById',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'postedAt',
						description: 'Filter by postedAt',
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
						description: 'List of journal-entries retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/JournalEntryListResponse' }
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
				summary: 'Create a new journal-entry (DefaultArea)',
				description: 'Add a new journal-entry to the system',
				tags: ['JournalEntries'],
				security: [{ bearerAuth: [] }],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/CreateJournalEntryInput' }
						}
					}
				},
				responses: {
					201: {
						description: 'JournalEntry created successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/JournalEntryCreateResponse' }
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
		'/journal-entries/select': {
			get: {
				summary: 'Get journal-entries for selection dropdown (DefaultArea)',
				description: 'Retrieve a simplified list of journal-entries for dropdown selection purposes',
				tags: ['JournalEntries'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'query',
						name: 'search',
						description: 'Search term for filtering journal-entries',
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
						description: 'JournalEntry selection list retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/JournalEntrySelectResponse' }
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
		'/journal-entries/{journalEntryId}': {
			get: {
				summary: 'Get journal-entry for editing (DefaultArea)',
				description: 'Retrieve detailed information about a specific journal-entry for editing',
				tags: ['JournalEntries'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'journalEntryId',
						required: true,
						description: 'ID of the journal-entry to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'JournalEntry details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/JournalEntryEditResponse' }
							}
						}
					},
					404: {
						description: 'JournalEntry not found',
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
				summary: 'Update a journal-entry (DefaultArea)',
				description: 'Modify an existing journal-entry in the system',
				tags: ['JournalEntries'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'journalEntryId',
						required: true,
						description: 'ID of the journal-entry to update',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/UpdateJournalEntryInput' }
						}
					}
				},
				responses: {
					200: {
						description: 'JournalEntry updated successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/JournalEntryUpdateResponse' }
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
						description: 'JournalEntry not found',
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
				summary: 'Delete a journal-entry (DefaultArea)',
				description: 'Remove a journal-entry from the system',
				tags: ['JournalEntries'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'journalEntryId',
						required: true,
						description: 'ID of the journal-entry to delete',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					202: {
						description: 'JournalEntry deletion accepted',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/JournalEntryDeleteResponse' }
							}
						}
					},
					404: {
						description: 'JournalEntry not found',
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
		'/journal-entries/detail/{journalEntryId}': {
			get: {
				summary: 'Get detailed journal-entry information (DefaultArea)',
				description: 'Retrieve comprehensive details about a specific journal-entry',
				tags: ['JournalEntries'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'journalEntryId',
						required: true,
						description: 'ID of the journal-entry to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'JournalEntry details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/JournalEntryDetailResponse' }
							}
						}
					},
					404: {
						description: 'JournalEntry not found',
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

			JournalEntryListItem: {
				type: 'object',
				properties: {
					entryDate: { type: 'string', format: 'date', description: 'entryDate' },
					description: { type: 'string', description: 'description' },
					sourceDocumentType: { type: 'string', description: 'sourceDocumentType' },
					sourceDocumentId: { type: 'string', description: 'sourceDocumentId' },
					entityId: { type: 'string', description: 'entityId' },
					postedBy: { type: 'string', description: 'postedById' },
					postedAt: { type: 'string', format: 'date-time', description: 'postedAt' },
					status: { type: 'string', description: 'status' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				},
				required: ['entryDate', ' description', ' entityId', ' status', ' createdAt', ' updatedAt']
			},

			JournalEntryListResponse: {
				type: 'object',
				properties: {
					data: {
						type: 'array',
						items: { $ref: '#/components/schemas/JournalEntryListItem' }
					},
					meta: {
						type: 'object',
						properties: {
							total: { type: 'integer', description: 'Total number of journal-entries' },
							page: { type: 'integer', description: 'Current page number' },
							pageSize: { type: 'integer', description: 'Number of items per page' }
						}
					}
				},
				required: ['data', 'meta']
			},

			JournalEntrySelectItem: {
				type: 'object',
				properties: {
					value: { type: 'string', format: 'uuid', description: 'Unique journalEntry identifier'},
					label: { type: 'string', description: 'JournalEntry display label'}
				},
				required: ['value', ' label']
			},

			JournalEntrySelectResponse: {
				type: 'array',
				items: { $ref: '#/components/schemas/JournalEntrySelectItem' }
			},

			JournalEntryDetailResponse: {
				type: 'object',
				properties: {
					entryDate: { type: 'string', format: 'date', description: 'entryDate' },
					description: { type: 'string', description: 'description' },
					sourceDocumentType: { type: 'string', nullable: true, description: 'sourceDocumentType' },
					sourceDocumentId: { type: 'string', nullable: true, description: 'sourceDocumentId' },
					entityId: { type: 'string', description: 'entityId' },
					postedBy: { type: 'string', nullable: true, description: 'postedById' },
					postedAt: { type: 'string', format: 'date-time', nullable: true, description: 'postedAt' },
					status: { type: 'string', description: 'status' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				}
			},

			CreateJournalEntryInput: {
				type: 'object',
				properties: {
					entryDate: { type: 'string', format: 'date', description: 'entryDate', example: '2024-01-01' },
					description: { type: 'string', description: 'description', example: 'Example description' },
					sourceDocumentType: { type: 'string', description: 'sourceDocumentType', example: 'sourceDocumentType Option' },
					sourceDocumentId: { type: 'string', description: 'sourceDocumentId', example: 'Example sourceDocumentId' },
					entityId: { type: 'string', description: 'entityId' },
					postedBy: { type: 'string', description: 'postedById' },
					postedAt: { type: 'string', format: 'date-time', description: 'postedAt', example: '2024-01-01T12:00:00Z' },
					status: { type: 'string', description: 'status', example: 'status Option' }
				},
				required: ['entryDate', 'description', 'entityId', 'status']
			},

			JournalEntryCreateResponse: {
				type: 'object',
				properties: {
					journalEntryId: { type: 'string', format: 'uuid' }
				}
			},

			JournalEntryEditResponse: {
				type: 'object',
				properties: {
					entryDate: { type: 'string', format: 'date', description: 'entryDate' },
					description: { type: 'string', description: 'description' },
					sourceDocumentType: { type: 'string', nullable: true, description: 'sourceDocumentType' },
					sourceDocumentId: { type: 'string', nullable: true, description: 'sourceDocumentId' },
					entityId: { type: 'string', description: 'entityId' },
					postedBy: { type: 'string', nullable: true, description: 'postedById' },
					postedAt: { type: 'string', format: 'date-time', nullable: true, description: 'postedAt' },
					status: { type: 'string', description: 'status' }
				}
			},

			UpdateJournalEntryInput: {
				type: 'object',
				properties: {
					entryDate: { type: 'string', format: 'date', description: 'entryDate' },
					description: { type: 'string', description: 'description' },
					sourceDocumentType: { type: 'string', description: 'sourceDocumentType' },
					sourceDocumentId: { type: 'string', description: 'sourceDocumentId' },
					entityId: { type: 'string', description: 'entityId' },
					postedBy: { type: 'string', description: 'postedById' },
					postedAt: { type: 'string', format: 'date-time', description: 'postedAt' },
					status: { type: 'string', description: 'status' }
				},
				required: ['entryDate', 'description', 'entityId', 'status']
			},

			JournalEntryUpdateResponse: {
				type: 'object',
				properties: {
					message: { type: 'string', example: 'JournalEntry updated successfully' },
					data: {
						type: 'object',
						properties: {
							entryDate: { type: 'string', format: 'date', description: 'entryDate' },
							description: { type: 'string', description: 'description' },
							sourceDocumentType: { type: 'string', nullable: true, description: 'sourceDocumentType' },
							sourceDocumentId: { type: 'string', nullable: true, description: 'sourceDocumentId' },
							entityId: { type: 'string', description: 'entityId' },
							postedBy: { type: 'string', nullable: true, description: 'postedById' },
							postedAt: { type: 'string', format: 'date-time', nullable: true, description: 'postedAt' },
							status: { type: 'string', description: 'status' }
						}
					}
				}
			},

			JournalEntryDeleteResponse: {
				type: 'object',
				properties: {
					messageCode: { type: 'string' },
					message: { type: 'string', example: 'JournalEntry deleted successfully' }
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

export default defaultAreaJournalEntrySwagger;
