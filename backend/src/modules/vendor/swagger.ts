import { SwaggerDefinition } from 'swagger-jsdoc';

const defaultAreaVendorSwagger: SwaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'DefaultArea Vendor API',
		version: '1.0.0',
		description: 'API documentation for managing vendors in the default-area area.',
	},
	paths: {
		'/vendors': {
			get: {
				summary: 'Get list of vendors (DefaultArea)',
				description: 'Retrieve a paginated list of vendors with default-area access',
				tags: ['Vendors'],
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
						description: 'Search term for filtering vendors',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'vendorName',
						description: 'Filter by vendorName',
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
						description: 'List of vendors retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/VendorListResponse' }
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
				summary: 'Create a new vendor (DefaultArea)',
				description: 'Add a new vendor to the system',
				tags: ['Vendors'],
				security: [{ bearerAuth: [] }],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/CreateVendorInput' }
						}
					}
				},
				responses: {
					201: {
						description: 'Vendor created successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/VendorCreateResponse' }
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
		'/vendors/select': {
			get: {
				summary: 'Get vendors for selection dropdown (DefaultArea)',
				description: 'Retrieve a simplified list of vendors for dropdown selection purposes',
				tags: ['Vendors'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'query',
						name: 'search',
						description: 'Search term for filtering vendors',
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
						description: 'Vendor selection list retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/VendorSelectResponse' }
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
		'/vendors/{vendorId}': {
			get: {
				summary: 'Get vendor for editing (DefaultArea)',
				description: 'Retrieve detailed information about a specific vendor for editing',
				tags: ['Vendors'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'vendorId',
						required: true,
						description: 'ID of the vendor to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'Vendor details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/VendorEditResponse' }
							}
						}
					},
					404: {
						description: 'Vendor not found',
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
				summary: 'Update a vendor (DefaultArea)',
				description: 'Modify an existing vendor in the system',
				tags: ['Vendors'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'vendorId',
						required: true,
						description: 'ID of the vendor to update',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/UpdateVendorInput' }
						}
					}
				},
				responses: {
					200: {
						description: 'Vendor updated successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/VendorUpdateResponse' }
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
						description: 'Vendor not found',
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
				summary: 'Delete a vendor (DefaultArea)',
				description: 'Remove a vendor from the system',
				tags: ['Vendors'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'vendorId',
						required: true,
						description: 'ID of the vendor to delete',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					202: {
						description: 'Vendor deletion accepted',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/VendorDeleteResponse' }
							}
						}
					},
					404: {
						description: 'Vendor not found',
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
		'/vendors/detail/{vendorId}': {
			get: {
				summary: 'Get detailed vendor information (DefaultArea)',
				description: 'Retrieve comprehensive details about a specific vendor',
				tags: ['Vendors'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'vendorId',
						required: true,
						description: 'ID of the vendor to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'Vendor details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/VendorDetailResponse' }
							}
						}
					},
					404: {
						description: 'Vendor not found',
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

			VendorListItem: {
				type: 'object',
				properties: {
					vendorName: { type: 'string', description: 'vendorName' },
					contactEmail: { type: 'string', format: 'email', description: 'contactEmail' },
					contactPhone: { type: 'string', description: 'contactPhone' },
					address: { type: 'string', description: 'address' },
					entityId: { type: 'string', description: 'entityId' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				},
				required: ['vendorName', ' entityId', ' createdAt', ' updatedAt']
			},

			VendorListResponse: {
				type: 'object',
				properties: {
					data: {
						type: 'array',
						items: { $ref: '#/components/schemas/VendorListItem' }
					},
					meta: {
						type: 'object',
						properties: {
							total: { type: 'integer', description: 'Total number of vendors' },
							page: { type: 'integer', description: 'Current page number' },
							pageSize: { type: 'integer', description: 'Number of items per page' }
						}
					}
				},
				required: ['data', 'meta']
			},

			VendorSelectItem: {
				type: 'object',
				properties: {
					value: { type: 'string', format: 'uuid', description: 'Unique vendor identifier'},
					label: { type: 'string', description: 'Vendor display label'}
				},
				required: ['value', ' label']
			},

			VendorSelectResponse: {
				type: 'array',
				items: { $ref: '#/components/schemas/VendorSelectItem' }
			},

			VendorDetailResponse: {
				type: 'object',
				properties: {
					vendorName: { type: 'string', description: 'vendorName' },
					contactEmail: { type: 'string', format: 'email', nullable: true, description: 'contactEmail' },
					contactPhone: { type: 'string', nullable: true, description: 'contactPhone' },
					address: { type: 'string', nullable: true, description: 'address' },
					entityId: { type: 'string', description: 'entityId' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				}
			},

			CreateVendorInput: {
				type: 'object',
				properties: {
					vendorName: { type: 'string', description: 'vendorName', example: 'Example vendorName' },
					contactEmail: { type: 'string', format: 'email', description: 'contactEmail', example: 'user@example.com' },
					contactPhone: { type: 'string', description: 'contactPhone', example: 'Example contactPhone' },
					address: { type: 'string', description: 'address' },
					entityId: { type: 'string', description: 'entityId' }
				},
				required: ['vendorName', 'entityId']
			},

			VendorCreateResponse: {
				type: 'object',
				properties: {
					vendorId: { type: 'string', format: 'uuid' }
				}
			},

			VendorEditResponse: {
				type: 'object',
				properties: {
					vendorName: { type: 'string', description: 'vendorName' },
					contactEmail: { type: 'string', format: 'email', nullable: true, description: 'contactEmail' },
					contactPhone: { type: 'string', nullable: true, description: 'contactPhone' },
					address: { type: 'string', nullable: true, description: 'address' },
					entityId: { type: 'string', description: 'entityId' }
				}
			},

			UpdateVendorInput: {
				type: 'object',
				properties: {
					vendorName: { type: 'string', description: 'vendorName' },
					contactEmail: { type: 'string', format: 'email', description: 'contactEmail' },
					contactPhone: { type: 'string', description: 'contactPhone' },
					address: { type: 'string', description: 'address' },
					entityId: { type: 'string', description: 'entityId' }
				},
				required: ['vendorName', 'entityId']
			},

			VendorUpdateResponse: {
				type: 'object',
				properties: {
					message: { type: 'string', example: 'Vendor updated successfully' },
					data: {
						type: 'object',
						properties: {
							vendorName: { type: 'string', description: 'vendorName' },
							contactEmail: { type: 'string', format: 'email', nullable: true, description: 'contactEmail' },
							contactPhone: { type: 'string', nullable: true, description: 'contactPhone' },
							address: { type: 'string', nullable: true, description: 'address' },
							entityId: { type: 'string', description: 'entityId' }
						}
					}
				}
			},

			VendorDeleteResponse: {
				type: 'object',
				properties: {
					messageCode: { type: 'string' },
					message: { type: 'string', example: 'Vendor deleted successfully' }
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

export default defaultAreaVendorSwagger;
