import { SwaggerDefinition } from 'swagger-jsdoc';

const defaultAreaCompanyEntitySwagger: SwaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'DefaultArea CompanyEntity API',
		version: '1.0.0',
		description: 'API documentation for managing company-entities in the default-area area.',
	},
	paths: {
		'/company-entities': {
			get: {
				summary: 'Get list of company-entities (DefaultArea)',
				description: 'Retrieve a paginated list of company-entities with default-area access',
				tags: ['CompanyEntities'],
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
						description: 'Search term for filtering company-entities',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'entityName',
						description: 'Filter by entityName',
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
						description: 'List of company-entities retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/CompanyEntityListResponse' }
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
				summary: 'Create a new company-entity (DefaultArea)',
				description: 'Add a new company-entity to the system',
				tags: ['CompanyEntities'],
				security: [{ bearerAuth: [] }],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/CreateCompanyEntityInput' }
						}
					}
				},
				responses: {
					201: {
						description: 'CompanyEntity created successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/CompanyEntityCreateResponse' }
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
		'/company-entities/select': {
			get: {
				summary: 'Get company-entities for selection dropdown (DefaultArea)',
				description: 'Retrieve a simplified list of company-entities for dropdown selection purposes',
				tags: ['CompanyEntities'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'query',
						name: 'search',
						description: 'Search term for filtering company-entities',
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
						description: 'CompanyEntity selection list retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/CompanyEntitySelectResponse' }
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
		'/company-entities/{entityId}': {
			get: {
				summary: 'Get company-entity for editing (DefaultArea)',
				description: 'Retrieve detailed information about a specific company-entity for editing',
				tags: ['CompanyEntities'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'entityId',
						required: true,
						description: 'ID of the company-entity to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'CompanyEntity details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/CompanyEntityEditResponse' }
							}
						}
					},
					404: {
						description: 'CompanyEntity not found',
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
				summary: 'Update a company-entity (DefaultArea)',
				description: 'Modify an existing company-entity in the system',
				tags: ['CompanyEntities'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'entityId',
						required: true,
						description: 'ID of the company-entity to update',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/UpdateCompanyEntityInput' }
						}
					}
				},
				responses: {
					200: {
						description: 'CompanyEntity updated successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/CompanyEntityUpdateResponse' }
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
						description: 'CompanyEntity not found',
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
				summary: 'Delete a company-entity (DefaultArea)',
				description: 'Remove a company-entity from the system',
				tags: ['CompanyEntities'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'entityId',
						required: true,
						description: 'ID of the company-entity to delete',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					202: {
						description: 'CompanyEntity deletion accepted',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/CompanyEntityDeleteResponse' }
							}
						}
					},
					404: {
						description: 'CompanyEntity not found',
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
		'/company-entities/detail/{entityId}': {
			get: {
				summary: 'Get detailed company-entity information (DefaultArea)',
				description: 'Retrieve comprehensive details about a specific company-entity',
				tags: ['CompanyEntities'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'entityId',
						required: true,
						description: 'ID of the company-entity to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'CompanyEntity details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/CompanyEntityDetailResponse' }
							}
						}
					},
					404: {
						description: 'CompanyEntity not found',
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

			CompanyEntityListItem: {
				type: 'object',
				properties: {
					entityName: { type: 'string', description: 'entityName' },
					currencyCode: { type: 'string', description: 'currencyCode' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				},
				required: ['entityName', ' currencyCode', ' createdAt', ' updatedAt']
			},

			CompanyEntityListResponse: {
				type: 'object',
				properties: {
					data: {
						type: 'array',
						items: { $ref: '#/components/schemas/CompanyEntityListItem' }
					},
					meta: {
						type: 'object',
						properties: {
							total: { type: 'integer', description: 'Total number of company-entities' },
							page: { type: 'integer', description: 'Current page number' },
							pageSize: { type: 'integer', description: 'Number of items per page' }
						}
					}
				},
				required: ['data', 'meta']
			},

			CompanyEntitySelectItem: {
				type: 'object',
				properties: {
					value: { type: 'string', format: 'uuid', description: 'Unique companyEntity identifier'},
					label: { type: 'string', description: 'CompanyEntity display label'}
				},
				required: ['value', ' label']
			},

			CompanyEntitySelectResponse: {
				type: 'array',
				items: { $ref: '#/components/schemas/CompanyEntitySelectItem' }
			},

			CompanyEntityDetailResponse: {
				type: 'object',
				properties: {
					entityName: { type: 'string', description: 'entityName' },
					currencyCode: { type: 'string', description: 'currencyCode' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				}
			},

			CreateCompanyEntityInput: {
				type: 'object',
				properties: {
					entityName: { type: 'string', description: 'entityName', example: 'Example entityName' },
					currencyCode: { type: 'string', description: 'currencyCode', example: 'Example currencyCode' }
				},
				required: ['entityName', 'currencyCode']
			},

			CompanyEntityCreateResponse: {
				type: 'object',
				properties: {
					entityId: { type: 'string', format: 'uuid' }
				}
			},

			CompanyEntityEditResponse: {
				type: 'object',
				properties: {
					entityName: { type: 'string', description: 'entityName' },
					currencyCode: { type: 'string', description: 'currencyCode' }
				}
			},

			UpdateCompanyEntityInput: {
				type: 'object',
				properties: {
					entityName: { type: 'string', description: 'entityName' },
					currencyCode: { type: 'string', description: 'currencyCode' }
				},
				required: ['entityName', 'currencyCode']
			},

			CompanyEntityUpdateResponse: {
				type: 'object',
				properties: {
					message: { type: 'string', example: 'CompanyEntity updated successfully' },
					data: {
						type: 'object',
						properties: {
							entityName: { type: 'string', description: 'entityName' },
							currencyCode: { type: 'string', description: 'currencyCode' }
						}
					}
				}
			},

			CompanyEntityDeleteResponse: {
				type: 'object',
				properties: {
					messageCode: { type: 'string' },
					message: { type: 'string', example: 'CompanyEntity deleted successfully' }
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

export default defaultAreaCompanyEntitySwagger;
