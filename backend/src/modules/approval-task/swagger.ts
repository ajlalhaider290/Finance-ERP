import { SwaggerDefinition } from 'swagger-jsdoc';

const defaultAreaApprovalTaskSwagger: SwaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'DefaultArea ApprovalTask API',
		version: '1.0.0',
		description: 'API documentation for managing approval-tasks in the default-area area.',
	},
	paths: {
		'/approval-tasks': {
			get: {
				summary: 'Get list of approval-tasks (DefaultArea)',
				description: 'Retrieve a paginated list of approval-tasks with default-area access',
				tags: ['ApprovalTasks'],
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
						description: 'Search term for filtering approval-tasks',
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
						name: 'assignedToUserId',
						description: 'Filter by assignedToUserId',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'assignedToRole',
						description: 'Filter by assignedToRole',
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
						name: 'userComment',
						description: 'Filter by userComment',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'actionedBy',
						description: 'Filter by actionedById',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'actionedAt',
						description: 'Filter by actionedAt',
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
						description: 'List of approval-tasks retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ApprovalTaskListResponse' }
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
				summary: 'Create a new approval-task (DefaultArea)',
				description: 'Add a new approval-task to the system',
				tags: ['ApprovalTasks'],
				security: [{ bearerAuth: [] }],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/CreateApprovalTaskInput' }
						}
					}
				},
				responses: {
					201: {
						description: 'ApprovalTask created successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ApprovalTaskCreateResponse' }
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
		'/approval-tasks/select': {
			get: {
				summary: 'Get approval-tasks for selection dropdown (DefaultArea)',
				description: 'Retrieve a simplified list of approval-tasks for dropdown selection purposes',
				tags: ['ApprovalTasks'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'query',
						name: 'search',
						description: 'Search term for filtering approval-tasks',
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
						description: 'ApprovalTask selection list retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ApprovalTaskSelectResponse' }
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
		'/approval-tasks/{taskId}': {
			get: {
				summary: 'Get approval-task for editing (DefaultArea)',
				description: 'Retrieve detailed information about a specific approval-task for editing',
				tags: ['ApprovalTasks'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'taskId',
						required: true,
						description: 'ID of the approval-task to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'ApprovalTask details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ApprovalTaskEditResponse' }
							}
						}
					},
					404: {
						description: 'ApprovalTask not found',
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
				summary: 'Update a approval-task (DefaultArea)',
				description: 'Modify an existing approval-task in the system',
				tags: ['ApprovalTasks'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'taskId',
						required: true,
						description: 'ID of the approval-task to update',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/UpdateApprovalTaskInput' }
						}
					}
				},
				responses: {
					200: {
						description: 'ApprovalTask updated successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ApprovalTaskUpdateResponse' }
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
						description: 'ApprovalTask not found',
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
				summary: 'Delete a approval-task (DefaultArea)',
				description: 'Remove a approval-task from the system',
				tags: ['ApprovalTasks'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'taskId',
						required: true,
						description: 'ID of the approval-task to delete',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					202: {
						description: 'ApprovalTask deletion accepted',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ApprovalTaskDeleteResponse' }
							}
						}
					},
					404: {
						description: 'ApprovalTask not found',
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
		'/approval-tasks/detail/{taskId}': {
			get: {
				summary: 'Get detailed approval-task information (DefaultArea)',
				description: 'Retrieve comprehensive details about a specific approval-task',
				tags: ['ApprovalTasks'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'taskId',
						required: true,
						description: 'ID of the approval-task to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'ApprovalTask details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ApprovalTaskDetailResponse' }
							}
						}
					},
					404: {
						description: 'ApprovalTask not found',
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

			ApprovalTaskListItem: {
				type: 'object',
				properties: {
					documentType: { type: 'string', description: 'documentType' },
					documentId: { type: 'string', description: 'documentId' },
					assignedToUserId: { type: 'string', description: 'assignedToUserId' },
					assignedToRole: { type: 'string', description: 'assignedToRole' },
					status: { type: 'string', description: 'status' },
					userComment: { type: 'string', description: 'userComment' },
					actionedBy: { type: 'string', description: 'actionedById' },
					actionedAt: { type: 'string', format: 'date-time', description: 'actionedAt' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				},
				required: ['documentType', ' documentId', ' status', ' createdAt', ' updatedAt']
			},

			ApprovalTaskListResponse: {
				type: 'object',
				properties: {
					data: {
						type: 'array',
						items: { $ref: '#/components/schemas/ApprovalTaskListItem' }
					},
					meta: {
						type: 'object',
						properties: {
							total: { type: 'integer', description: 'Total number of approval-tasks' },
							page: { type: 'integer', description: 'Current page number' },
							pageSize: { type: 'integer', description: 'Number of items per page' }
						}
					}
				},
				required: ['data', 'meta']
			},

			ApprovalTaskSelectItem: {
				type: 'object',
				properties: {
					value: { type: 'string', format: 'uuid', description: 'Unique approvalTask identifier'},
					label: { type: 'string', description: 'ApprovalTask display label'}
				},
				required: ['value', ' label']
			},

			ApprovalTaskSelectResponse: {
				type: 'array',
				items: { $ref: '#/components/schemas/ApprovalTaskSelectItem' }
			},

			ApprovalTaskDetailResponse: {
				type: 'object',
				properties: {
					documentType: { type: 'string', description: 'documentType' },
					documentId: { type: 'string', description: 'documentId' },
					assignedToUserId: { type: 'string', nullable: true, description: 'assignedToUserId' },
					assignedToRole: { type: 'string', nullable: true, description: 'assignedToRole' },
					status: { type: 'string', description: 'status' },
					userComment: { type: 'string', nullable: true, description: 'userComment' },
					actionedBy: { type: 'string', nullable: true, description: 'actionedById' },
					actionedAt: { type: 'string', format: 'date-time', nullable: true, description: 'actionedAt' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				}
			},

			CreateApprovalTaskInput: {
				type: 'object',
				properties: {
					documentType: { type: 'string', description: 'documentType', example: 'documentType Option' },
					documentId: { type: 'string', description: 'documentId', example: 'Example documentId' },
					assignedToUserId: { type: 'string', description: 'assignedToUserId' },
					assignedToRole: { type: 'string', description: 'assignedToRole', example: 'Example assignedToRole' },
					status: { type: 'string', description: 'status', example: 'status Option' },
					userComment: { type: 'string', description: 'userComment' },
					actionedBy: { type: 'string', description: 'actionedById' },
					actionedAt: { type: 'string', format: 'date-time', description: 'actionedAt', example: '2024-01-01T12:00:00Z' }
				},
				required: ['documentType', 'documentId', 'status']
			},

			ApprovalTaskCreateResponse: {
				type: 'object',
				properties: {
					taskId: { type: 'string', format: 'uuid' }
				}
			},

			ApprovalTaskEditResponse: {
				type: 'object',
				properties: {
					documentType: { type: 'string', description: 'documentType' },
					documentId: { type: 'string', description: 'documentId' },
					assignedToUserId: { type: 'string', nullable: true, description: 'assignedToUserId' },
					assignedToRole: { type: 'string', nullable: true, description: 'assignedToRole' },
					status: { type: 'string', description: 'status' },
					userComment: { type: 'string', nullable: true, description: 'userComment' },
					actionedBy: { type: 'string', nullable: true, description: 'actionedById' },
					actionedAt: { type: 'string', format: 'date-time', nullable: true, description: 'actionedAt' }
				}
			},

			UpdateApprovalTaskInput: {
				type: 'object',
				properties: {
					documentType: { type: 'string', description: 'documentType' },
					documentId: { type: 'string', description: 'documentId' },
					assignedToUserId: { type: 'string', description: 'assignedToUserId' },
					assignedToRole: { type: 'string', description: 'assignedToRole' },
					status: { type: 'string', description: 'status' },
					userComment: { type: 'string', description: 'userComment' },
					actionedBy: { type: 'string', description: 'actionedById' },
					actionedAt: { type: 'string', format: 'date-time', description: 'actionedAt' }
				},
				required: ['documentType', 'documentId', 'status']
			},

			ApprovalTaskUpdateResponse: {
				type: 'object',
				properties: {
					message: { type: 'string', example: 'ApprovalTask updated successfully' },
					data: {
						type: 'object',
						properties: {
							documentType: { type: 'string', description: 'documentType' },
							documentId: { type: 'string', description: 'documentId' },
							assignedToUserId: { type: 'string', nullable: true, description: 'assignedToUserId' },
							assignedToRole: { type: 'string', nullable: true, description: 'assignedToRole' },
							status: { type: 'string', description: 'status' },
							userComment: { type: 'string', nullable: true, description: 'userComment' },
							actionedBy: { type: 'string', nullable: true, description: 'actionedById' },
							actionedAt: { type: 'string', format: 'date-time', nullable: true, description: 'actionedAt' }
						}
					}
				}
			},

			ApprovalTaskDeleteResponse: {
				type: 'object',
				properties: {
					messageCode: { type: 'string' },
					message: { type: 'string', example: 'ApprovalTask deleted successfully' }
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

export default defaultAreaApprovalTaskSwagger;
