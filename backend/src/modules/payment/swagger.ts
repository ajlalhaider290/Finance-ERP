import { SwaggerDefinition } from 'swagger-jsdoc';

const defaultAreaPaymentSwagger: SwaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'DefaultArea Payment API',
		version: '1.0.0',
		description: 'API documentation for managing payments in the default-area area.',
	},
	paths: {
		'/payments': {
			get: {
				summary: 'Get list of payments (DefaultArea)',
				description: 'Retrieve a paginated list of payments with default-area access',
				tags: ['Payments'],
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
						description: 'Search term for filtering payments',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'paymentDate',
						description: 'Filter by paymentDate',
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
						name: 'currencyCode',
						description: 'Filter by currencyCode',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'paymentMethod',
						description: 'Filter by paymentMethod',
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
						name: 'paidBy',
						description: 'Filter by paidById',
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
						description: 'List of payments retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/PaymentListResponse' }
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
				summary: 'Create a new payment (DefaultArea)',
				description: 'Add a new payment to the system',
				tags: ['Payments'],
				security: [{ bearerAuth: [] }],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/CreatePaymentInput' }
						}
					}
				},
				responses: {
					201: {
						description: 'Payment created successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/PaymentCreateResponse' }
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
		'/payments/select': {
			get: {
				summary: 'Get payments for selection dropdown (DefaultArea)',
				description: 'Retrieve a simplified list of payments for dropdown selection purposes',
				tags: ['Payments'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'query',
						name: 'search',
						description: 'Search term for filtering payments',
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
						description: 'Payment selection list retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/PaymentSelectResponse' }
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
		'/payments/{paymentId}': {
			get: {
				summary: 'Get payment for editing (DefaultArea)',
				description: 'Retrieve detailed information about a specific payment for editing',
				tags: ['Payments'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'paymentId',
						required: true,
						description: 'ID of the payment to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'Payment details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/PaymentEditResponse' }
							}
						}
					},
					404: {
						description: 'Payment not found',
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
				summary: 'Update a payment (DefaultArea)',
				description: 'Modify an existing payment in the system',
				tags: ['Payments'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'paymentId',
						required: true,
						description: 'ID of the payment to update',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/UpdatePaymentInput' }
						}
					}
				},
				responses: {
					200: {
						description: 'Payment updated successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/PaymentUpdateResponse' }
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
						description: 'Payment not found',
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
				summary: 'Delete a payment (DefaultArea)',
				description: 'Remove a payment from the system',
				tags: ['Payments'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'paymentId',
						required: true,
						description: 'ID of the payment to delete',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					202: {
						description: 'Payment deletion accepted',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/PaymentDeleteResponse' }
							}
						}
					},
					404: {
						description: 'Payment not found',
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
		'/payments/detail/{paymentId}': {
			get: {
				summary: 'Get detailed payment information (DefaultArea)',
				description: 'Retrieve comprehensive details about a specific payment',
				tags: ['Payments'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'paymentId',
						required: true,
						description: 'ID of the payment to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'Payment details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/PaymentDetailResponse' }
							}
						}
					},
					404: {
						description: 'Payment not found',
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

			PaymentListItem: {
				type: 'object',
				properties: {
					paymentDate: { type: 'string', format: 'date', description: 'paymentDate' },
					amount: { type: 'number', description: 'amount' },
					currencyCode: { type: 'string', description: 'currencyCode' },
					paymentMethod: { type: 'string', description: 'paymentMethod' },
					status: { type: 'string', description: 'status' },
					paidBy: { type: 'string', description: 'paidById' },
					entityId: { type: 'string', description: 'entityId' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				},
				required: ['paymentDate', ' amount', ' currencyCode', ' paymentMethod', ' status', ' entityId', ' createdAt', ' updatedAt']
			},

			PaymentListResponse: {
				type: 'object',
				properties: {
					data: {
						type: 'array',
						items: { $ref: '#/components/schemas/PaymentListItem' }
					},
					meta: {
						type: 'object',
						properties: {
							total: { type: 'integer', description: 'Total number of payments' },
							page: { type: 'integer', description: 'Current page number' },
							pageSize: { type: 'integer', description: 'Number of items per page' }
						}
					}
				},
				required: ['data', 'meta']
			},

			PaymentSelectItem: {
				type: 'object',
				properties: {
					value: { type: 'string', format: 'uuid', description: 'Unique payment identifier'},
					label: { type: 'string', description: 'Payment display label'}
				},
				required: ['value', ' label']
			},

			PaymentSelectResponse: {
				type: 'array',
				items: { $ref: '#/components/schemas/PaymentSelectItem' }
			},

			PaymentDetailResponse: {
				type: 'object',
				properties: {
					paymentDate: { type: 'string', format: 'date', description: 'paymentDate' },
					amount: { type: 'number', description: 'amount' },
					currencyCode: { type: 'string', description: 'currencyCode' },
					paymentMethod: { type: 'string', description: 'paymentMethod' },
					status: { type: 'string', description: 'status' },
					paidBy: { type: 'string', nullable: true, description: 'paidById' },
					entityId: { type: 'string', description: 'entityId' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				}
			},

			CreatePaymentInput: {
				type: 'object',
				properties: {
					paymentDate: { type: 'string', format: 'date', description: 'paymentDate', example: '2024-01-01' },
					amount: { type: 'number', description: 'amount', example: 123.45 },
					currencyCode: { type: 'string', description: 'currencyCode', example: 'Example currencyCode' },
					paymentMethod: { type: 'string', description: 'paymentMethod', example: 'paymentMethod Option' },
					status: { type: 'string', description: 'status', example: 'status Option' },
					paidBy: { type: 'string', description: 'paidById' },
					entityId: { type: 'string', description: 'entityId' }
				},
				required: ['paymentDate', 'amount', 'currencyCode', 'paymentMethod', 'status', 'entityId']
			},

			PaymentCreateResponse: {
				type: 'object',
				properties: {
					paymentId: { type: 'string', format: 'uuid' }
				}
			},

			PaymentEditResponse: {
				type: 'object',
				properties: {
					paymentDate: { type: 'string', format: 'date', description: 'paymentDate' },
					amount: { type: 'number', description: 'amount' },
					currencyCode: { type: 'string', description: 'currencyCode' },
					paymentMethod: { type: 'string', description: 'paymentMethod' },
					status: { type: 'string', description: 'status' },
					paidBy: { type: 'string', nullable: true, description: 'paidById' },
					entityId: { type: 'string', description: 'entityId' }
				}
			},

			UpdatePaymentInput: {
				type: 'object',
				properties: {
					paymentDate: { type: 'string', format: 'date', description: 'paymentDate' },
					amount: { type: 'number', description: 'amount' },
					currencyCode: { type: 'string', description: 'currencyCode' },
					paymentMethod: { type: 'string', description: 'paymentMethod' },
					status: { type: 'string', description: 'status' },
					paidBy: { type: 'string', description: 'paidById' },
					entityId: { type: 'string', description: 'entityId' }
				},
				required: ['paymentDate', 'amount', 'currencyCode', 'paymentMethod', 'status', 'entityId']
			},

			PaymentUpdateResponse: {
				type: 'object',
				properties: {
					message: { type: 'string', example: 'Payment updated successfully' },
					data: {
						type: 'object',
						properties: {
							paymentDate: { type: 'string', format: 'date', description: 'paymentDate' },
							amount: { type: 'number', description: 'amount' },
							currencyCode: { type: 'string', description: 'currencyCode' },
							paymentMethod: { type: 'string', description: 'paymentMethod' },
							status: { type: 'string', description: 'status' },
							paidBy: { type: 'string', nullable: true, description: 'paidById' },
							entityId: { type: 'string', description: 'entityId' }
						}
					}
				}
			},

			PaymentDeleteResponse: {
				type: 'object',
				properties: {
					messageCode: { type: 'string' },
					message: { type: 'string', example: 'Payment deleted successfully' }
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

export default defaultAreaPaymentSwagger;
