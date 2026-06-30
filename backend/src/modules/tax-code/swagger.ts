import { SwaggerDefinition } from 'swagger-jsdoc';

const defaultAreaTaxCodeSwagger: SwaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'DefaultArea TaxCode API',
		version: '1.0.0',
		description: 'API documentation for managing tax-codes in the default-area area.',
	},
	paths: {
		'/tax-codes': {
			get: {
				summary: 'Get list of tax-codes (DefaultArea)',
				description: 'Retrieve a paginated list of tax-codes with default-area access',
				tags: ['TaxCodes'],
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
						description: 'Search term for filtering tax-codes',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'taxCodeName',
						description: 'Filter by taxCodeName',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'rate',
						description: 'Filter by rate',
						schema: { type: 'number' }
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
						name: 'isActive',
						description: 'Filter by isActive',
						schema: { type: 'boolean' }
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
						description: 'List of tax-codes retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/TaxCodeListResponse' }
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
				summary: 'Create a new tax-code (DefaultArea)',
				description: 'Add a new tax-code to the system',
				tags: ['TaxCodes'],
				security: [{ bearerAuth: [] }],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/CreateTaxCodeInput' }
						}
					}
				},
				responses: {
					201: {
						description: 'TaxCode created successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/TaxCodeCreateResponse' }
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
		'/tax-codes/select': {
			get: {
				summary: 'Get tax-codes for selection dropdown (DefaultArea)',
				description: 'Retrieve a simplified list of tax-codes for dropdown selection purposes',
				tags: ['TaxCodes'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'query',
						name: 'search',
						description: 'Search term for filtering tax-codes',
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
						description: 'TaxCode selection list retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/TaxCodeSelectResponse' }
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
		'/tax-codes/{taxCodeId}': {
			get: {
				summary: 'Get tax-code for editing (DefaultArea)',
				description: 'Retrieve detailed information about a specific tax-code for editing',
				tags: ['TaxCodes'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'taxCodeId',
						required: true,
						description: 'ID of the tax-code to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'TaxCode details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/TaxCodeEditResponse' }
							}
						}
					},
					404: {
						description: 'TaxCode not found',
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
				summary: 'Update a tax-code (DefaultArea)',
				description: 'Modify an existing tax-code in the system',
				tags: ['TaxCodes'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'taxCodeId',
						required: true,
						description: 'ID of the tax-code to update',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/UpdateTaxCodeInput' }
						}
					}
				},
				responses: {
					200: {
						description: 'TaxCode updated successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/TaxCodeUpdateResponse' }
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
						description: 'TaxCode not found',
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
				summary: 'Delete a tax-code (DefaultArea)',
				description: 'Remove a tax-code from the system',
				tags: ['TaxCodes'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'taxCodeId',
						required: true,
						description: 'ID of the tax-code to delete',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					202: {
						description: 'TaxCode deletion accepted',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/TaxCodeDeleteResponse' }
							}
						}
					},
					404: {
						description: 'TaxCode not found',
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
		'/tax-codes/detail/{taxCodeId}': {
			get: {
				summary: 'Get detailed tax-code information (DefaultArea)',
				description: 'Retrieve comprehensive details about a specific tax-code',
				tags: ['TaxCodes'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'taxCodeId',
						required: true,
						description: 'ID of the tax-code to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'TaxCode details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/TaxCodeDetailResponse' }
							}
						}
					},
					404: {
						description: 'TaxCode not found',
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

			TaxCodeListItem: {
				type: 'object',
				properties: {
					taxCodeName: { type: 'string', description: 'taxCodeName' },
					rate: { type: 'number', description: 'rate' },
					description: { type: 'string', description: 'description' },
					entityId: { type: 'string', description: 'entityId' },
					isActive: { type: 'boolean', description: 'isActive' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				},
				required: ['taxCodeName', ' rate', ' entityId', ' isActive', ' createdAt', ' updatedAt']
			},

			TaxCodeListResponse: {
				type: 'object',
				properties: {
					data: {
						type: 'array',
						items: { $ref: '#/components/schemas/TaxCodeListItem' }
					},
					meta: {
						type: 'object',
						properties: {
							total: { type: 'integer', description: 'Total number of tax-codes' },
							page: { type: 'integer', description: 'Current page number' },
							pageSize: { type: 'integer', description: 'Number of items per page' }
						}
					}
				},
				required: ['data', 'meta']
			},

			TaxCodeSelectItem: {
				type: 'object',
				properties: {
					value: { type: 'string', format: 'uuid', description: 'Unique taxCode identifier'},
					label: { type: 'string', description: 'TaxCode display label'}
				},
				required: ['value', ' label']
			},

			TaxCodeSelectResponse: {
				type: 'array',
				items: { $ref: '#/components/schemas/TaxCodeSelectItem' }
			},

			TaxCodeDetailResponse: {
				type: 'object',
				properties: {
					taxCodeName: { type: 'string', description: 'taxCodeName' },
					rate: { type: 'number', description: 'rate' },
					description: { type: 'string', nullable: true, description: 'description' },
					entityId: { type: 'string', description: 'entityId' },
					isActive: { type: 'boolean', description: 'isActive' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				}
			},

			CreateTaxCodeInput: {
				type: 'object',
				properties: {
					taxCodeName: { type: 'string', description: 'taxCodeName', example: 'Example taxCodeName' },
					rate: { type: 'number', description: 'rate', example: 123.45 },
					description: { type: 'string', description: 'description' },
					entityId: { type: 'string', description: 'entityId' },
					isActive: { type: 'boolean', description: 'isActive', example: true }
				},
				required: ['taxCodeName', 'rate', 'entityId', 'isActive']
			},

			TaxCodeCreateResponse: {
				type: 'object',
				properties: {
					taxCodeId: { type: 'string', format: 'uuid' }
				}
			},

			TaxCodeEditResponse: {
				type: 'object',
				properties: {
					taxCodeName: { type: 'string', description: 'taxCodeName' },
					rate: { type: 'number', description: 'rate' },
					description: { type: 'string', nullable: true, description: 'description' },
					entityId: { type: 'string', description: 'entityId' },
					isActive: { type: 'boolean', description: 'isActive' }
				}
			},

			UpdateTaxCodeInput: {
				type: 'object',
				properties: {
					taxCodeName: { type: 'string', description: 'taxCodeName' },
					rate: { type: 'number', description: 'rate' },
					description: { type: 'string', description: 'description' },
					entityId: { type: 'string', description: 'entityId' },
					isActive: { type: 'boolean', description: 'isActive' }
				},
				required: ['taxCodeName', 'rate', 'entityId', 'isActive']
			},

			TaxCodeUpdateResponse: {
				type: 'object',
				properties: {
					message: { type: 'string', example: 'TaxCode updated successfully' },
					data: {
						type: 'object',
						properties: {
							taxCodeName: { type: 'string', description: 'taxCodeName' },
							rate: { type: 'number', description: 'rate' },
							description: { type: 'string', nullable: true, description: 'description' },
							entityId: { type: 'string', description: 'entityId' },
							isActive: { type: 'boolean', description: 'isActive' }
						}
					}
				}
			},

			TaxCodeDeleteResponse: {
				type: 'object',
				properties: {
					messageCode: { type: 'string' },
					message: { type: 'string', example: 'TaxCode deleted successfully' }
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

export default defaultAreaTaxCodeSwagger;
