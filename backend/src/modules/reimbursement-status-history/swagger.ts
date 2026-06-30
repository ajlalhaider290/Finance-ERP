import { SwaggerDefinition } from 'swagger-jsdoc';

const defaultAreaReimbursementStatusHistorySwagger: SwaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'DefaultArea ReimbursementStatusHistory API',
		version: '1.0.0',
		description: 'API documentation for managing reimbursement-status-histories in the default-area area.',
	},
	paths: {
		'/reimbursement-status-histories': {
			get: {
				summary: 'Get list of reimbursement-status-histories (DefaultArea)',
				description: 'Retrieve a paginated list of reimbursement-status-histories with default-area access',
				tags: ['ReimbursementStatusHistories'],
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
						description: 'Search term for filtering reimbursement-status-histories',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'reimbursementRequestId',
						description: 'Filter by reimbursementRequestId',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'oldStatus',
						description: 'Filter by oldStatus',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'newStatus',
						description: 'Filter by newStatus',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'changedBy',
						description: 'Filter by changedById',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'changeDate',
						description: 'Filter by changeDate',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'userComment',
						description: 'Filter by userComment',
						schema: { type: 'string' }
					},
				],
				responses: {
					200: {
						description: 'List of reimbursement-status-histories retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ReimbursementStatusHistoryListResponse' }
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
				summary: 'Create a new reimbursement-status-history (DefaultArea)',
				description: 'Add a new reimbursement-status-history to the system',
				tags: ['ReimbursementStatusHistories'],
				security: [{ bearerAuth: [] }],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/CreateReimbursementStatusHistoryInput' }
						}
					}
				},
				responses: {
					201: {
						description: 'ReimbursementStatusHistory created successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ReimbursementStatusHistoryCreateResponse' }
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
		'/reimbursement-status-histories/select': {
			get: {
				summary: 'Get reimbursement-status-histories for selection dropdown (DefaultArea)',
				description: 'Retrieve a simplified list of reimbursement-status-histories for dropdown selection purposes',
				tags: ['ReimbursementStatusHistories'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'query',
						name: 'search',
						description: 'Search term for filtering reimbursement-status-histories',
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
						description: 'ReimbursementStatusHistory selection list retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ReimbursementStatusHistorySelectResponse' }
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
		'/reimbursement-status-histories/{statusHistoryId}': {
			get: {
				summary: 'Get reimbursement-status-history for editing (DefaultArea)',
				description: 'Retrieve detailed information about a specific reimbursement-status-history for editing',
				tags: ['ReimbursementStatusHistories'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'statusHistoryId',
						required: true,
						description: 'ID of the reimbursement-status-history to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'ReimbursementStatusHistory details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ReimbursementStatusHistoryEditResponse' }
							}
						}
					},
					404: {
						description: 'ReimbursementStatusHistory not found',
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
				summary: 'Update a reimbursement-status-history (DefaultArea)',
				description: 'Modify an existing reimbursement-status-history in the system',
				tags: ['ReimbursementStatusHistories'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'statusHistoryId',
						required: true,
						description: 'ID of the reimbursement-status-history to update',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/UpdateReimbursementStatusHistoryInput' }
						}
					}
				},
				responses: {
					200: {
						description: 'ReimbursementStatusHistory updated successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ReimbursementStatusHistoryUpdateResponse' }
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
						description: 'ReimbursementStatusHistory not found',
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
				summary: 'Delete a reimbursement-status-history (DefaultArea)',
				description: 'Remove a reimbursement-status-history from the system',
				tags: ['ReimbursementStatusHistories'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'statusHistoryId',
						required: true,
						description: 'ID of the reimbursement-status-history to delete',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					202: {
						description: 'ReimbursementStatusHistory deletion accepted',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ReimbursementStatusHistoryDeleteResponse' }
							}
						}
					},
					404: {
						description: 'ReimbursementStatusHistory not found',
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
		'/reimbursement-status-histories/detail/{statusHistoryId}': {
			get: {
				summary: 'Get detailed reimbursement-status-history information (DefaultArea)',
				description: 'Retrieve comprehensive details about a specific reimbursement-status-history',
				tags: ['ReimbursementStatusHistories'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'statusHistoryId',
						required: true,
						description: 'ID of the reimbursement-status-history to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'ReimbursementStatusHistory details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ReimbursementStatusHistoryDetailResponse' }
							}
						}
					},
					404: {
						description: 'ReimbursementStatusHistory not found',
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

			ReimbursementStatusHistoryListItem: {
				type: 'object',
				properties: {
					reimbursementRequestId: { type: 'string', description: 'reimbursementRequestId' },
					oldStatus: { type: 'string', description: 'oldStatus' },
					newStatus: { type: 'string', description: 'newStatus' },
					changedBy: { type: 'string', description: 'changedById' },
					changeDate: { type: 'string', format: 'date-time', description: 'changeDate' },
					userComment: { type: 'string', description: 'userComment' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				},
				required: ['reimbursementRequestId', ' newStatus', ' changedBy', ' changeDate']
			},

			ReimbursementStatusHistoryListResponse: {
				type: 'object',
				properties: {
					data: {
						type: 'array',
						items: { $ref: '#/components/schemas/ReimbursementStatusHistoryListItem' }
					},
					meta: {
						type: 'object',
						properties: {
							total: { type: 'integer', description: 'Total number of reimbursement-status-histories' },
							page: { type: 'integer', description: 'Current page number' },
							pageSize: { type: 'integer', description: 'Number of items per page' }
						}
					}
				},
				required: ['data', 'meta']
			},

			ReimbursementStatusHistorySelectItem: {
				type: 'object',
				properties: {
					value: { type: 'string', format: 'uuid', description: 'Unique reimbursementStatusHistory identifier'},
					label: { type: 'string', description: 'ReimbursementStatusHistory display label'}
				},
				required: ['value', ' label']
			},

			ReimbursementStatusHistorySelectResponse: {
				type: 'array',
				items: { $ref: '#/components/schemas/ReimbursementStatusHistorySelectItem' }
			},

			ReimbursementStatusHistoryDetailResponse: {
				type: 'object',
				properties: {
					reimbursementRequestId: { type: 'string', description: 'reimbursementRequestId' },
					oldStatus: { type: 'string', nullable: true, description: 'oldStatus' },
					newStatus: { type: 'string', description: 'newStatus' },
					changedBy: { type: 'string', description: 'changedById' },
					changeDate: { type: 'string', format: 'date-time', description: 'changeDate' },
					userComment: { type: 'string', nullable: true, description: 'userComment' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				}
			},

			CreateReimbursementStatusHistoryInput: {
				type: 'object',
				properties: {
					reimbursementRequestId: { type: 'string', description: 'reimbursementRequestId' },
					oldStatus: { type: 'string', description: 'oldStatus', example: 'Example oldStatus' },
					newStatus: { type: 'string', description: 'newStatus', example: 'Example newStatus' },
					changedBy: { type: 'string', description: 'changedById' },
					userComment: { type: 'string', description: 'userComment' }
				},
				required: ['reimbursementRequestId', 'newStatus', 'changedBy']
			},

			ReimbursementStatusHistoryCreateResponse: {
				type: 'object',
				properties: {
					statusHistoryId: { type: 'string', format: 'uuid' }
				}
			},

			ReimbursementStatusHistoryEditResponse: {
				type: 'object',
				properties: {
					reimbursementRequestId: { type: 'string', description: 'reimbursementRequestId' },
					oldStatus: { type: 'string', nullable: true, description: 'oldStatus' },
					newStatus: { type: 'string', description: 'newStatus' },
					changedBy: { type: 'string', description: 'changedById' },
					userComment: { type: 'string', nullable: true, description: 'userComment' }
				}
			},

			UpdateReimbursementStatusHistoryInput: {
				type: 'object',
				properties: {
					reimbursementRequestId: { type: 'string', description: 'reimbursementRequestId' },
					oldStatus: { type: 'string', description: 'oldStatus' },
					newStatus: { type: 'string', description: 'newStatus' },
					changedBy: { type: 'string', description: 'changedById' },
					userComment: { type: 'string', description: 'userComment' }
				},
				required: ['reimbursementRequestId', 'newStatus', 'changedBy']
			},

			ReimbursementStatusHistoryUpdateResponse: {
				type: 'object',
				properties: {
					message: { type: 'string', example: 'ReimbursementStatusHistory updated successfully' },
					data: {
						type: 'object',
						properties: {
							reimbursementRequestId: { type: 'string', description: 'reimbursementRequestId' },
							oldStatus: { type: 'string', nullable: true, description: 'oldStatus' },
							newStatus: { type: 'string', description: 'newStatus' },
							changedBy: { type: 'string', description: 'changedById' },
							userComment: { type: 'string', nullable: true, description: 'userComment' }
						}
					}
				}
			},

			ReimbursementStatusHistoryDeleteResponse: {
				type: 'object',
				properties: {
					messageCode: { type: 'string' },
					message: { type: 'string', example: 'ReimbursementStatusHistory deleted successfully' }
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

export default defaultAreaReimbursementStatusHistorySwagger;
