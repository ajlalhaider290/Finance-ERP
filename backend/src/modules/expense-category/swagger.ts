import { SwaggerDefinition } from 'swagger-jsdoc';

const defaultAreaExpenseCategorySwagger: SwaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'DefaultArea ExpenseCategory API',
		version: '1.0.0',
		description: 'API documentation for managing expense-categories in the default-area area.',
	},
	paths: {
		'/expense-categories': {
			get: {
				summary: 'Get list of expense-categories (DefaultArea)',
				description: 'Retrieve a paginated list of expense-categories with default-area access',
				tags: ['ExpenseCategories'],
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
						description: 'Search term for filtering expense-categories',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'categoryName',
						description: 'Filter by categoryName',
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
						description: 'List of expense-categories retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ExpenseCategoryListResponse' }
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
				summary: 'Create a new expense-category (DefaultArea)',
				description: 'Add a new expense-category to the system',
				tags: ['ExpenseCategories'],
				security: [{ bearerAuth: [] }],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/CreateExpenseCategoryInput' }
						}
					}
				},
				responses: {
					201: {
						description: 'ExpenseCategory created successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ExpenseCategoryCreateResponse' }
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
		'/expense-categories/select': {
			get: {
				summary: 'Get expense-categories for selection dropdown (DefaultArea)',
				description: 'Retrieve a simplified list of expense-categories for dropdown selection purposes',
				tags: ['ExpenseCategories'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'query',
						name: 'search',
						description: 'Search term for filtering expense-categories',
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
						description: 'ExpenseCategory selection list retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ExpenseCategorySelectResponse' }
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
		'/expense-categories/{categoryId}': {
			get: {
				summary: 'Get expense-category for editing (DefaultArea)',
				description: 'Retrieve detailed information about a specific expense-category for editing',
				tags: ['ExpenseCategories'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'categoryId',
						required: true,
						description: 'ID of the expense-category to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'ExpenseCategory details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ExpenseCategoryEditResponse' }
							}
						}
					},
					404: {
						description: 'ExpenseCategory not found',
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
				summary: 'Update a expense-category (DefaultArea)',
				description: 'Modify an existing expense-category in the system',
				tags: ['ExpenseCategories'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'categoryId',
						required: true,
						description: 'ID of the expense-category to update',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/UpdateExpenseCategoryInput' }
						}
					}
				},
				responses: {
					200: {
						description: 'ExpenseCategory updated successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ExpenseCategoryUpdateResponse' }
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
						description: 'ExpenseCategory not found',
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
				summary: 'Delete a expense-category (DefaultArea)',
				description: 'Remove a expense-category from the system',
				tags: ['ExpenseCategories'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'categoryId',
						required: true,
						description: 'ID of the expense-category to delete',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					202: {
						description: 'ExpenseCategory deletion accepted',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ExpenseCategoryDeleteResponse' }
							}
						}
					},
					404: {
						description: 'ExpenseCategory not found',
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
		'/expense-categories/detail/{categoryId}': {
			get: {
				summary: 'Get detailed expense-category information (DefaultArea)',
				description: 'Retrieve comprehensive details about a specific expense-category',
				tags: ['ExpenseCategories'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'categoryId',
						required: true,
						description: 'ID of the expense-category to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'ExpenseCategory details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ExpenseCategoryDetailResponse' }
							}
						}
					},
					404: {
						description: 'ExpenseCategory not found',
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

			ExpenseCategoryListItem: {
				type: 'object',
				properties: {
					categoryName: { type: 'string', description: 'categoryName' },
					description: { type: 'string', description: 'description' },
					entityId: { type: 'string', description: 'entityId' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				},
				required: ['categoryName', ' entityId', ' createdAt', ' updatedAt']
			},

			ExpenseCategoryListResponse: {
				type: 'object',
				properties: {
					data: {
						type: 'array',
						items: { $ref: '#/components/schemas/ExpenseCategoryListItem' }
					},
					meta: {
						type: 'object',
						properties: {
							total: { type: 'integer', description: 'Total number of expense-categories' },
							page: { type: 'integer', description: 'Current page number' },
							pageSize: { type: 'integer', description: 'Number of items per page' }
						}
					}
				},
				required: ['data', 'meta']
			},

			ExpenseCategorySelectItem: {
				type: 'object',
				properties: {
					value: { type: 'string', format: 'uuid', description: 'Unique expenseCategory identifier'},
					label: { type: 'string', description: 'ExpenseCategory display label'}
				},
				required: ['value', ' label']
			},

			ExpenseCategorySelectResponse: {
				type: 'array',
				items: { $ref: '#/components/schemas/ExpenseCategorySelectItem' }
			},

			ExpenseCategoryDetailResponse: {
				type: 'object',
				properties: {
					categoryName: { type: 'string', description: 'categoryName' },
					description: { type: 'string', nullable: true, description: 'description' },
					entityId: { type: 'string', description: 'entityId' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				}
			},

			CreateExpenseCategoryInput: {
				type: 'object',
				properties: {
					categoryName: { type: 'string', description: 'categoryName', example: 'Example categoryName' },
					description: { type: 'string', description: 'description' },
					entityId: { type: 'string', description: 'entityId' }
				},
				required: ['categoryName', 'entityId']
			},

			ExpenseCategoryCreateResponse: {
				type: 'object',
				properties: {
					categoryId: { type: 'string', format: 'uuid' }
				}
			},

			ExpenseCategoryEditResponse: {
				type: 'object',
				properties: {
					categoryName: { type: 'string', description: 'categoryName' },
					description: { type: 'string', nullable: true, description: 'description' },
					entityId: { type: 'string', description: 'entityId' }
				}
			},

			UpdateExpenseCategoryInput: {
				type: 'object',
				properties: {
					categoryName: { type: 'string', description: 'categoryName' },
					description: { type: 'string', description: 'description' },
					entityId: { type: 'string', description: 'entityId' }
				},
				required: ['categoryName', 'entityId']
			},

			ExpenseCategoryUpdateResponse: {
				type: 'object',
				properties: {
					message: { type: 'string', example: 'ExpenseCategory updated successfully' },
					data: {
						type: 'object',
						properties: {
							categoryName: { type: 'string', description: 'categoryName' },
							description: { type: 'string', nullable: true, description: 'description' },
							entityId: { type: 'string', description: 'entityId' }
						}
					}
				}
			},

			ExpenseCategoryDeleteResponse: {
				type: 'object',
				properties: {
					messageCode: { type: 'string' },
					message: { type: 'string', example: 'ExpenseCategory deleted successfully' }
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

export default defaultAreaExpenseCategorySwagger;
