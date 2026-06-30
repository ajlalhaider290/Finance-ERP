import { SwaggerDefinition } from 'swagger-jsdoc';

const defaultAreaPaymentAllocationSwagger: SwaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'DefaultArea PaymentAllocation API',
		version: '1.0.0',
		description: 'API documentation for managing payment-allocations in the default-area area.',
	},
	paths: {
		'/payment-allocations': {
			get: {
				summary: 'Get list of payment-allocations (DefaultArea)',
				description: 'Retrieve a paginated list of payment-allocations with default-area access',
				tags: ['PaymentAllocations'],
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
						description: 'Search term for filtering payment-allocations',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'paymentId',
						description: 'Filter by paymentId',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'allocatedToType',
						description: 'Filter by allocatedToType',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'allocatedToId',
						description: 'Filter by allocatedToId',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'allocatedAmount',
						description: 'Filter by allocatedAmount',
						schema: { type: 'number' }
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
						description: 'List of payment-allocations retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/PaymentAllocationListResponse' }
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
				summary: 'Create a new payment-allocation (DefaultArea)',
				description: 'Add a new payment-allocation to the system',
				tags: ['PaymentAllocations'],
				security: [{ bearerAuth: [] }],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/CreatePaymentAllocationInput' }
						}
					}
				},
				responses: {
					201: {
						description: 'PaymentAllocation created successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/PaymentAllocationCreateResponse' }
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
		'/payment-allocations/select': {
			get: {
				summary: 'Get payment-allocations for selection dropdown (DefaultArea)',
				description: 'Retrieve a simplified list of payment-allocations for dropdown selection purposes',
				tags: ['PaymentAllocations'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'query',
						name: 'search',
						description: 'Search term for filtering payment-allocations',
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
						description: 'PaymentAllocation selection list retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/PaymentAllocationSelectResponse' }
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
		'/payment-allocations/{allocationId}': {
			get: {
				summary: 'Get payment-allocation for editing (DefaultArea)',
				description: 'Retrieve detailed information about a specific payment-allocation for editing',
				tags: ['PaymentAllocations'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'allocationId',
						required: true,
						description: 'ID of the payment-allocation to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'PaymentAllocation details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/PaymentAllocationEditResponse' }
							}
						}
					},
					404: {
						description: 'PaymentAllocation not found',
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
				summary: 'Update a payment-allocation (DefaultArea)',
				description: 'Modify an existing payment-allocation in the system',
				tags: ['PaymentAllocations'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'allocationId',
						required: true,
						description: 'ID of the payment-allocation to update',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/UpdatePaymentAllocationInput' }
						}
					}
				},
				responses: {
					200: {
						description: 'PaymentAllocation updated successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/PaymentAllocationUpdateResponse' }
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
						description: 'PaymentAllocation not found',
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
				summary: 'Delete a payment-allocation (DefaultArea)',
				description: 'Remove a payment-allocation from the system',
				tags: ['PaymentAllocations'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'allocationId',
						required: true,
						description: 'ID of the payment-allocation to delete',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					202: {
						description: 'PaymentAllocation deletion accepted',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/PaymentAllocationDeleteResponse' }
							}
						}
					},
					404: {
						description: 'PaymentAllocation not found',
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
		'/payment-allocations/detail/{allocationId}': {
			get: {
				summary: 'Get detailed payment-allocation information (DefaultArea)',
				description: 'Retrieve comprehensive details about a specific payment-allocation',
				tags: ['PaymentAllocations'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'allocationId',
						required: true,
						description: 'ID of the payment-allocation to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'PaymentAllocation details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/PaymentAllocationDetailResponse' }
							}
						}
					},
					404: {
						description: 'PaymentAllocation not found',
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

			PaymentAllocationListItem: {
				type: 'object',
				properties: {
					paymentId: { type: 'string', description: 'paymentId' },
					allocatedToType: { type: 'string', description: 'allocatedToType' },
					allocatedToId: { type: 'string', description: 'allocatedToId' },
					allocatedAmount: { type: 'number', description: 'allocatedAmount' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				},
				required: ['paymentId', ' allocatedToType', ' allocatedToId', ' allocatedAmount', ' createdAt', ' updatedAt']
			},

			PaymentAllocationListResponse: {
				type: 'object',
				properties: {
					data: {
						type: 'array',
						items: { $ref: '#/components/schemas/PaymentAllocationListItem' }
					},
					meta: {
						type: 'object',
						properties: {
							total: { type: 'integer', description: 'Total number of payment-allocations' },
							page: { type: 'integer', description: 'Current page number' },
							pageSize: { type: 'integer', description: 'Number of items per page' }
						}
					}
				},
				required: ['data', 'meta']
			},

			PaymentAllocationSelectItem: {
				type: 'object',
				properties: {
					value: { type: 'string', format: 'uuid', description: 'Unique paymentAllocation identifier'},
					label: { type: 'string', description: 'PaymentAllocation display label'}
				},
				required: ['value', ' label']
			},

			PaymentAllocationSelectResponse: {
				type: 'array',
				items: { $ref: '#/components/schemas/PaymentAllocationSelectItem' }
			},

			PaymentAllocationDetailResponse: {
				type: 'object',
				properties: {
					paymentId: { type: 'string', description: 'paymentId' },
					allocatedToType: { type: 'string', description: 'allocatedToType' },
					allocatedToId: { type: 'string', description: 'allocatedToId' },
					allocatedAmount: { type: 'number', description: 'allocatedAmount' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				}
			},

			CreatePaymentAllocationInput: {
				type: 'object',
				properties: {
					paymentId: { type: 'string', description: 'paymentId' },
					allocatedToType: { type: 'string', description: 'allocatedToType', example: 'allocatedToType Option' },
					allocatedToId: { type: 'string', description: 'allocatedToId', example: 'Example allocatedToId' },
					allocatedAmount: { type: 'number', description: 'allocatedAmount', example: 123.45 }
				},
				required: ['paymentId', 'allocatedToType', 'allocatedToId', 'allocatedAmount']
			},

			PaymentAllocationCreateResponse: {
				type: 'object',
				properties: {
					allocationId: { type: 'string', format: 'uuid' }
				}
			},

			PaymentAllocationEditResponse: {
				type: 'object',
				properties: {
					paymentId: { type: 'string', description: 'paymentId' },
					allocatedToType: { type: 'string', description: 'allocatedToType' },
					allocatedToId: { type: 'string', description: 'allocatedToId' },
					allocatedAmount: { type: 'number', description: 'allocatedAmount' }
				}
			},

			UpdatePaymentAllocationInput: {
				type: 'object',
				properties: {
					paymentId: { type: 'string', description: 'paymentId' },
					allocatedToType: { type: 'string', description: 'allocatedToType' },
					allocatedToId: { type: 'string', description: 'allocatedToId' },
					allocatedAmount: { type: 'number', description: 'allocatedAmount' }
				},
				required: ['paymentId', 'allocatedToType', 'allocatedToId', 'allocatedAmount']
			},

			PaymentAllocationUpdateResponse: {
				type: 'object',
				properties: {
					message: { type: 'string', example: 'PaymentAllocation updated successfully' },
					data: {
						type: 'object',
						properties: {
							paymentId: { type: 'string', description: 'paymentId' },
							allocatedToType: { type: 'string', description: 'allocatedToType' },
							allocatedToId: { type: 'string', description: 'allocatedToId' },
							allocatedAmount: { type: 'number', description: 'allocatedAmount' }
						}
					}
				}
			},

			PaymentAllocationDeleteResponse: {
				type: 'object',
				properties: {
					messageCode: { type: 'string' },
					message: { type: 'string', example: 'PaymentAllocation deleted successfully' }
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

export default defaultAreaPaymentAllocationSwagger;
