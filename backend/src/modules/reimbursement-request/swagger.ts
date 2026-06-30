import { SwaggerDefinition } from 'swagger-jsdoc';

const defaultAreaReimbursementRequestSwagger: SwaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'DefaultArea ReimbursementRequest API',
		version: '1.0.0',
		description: 'API documentation for managing reimbursement-requests in the default-area area.',
	},
	paths: {
		'/reimbursement-requests': {
			get: {
				summary: 'Get list of reimbursement-requests (DefaultArea)',
				description: 'Retrieve a paginated list of reimbursement-requests with default-area access',
				tags: ['ReimbursementRequests'],
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
						description: 'Search term for filtering reimbursement-requests',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'employeeId',
						description: 'Filter by employeeId',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'businessPurpose',
						description: 'Filter by businessPurpose',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'expenseDate',
						description: 'Filter by expenseDate',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'categoryId',
						description: 'Filter by categoryId',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'costCenter',
						description: 'Filter by costCenter',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'department',
						description: 'Filter by department',
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
						name: 'taxAmount',
						description: 'Filter by taxAmount',
						schema: { type: 'number' }
					},
					{
						in: 'query',
						name: 'totalAmount',
						description: 'Filter by totalAmount',
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
						name: 'paidDate',
						description: 'Filter by paidDate',
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
						description: 'List of reimbursement-requests retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ReimbursementRequestListResponse' }
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
				summary: 'Create a new reimbursement-request (DefaultArea)',
				description: 'Add a new reimbursement-request to the system',
				tags: ['ReimbursementRequests'],
				security: [{ bearerAuth: [] }],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/CreateReimbursementRequestInput' }
						}
					}
				},
				responses: {
					201: {
						description: 'ReimbursementRequest created successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ReimbursementRequestCreateResponse' }
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
		'/reimbursement-requests/select': {
			get: {
				summary: 'Get reimbursement-requests for selection dropdown (DefaultArea)',
				description: 'Retrieve a simplified list of reimbursement-requests for dropdown selection purposes',
				tags: ['ReimbursementRequests'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'query',
						name: 'search',
						description: 'Search term for filtering reimbursement-requests',
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
						description: 'ReimbursementRequest selection list retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ReimbursementRequestSelectResponse' }
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
		'/reimbursement-requests/{reimbursementRequestId}': {
			get: {
				summary: 'Get reimbursement-request for editing (DefaultArea)',
				description: 'Retrieve detailed information about a specific reimbursement-request for editing',
				tags: ['ReimbursementRequests'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'reimbursementRequestId',
						required: true,
						description: 'ID of the reimbursement-request to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'ReimbursementRequest details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ReimbursementRequestEditResponse' }
							}
						}
					},
					404: {
						description: 'ReimbursementRequest not found',
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
				summary: 'Update a reimbursement-request (DefaultArea)',
				description: 'Modify an existing reimbursement-request in the system',
				tags: ['ReimbursementRequests'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'reimbursementRequestId',
						required: true,
						description: 'ID of the reimbursement-request to update',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/UpdateReimbursementRequestInput' }
						}
					}
				},
				responses: {
					200: {
						description: 'ReimbursementRequest updated successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ReimbursementRequestUpdateResponse' }
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
						description: 'ReimbursementRequest not found',
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
				summary: 'Delete a reimbursement-request (DefaultArea)',
				description: 'Remove a reimbursement-request from the system',
				tags: ['ReimbursementRequests'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'reimbursementRequestId',
						required: true,
						description: 'ID of the reimbursement-request to delete',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					202: {
						description: 'ReimbursementRequest deletion accepted',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ReimbursementRequestDeleteResponse' }
							}
						}
					},
					404: {
						description: 'ReimbursementRequest not found',
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
		'/reimbursement-requests/detail/{reimbursementRequestId}': {
			get: {
				summary: 'Get detailed reimbursement-request information (DefaultArea)',
				description: 'Retrieve comprehensive details about a specific reimbursement-request',
				tags: ['ReimbursementRequests'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'reimbursementRequestId',
						required: true,
						description: 'ID of the reimbursement-request to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'ReimbursementRequest details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ReimbursementRequestDetailResponse' }
							}
						}
					},
					404: {
						description: 'ReimbursementRequest not found',
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

			ReimbursementRequestListItem: {
				type: 'object',
				properties: {
					employeeId: { type: 'string', description: 'employeeId' },
					businessPurpose: { type: 'string', description: 'businessPurpose' },
					expenseDate: { type: 'string', format: 'date', description: 'expenseDate' },
					categoryId: { type: 'string', description: 'categoryId' },
					costCenter: { type: 'string', description: 'costCenter' },
					department: { type: 'string', description: 'department' },
					currencyCode: { type: 'string', description: 'currencyCode' },
					amount: { type: 'number', description: 'amount' },
					taxAmount: { type: 'number', description: 'taxAmount' },
					totalAmount: { type: 'string', description: 'totalAmount' },
					status: { type: 'string', description: 'status' },
					currentApproverId: { type: 'string', description: 'currentApproverId' },
					paidDate: { type: 'string', format: 'date', description: 'paidDate' },
					entityId: { type: 'string', description: 'entityId' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				},
				required: ['employeeId', ' businessPurpose', ' expenseDate', ' categoryId', ' currencyCode', ' amount', ' taxAmount', ' totalAmount', ' status', ' entityId', ' createdAt', ' updatedAt']
			},

			ReimbursementRequestListResponse: {
				type: 'object',
				properties: {
					data: {
						type: 'array',
						items: { $ref: '#/components/schemas/ReimbursementRequestListItem' }
					},
					meta: {
						type: 'object',
						properties: {
							total: { type: 'integer', description: 'Total number of reimbursement-requests' },
							page: { type: 'integer', description: 'Current page number' },
							pageSize: { type: 'integer', description: 'Number of items per page' }
						}
					}
				},
				required: ['data', 'meta']
			},

			ReimbursementRequestSelectItem: {
				type: 'object',
				properties: {
					value: { type: 'string', format: 'uuid', description: 'Unique reimbursementRequest identifier'},
					label: { type: 'string', description: 'ReimbursementRequest display label'}
				},
				required: ['value', ' label']
			},

			ReimbursementRequestSelectResponse: {
				type: 'array',
				items: { $ref: '#/components/schemas/ReimbursementRequestSelectItem' }
			},

			ReimbursementRequestDetailResponse: {
				type: 'object',
				properties: {
					employeeId: { type: 'string', description: 'employeeId' },
					businessPurpose: { type: 'string', description: 'businessPurpose' },
					expenseDate: { type: 'string', format: 'date', description: 'expenseDate' },
					categoryId: { type: 'string', description: 'categoryId' },
					costCenter: { type: 'string', nullable: true, description: 'costCenter' },
					department: { type: 'string', nullable: true, description: 'department' },
					currencyCode: { type: 'string', description: 'currencyCode' },
					amount: { type: 'number', description: 'amount' },
					taxAmount: { type: 'number', description: 'taxAmount' },
					totalAmount: { type: 'string', description: 'totalAmount' },
					status: { type: 'string', description: 'status' },
					currentApproverId: { type: 'string', nullable: true, description: 'currentApproverId' },
					paidDate: { type: 'string', format: 'date', nullable: true, description: 'paidDate' },
					entityId: { type: 'string', description: 'entityId' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				}
			},

			CreateReimbursementRequestInput: {
				type: 'object',
				properties: {
					employeeId: { type: 'string', description: 'employeeId' },
					businessPurpose: { type: 'string', description: 'businessPurpose', example: 'Example businessPurpose' },
					expenseDate: { type: 'string', format: 'date', description: 'expenseDate', example: '2024-01-01' },
					categoryId: { type: 'string', description: 'categoryId' },
					costCenter: { type: 'string', description: 'costCenter', example: 'Example costCenter' },
					department: { type: 'string', description: 'department', example: 'Example department' },
					currencyCode: { type: 'string', description: 'currencyCode', example: 'Example currencyCode' },
					amount: { type: 'number', description: 'amount', example: 123.45 },
					taxAmount: { type: 'number', description: 'taxAmount', example: 123.45 },
					totalAmount: { type: 'string', description: 'totalAmount', example: 'Example totalAmount' },
					status: { type: 'string', description: 'status', example: 'status Option' },
					currentApproverId: { type: 'string', description: 'currentApproverId' },
					paidDate: { type: 'string', format: 'date', description: 'paidDate', example: '2024-01-01' },
					entityId: { type: 'string', description: 'entityId' }
				},
				required: ['employeeId', 'businessPurpose', 'expenseDate', 'categoryId', 'currencyCode', 'amount', 'taxAmount', 'totalAmount', 'status', 'entityId']
			},

			ReimbursementRequestCreateResponse: {
				type: 'object',
				properties: {
					reimbursementRequestId: { type: 'string', format: 'uuid' }
				}
			},

			ReimbursementRequestEditResponse: {
				type: 'object',
				properties: {
					employeeId: { type: 'string', description: 'employeeId' },
					businessPurpose: { type: 'string', description: 'businessPurpose' },
					expenseDate: { type: 'string', format: 'date', description: 'expenseDate' },
					categoryId: { type: 'string', description: 'categoryId' },
					costCenter: { type: 'string', nullable: true, description: 'costCenter' },
					department: { type: 'string', nullable: true, description: 'department' },
					currencyCode: { type: 'string', description: 'currencyCode' },
					amount: { type: 'number', description: 'amount' },
					taxAmount: { type: 'number', description: 'taxAmount' },
					totalAmount: { type: 'string', description: 'totalAmount' },
					status: { type: 'string', description: 'status' },
					currentApproverId: { type: 'string', nullable: true, description: 'currentApproverId' },
					paidDate: { type: 'string', format: 'date', nullable: true, description: 'paidDate' },
					entityId: { type: 'string', description: 'entityId' }
				}
			},

			UpdateReimbursementRequestInput: {
				type: 'object',
				properties: {
					employeeId: { type: 'string', description: 'employeeId' },
					businessPurpose: { type: 'string', description: 'businessPurpose' },
					expenseDate: { type: 'string', format: 'date', description: 'expenseDate' },
					categoryId: { type: 'string', description: 'categoryId' },
					costCenter: { type: 'string', description: 'costCenter' },
					department: { type: 'string', description: 'department' },
					currencyCode: { type: 'string', description: 'currencyCode' },
					amount: { type: 'number', description: 'amount' },
					taxAmount: { type: 'number', description: 'taxAmount' },
					totalAmount: { type: 'string', description: 'totalAmount' },
					status: { type: 'string', description: 'status' },
					currentApproverId: { type: 'string', description: 'currentApproverId' },
					paidDate: { type: 'string', format: 'date', description: 'paidDate' },
					entityId: { type: 'string', description: 'entityId' }
				},
				required: ['employeeId', 'businessPurpose', 'expenseDate', 'categoryId', 'currencyCode', 'amount', 'taxAmount', 'totalAmount', 'status', 'entityId']
			},

			ReimbursementRequestUpdateResponse: {
				type: 'object',
				properties: {
					message: { type: 'string', example: 'ReimbursementRequest updated successfully' },
					data: {
						type: 'object',
						properties: {
							employeeId: { type: 'string', description: 'employeeId' },
							businessPurpose: { type: 'string', description: 'businessPurpose' },
							expenseDate: { type: 'string', format: 'date', description: 'expenseDate' },
							categoryId: { type: 'string', description: 'categoryId' },
							costCenter: { type: 'string', nullable: true, description: 'costCenter' },
							department: { type: 'string', nullable: true, description: 'department' },
							currencyCode: { type: 'string', description: 'currencyCode' },
							amount: { type: 'number', description: 'amount' },
							taxAmount: { type: 'number', description: 'taxAmount' },
							totalAmount: { type: 'string', description: 'totalAmount' },
							status: { type: 'string', description: 'status' },
							currentApproverId: { type: 'string', nullable: true, description: 'currentApproverId' },
							paidDate: { type: 'string', format: 'date', nullable: true, description: 'paidDate' },
							entityId: { type: 'string', description: 'entityId' }
						}
					}
				}
			},

			ReimbursementRequestDeleteResponse: {
				type: 'object',
				properties: {
					messageCode: { type: 'string' },
					message: { type: 'string', example: 'ReimbursementRequest deleted successfully' }
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

export default defaultAreaReimbursementRequestSwagger;
