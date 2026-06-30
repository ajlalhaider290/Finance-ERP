import { SwaggerDefinition } from 'swagger-jsdoc';

const defaultAreaApprovalHistorySwagger: SwaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'DefaultArea ApprovalHistory API',
		version: '1.0.0',
		description: 'API documentation for managing approval-histories in the default-area area.',
	},
	paths: {
		'/approval-histories': {
			get: {
				summary: 'Get list of approval-histories (DefaultArea)',
				description: 'Retrieve a paginated list of approval-histories with default-area access',
				tags: ['ApprovalHistories'],
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
						description: 'Search term for filtering approval-histories',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'taskId',
						description: 'Filter by taskId',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'documentType',
						description: 'Filter by documentType',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'documentId',
						description: 'Filter by documentId',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'approverId',
						description: 'Filter by approverId',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'actionValue',
						description: 'Filter by actionValue',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'actionDate',
						description: 'Filter by actionDate',
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
						description: 'List of approval-histories retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ApprovalHistoryListResponse' }
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
				summary: 'Create a new approval-history (DefaultArea)',
				description: 'Add a new approval-history to the system',
				tags: ['ApprovalHistories'],
				security: [{ bearerAuth: [] }],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/CreateApprovalHistoryInput' }
						}
					}
				},
				responses: {
					201: {
						description: 'ApprovalHistory created successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ApprovalHistoryCreateResponse' }
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
		'/approval-histories/select': {
			get: {
				summary: 'Get approval-histories for selection dropdown (DefaultArea)',
				description: 'Retrieve a simplified list of approval-histories for dropdown selection purposes',
				tags: ['ApprovalHistories'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'query',
						name: 'search',
						description: 'Search term for filtering approval-histories',
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
						description: 'ApprovalHistory selection list retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ApprovalHistorySelectResponse' }
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
		'/approval-histories/{historyId}': {
			get: {
				summary: 'Get approval-history for editing (DefaultArea)',
				description: 'Retrieve detailed information about a specific approval-history for editing',
				tags: ['ApprovalHistories'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'historyId',
						required: true,
						description: 'ID of the approval-history to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'ApprovalHistory details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ApprovalHistoryEditResponse' }
							}
						}
					},
					404: {
						description: 'ApprovalHistory not found',
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
				summary: 'Update a approval-history (DefaultArea)',
				description: 'Modify an existing approval-history in the system',
				tags: ['ApprovalHistories'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'historyId',
						required: true,
						description: 'ID of the approval-history to update',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/UpdateApprovalHistoryInput' }
						}
					}
				},
				responses: {
					200: {
						description: 'ApprovalHistory updated successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ApprovalHistoryUpdateResponse' }
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
						description: 'ApprovalHistory not found',
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
				summary: 'Delete a approval-history (DefaultArea)',
				description: 'Remove a approval-history from the system',
				tags: ['ApprovalHistories'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'historyId',
						required: true,
						description: 'ID of the approval-history to delete',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					202: {
						description: 'ApprovalHistory deletion accepted',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ApprovalHistoryDeleteResponse' }
							}
						}
					},
					404: {
						description: 'ApprovalHistory not found',
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
		'/approval-histories/detail/{historyId}': {
			get: {
				summary: 'Get detailed approval-history information (DefaultArea)',
				description: 'Retrieve comprehensive details about a specific approval-history',
				tags: ['ApprovalHistories'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'historyId',
						required: true,
						description: 'ID of the approval-history to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'ApprovalHistory details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ApprovalHistoryDetailResponse' }
							}
						}
					},
					404: {
						description: 'ApprovalHistory not found',
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

			ApprovalHistoryListItem: {
				type: 'object',
				properties: {
					taskId: { type: 'string', description: 'taskId' },
					documentType: { type: 'string', description: 'documentType' },
					documentId: { type: 'string', description: 'documentId' },
					approverId: { type: 'string', description: 'approverId' },
					actionValue: { type: 'string', description: 'actionValue' },
					actionDate: { type: 'string', format: 'date-time', description: 'actionDate' },
					userComment: { type: 'string', description: 'userComment' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				},
				required: ['taskId', ' documentType', ' documentId', ' approverId', ' actionValue', ' actionDate']
			},

			ApprovalHistoryListResponse: {
				type: 'object',
				properties: {
					data: {
						type: 'array',
						items: { $ref: '#/components/schemas/ApprovalHistoryListItem' }
					},
					meta: {
						type: 'object',
						properties: {
							total: { type: 'integer', description: 'Total number of approval-histories' },
							page: { type: 'integer', description: 'Current page number' },
							pageSize: { type: 'integer', description: 'Number of items per page' }
						}
					}
				},
				required: ['data', 'meta']
			},

			ApprovalHistorySelectItem: {
				type: 'object',
				properties: {
					value: { type: 'string', format: 'uuid', description: 'Unique approvalHistory identifier'},
					label: { type: 'string', description: 'ApprovalHistory display label'}
				},
				required: ['value', ' label']
			},

			ApprovalHistorySelectResponse: {
				type: 'array',
				items: { $ref: '#/components/schemas/ApprovalHistorySelectItem' }
			},

			ApprovalHistoryDetailResponse: {
				type: 'object',
				properties: {
					taskId: { type: 'string', description: 'taskId' },
					documentType: { type: 'string', description: 'documentType' },
					documentId: { type: 'string', description: 'documentId' },
					approverId: { type: 'string', description: 'approverId' },
					actionValue: { type: 'string', description: 'actionValue' },
					actionDate: { type: 'string', format: 'date-time', description: 'actionDate' },
					userComment: { type: 'string', nullable: true, description: 'userComment' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				}
			},

			CreateApprovalHistoryInput: {
				type: 'object',
				properties: {
					taskId: { type: 'string', description: 'taskId' },
					documentType: { type: 'string', description: 'documentType', example: 'documentType Option' },
					documentId: { type: 'string', description: 'documentId', example: 'Example documentId' },
					approverId: { type: 'string', description: 'approverId' },
					actionValue: { type: 'string', description: 'actionValue', example: 'actionValue Option' },
					userComment: { type: 'string', description: 'userComment' }
				},
				required: ['taskId', 'documentType', 'documentId', 'approverId', 'actionValue']
			},

			ApprovalHistoryCreateResponse: {
				type: 'object',
				properties: {
					historyId: { type: 'string', format: 'uuid' }
				}
			},

			ApprovalHistoryEditResponse: {
				type: 'object',
				properties: {
					taskId: { type: 'string', description: 'taskId' },
					documentType: { type: 'string', description: 'documentType' },
					documentId: { type: 'string', description: 'documentId' },
					approverId: { type: 'string', description: 'approverId' },
					actionValue: { type: 'string', description: 'actionValue' },
					userComment: { type: 'string', nullable: true, description: 'userComment' }
				}
			},

			UpdateApprovalHistoryInput: {
				type: 'object',
				properties: {
					taskId: { type: 'string', description: 'taskId' },
					documentType: { type: 'string', description: 'documentType' },
					documentId: { type: 'string', description: 'documentId' },
					approverId: { type: 'string', description: 'approverId' },
					actionValue: { type: 'string', description: 'actionValue' },
					userComment: { type: 'string', description: 'userComment' }
				},
				required: ['taskId', 'documentType', 'documentId', 'approverId', 'actionValue']
			},

			ApprovalHistoryUpdateResponse: {
				type: 'object',
				properties: {
					message: { type: 'string', example: 'ApprovalHistory updated successfully' },
					data: {
						type: 'object',
						properties: {
							taskId: { type: 'string', description: 'taskId' },
							documentType: { type: 'string', description: 'documentType' },
							documentId: { type: 'string', description: 'documentId' },
							approverId: { type: 'string', description: 'approverId' },
							actionValue: { type: 'string', description: 'actionValue' },
							userComment: { type: 'string', nullable: true, description: 'userComment' }
						}
					}
				}
			},

			ApprovalHistoryDeleteResponse: {
				type: 'object',
				properties: {
					messageCode: { type: 'string' },
					message: { type: 'string', example: 'ApprovalHistory deleted successfully' }
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

export default defaultAreaApprovalHistorySwagger;
