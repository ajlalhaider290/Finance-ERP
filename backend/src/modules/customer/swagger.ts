import { SwaggerDefinition } from 'swagger-jsdoc';

const defaultAreaCustomerSwagger: SwaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'DefaultArea Customer API',
		version: '1.0.0',
		description: 'API documentation for managing customers in the default-area area.',
	},
	paths: {
		'/customers': {
			get: {
				summary: 'Get list of customers (DefaultArea)',
				description: 'Retrieve a paginated list of customers with default-area access',
				tags: ['Customers'],
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
						description: 'Search term for filtering customers',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'customerName',
						description: 'Filter by customerName',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'contactEmail',
						description: 'Filter by contactEmail',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'contactPhone',
						description: 'Filter by contactPhone',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'address',
						description: 'Filter by address',
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
						description: 'List of customers retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/CustomerListResponse' }
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
				summary: 'Create a new customer (DefaultArea)',
				description: 'Add a new customer to the system',
				tags: ['Customers'],
				security: [{ bearerAuth: [] }],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/CreateCustomerInput' }
						}
					}
				},
				responses: {
					201: {
						description: 'Customer created successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/CustomerCreateResponse' }
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
		'/customers/select': {
			get: {
				summary: 'Get customers for selection dropdown (DefaultArea)',
				description: 'Retrieve a simplified list of customers for dropdown selection purposes',
				tags: ['Customers'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'query',
						name: 'search',
						description: 'Search term for filtering customers',
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
						description: 'Customer selection list retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/CustomerSelectResponse' }
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
		'/customers/{customerId}': {
			get: {
				summary: 'Get customer for editing (DefaultArea)',
				description: 'Retrieve detailed information about a specific customer for editing',
				tags: ['Customers'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'customerId',
						required: true,
						description: 'ID of the customer to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'Customer details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/CustomerEditResponse' }
							}
						}
					},
					404: {
						description: 'Customer not found',
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
				summary: 'Update a customer (DefaultArea)',
				description: 'Modify an existing customer in the system',
				tags: ['Customers'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'customerId',
						required: true,
						description: 'ID of the customer to update',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/UpdateCustomerInput' }
						}
					}
				},
				responses: {
					200: {
						description: 'Customer updated successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/CustomerUpdateResponse' }
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
						description: 'Customer not found',
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
				summary: 'Delete a customer (DefaultArea)',
				description: 'Remove a customer from the system',
				tags: ['Customers'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'customerId',
						required: true,
						description: 'ID of the customer to delete',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					202: {
						description: 'Customer deletion accepted',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/CustomerDeleteResponse' }
							}
						}
					},
					404: {
						description: 'Customer not found',
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
		'/customers/detail/{customerId}': {
			get: {
				summary: 'Get detailed customer information (DefaultArea)',
				description: 'Retrieve comprehensive details about a specific customer',
				tags: ['Customers'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'customerId',
						required: true,
						description: 'ID of the customer to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'Customer details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/CustomerDetailResponse' }
							}
						}
					},
					404: {
						description: 'Customer not found',
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

			CustomerListItem: {
				type: 'object',
				properties: {
					customerName: { type: 'string', description: 'customerName' },
					contactEmail: { type: 'string', format: 'email', description: 'contactEmail' },
					contactPhone: { type: 'string', description: 'contactPhone' },
					address: { type: 'string', description: 'address' },
					entityId: { type: 'string', description: 'entityId' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				},
				required: ['customerName', ' entityId', ' createdAt', ' updatedAt']
			},

			CustomerListResponse: {
				type: 'object',
				properties: {
					data: {
						type: 'array',
						items: { $ref: '#/components/schemas/CustomerListItem' }
					},
					meta: {
						type: 'object',
						properties: {
							total: { type: 'integer', description: 'Total number of customers' },
							page: { type: 'integer', description: 'Current page number' },
							pageSize: { type: 'integer', description: 'Number of items per page' }
						}
					}
				},
				required: ['data', 'meta']
			},

			CustomerSelectItem: {
				type: 'object',
				properties: {
					value: { type: 'string', format: 'uuid', description: 'Unique customer identifier'},
					label: { type: 'string', description: 'Customer display label'}
				},
				required: ['value', ' label']
			},

			CustomerSelectResponse: {
				type: 'array',
				items: { $ref: '#/components/schemas/CustomerSelectItem' }
			},

			CustomerDetailResponse: {
				type: 'object',
				properties: {
					customerName: { type: 'string', description: 'customerName' },
					contactEmail: { type: 'string', format: 'email', nullable: true, description: 'contactEmail' },
					contactPhone: { type: 'string', nullable: true, description: 'contactPhone' },
					address: { type: 'string', nullable: true, description: 'address' },
					entityId: { type: 'string', description: 'entityId' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				}
			},

			CreateCustomerInput: {
				type: 'object',
				properties: {
					customerName: { type: 'string', description: 'customerName', example: 'Example customerName' },
					contactEmail: { type: 'string', format: 'email', description: 'contactEmail', example: 'user@example.com' },
					contactPhone: { type: 'string', description: 'contactPhone', example: 'Example contactPhone' },
					address: { type: 'string', description: 'address' },
					entityId: { type: 'string', description: 'entityId' }
				},
				required: ['customerName', 'entityId']
			},

			CustomerCreateResponse: {
				type: 'object',
				properties: {
					customerId: { type: 'string', format: 'uuid' }
				}
			},

			CustomerEditResponse: {
				type: 'object',
				properties: {
					customerName: { type: 'string', description: 'customerName' },
					contactEmail: { type: 'string', format: 'email', nullable: true, description: 'contactEmail' },
					contactPhone: { type: 'string', nullable: true, description: 'contactPhone' },
					address: { type: 'string', nullable: true, description: 'address' },
					entityId: { type: 'string', description: 'entityId' }
				}
			},

			UpdateCustomerInput: {
				type: 'object',
				properties: {
					customerName: { type: 'string', description: 'customerName' },
					contactEmail: { type: 'string', format: 'email', description: 'contactEmail' },
					contactPhone: { type: 'string', description: 'contactPhone' },
					address: { type: 'string', description: 'address' },
					entityId: { type: 'string', description: 'entityId' }
				},
				required: ['customerName', 'entityId']
			},

			CustomerUpdateResponse: {
				type: 'object',
				properties: {
					message: { type: 'string', example: 'Customer updated successfully' },
					data: {
						type: 'object',
						properties: {
							customerName: { type: 'string', description: 'customerName' },
							contactEmail: { type: 'string', format: 'email', nullable: true, description: 'contactEmail' },
							contactPhone: { type: 'string', nullable: true, description: 'contactPhone' },
							address: { type: 'string', nullable: true, description: 'address' },
							entityId: { type: 'string', description: 'entityId' }
						}
					}
				}
			},

			CustomerDeleteResponse: {
				type: 'object',
				properties: {
					messageCode: { type: 'string' },
					message: { type: 'string', example: 'Customer deleted successfully' }
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

export default defaultAreaCustomerSwagger;
