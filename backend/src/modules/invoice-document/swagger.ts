import { SwaggerDefinition } from 'swagger-jsdoc';

const defaultAreaInvoiceDocumentSwagger: SwaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'DefaultArea InvoiceDocument API',
		version: '1.0.0',
		description: 'API documentation for managing invoice-documents in the default-area area.',
	},
	paths: {
		'/invoice-documents': {
			get: {
				summary: 'Get list of invoice-documents (DefaultArea)',
				description: 'Retrieve a paginated list of invoice-documents with default-area access',
				tags: ['InvoiceDocuments'],
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
						description: 'Search term for filtering invoice-documents',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'fileUrl',
						description: 'Filter by fileUrl',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'fileName',
						description: 'Filter by fileName',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'uploadedBy',
						description: 'Filter by uploadedById',
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
						description: 'List of invoice-documents retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/InvoiceDocumentListResponse' }
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
				summary: 'Create a new invoice-document (DefaultArea)',
				description: 'Add a new invoice-document to the system',
				tags: ['InvoiceDocuments'],
				security: [{ bearerAuth: [] }],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/CreateInvoiceDocumentInput' }
						}
					}
				},
				responses: {
					201: {
						description: 'InvoiceDocument created successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/InvoiceDocumentCreateResponse' }
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
		'/invoice-documents/select': {
			get: {
				summary: 'Get invoice-documents for selection dropdown (DefaultArea)',
				description: 'Retrieve a simplified list of invoice-documents for dropdown selection purposes',
				tags: ['InvoiceDocuments'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'query',
						name: 'search',
						description: 'Search term for filtering invoice-documents',
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
						description: 'InvoiceDocument selection list retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/InvoiceDocumentSelectResponse' }
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
		'/invoice-documents/{documentId}': {
			get: {
				summary: 'Get invoice-document for editing (DefaultArea)',
				description: 'Retrieve detailed information about a specific invoice-document for editing',
				tags: ['InvoiceDocuments'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'documentId',
						required: true,
						description: 'ID of the invoice-document to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'InvoiceDocument details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/InvoiceDocumentEditResponse' }
							}
						}
					},
					404: {
						description: 'InvoiceDocument not found',
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
				summary: 'Update a invoice-document (DefaultArea)',
				description: 'Modify an existing invoice-document in the system',
				tags: ['InvoiceDocuments'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'documentId',
						required: true,
						description: 'ID of the invoice-document to update',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/UpdateInvoiceDocumentInput' }
						}
					}
				},
				responses: {
					200: {
						description: 'InvoiceDocument updated successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/InvoiceDocumentUpdateResponse' }
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
						description: 'InvoiceDocument not found',
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
				summary: 'Delete a invoice-document (DefaultArea)',
				description: 'Remove a invoice-document from the system',
				tags: ['InvoiceDocuments'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'documentId',
						required: true,
						description: 'ID of the invoice-document to delete',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					202: {
						description: 'InvoiceDocument deletion accepted',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/InvoiceDocumentDeleteResponse' }
							}
						}
					},
					404: {
						description: 'InvoiceDocument not found',
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
		'/invoice-documents/detail/{documentId}': {
			get: {
				summary: 'Get detailed invoice-document information (DefaultArea)',
				description: 'Retrieve comprehensive details about a specific invoice-document',
				tags: ['InvoiceDocuments'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'documentId',
						required: true,
						description: 'ID of the invoice-document to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'InvoiceDocument details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/InvoiceDocumentDetailResponse' }
							}
						}
					},
					404: {
						description: 'InvoiceDocument not found',
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
		'/invoice-documents/upload': {
			post: {
				summary: 'Upload invoice-document file (DefaultArea)',
				description: 'Upload a file (picture) for a invoice-document',
				tags: ['InvoiceDocuments'],
				security: [{ bearerAuth: [] }],
				requestBody: {
					required: true,
					content: {
						'multipart/form-data': {
							schema: {
								type: 'object',
								properties: {
									file: {
										type: 'string',
										format: 'binary',
										description: 'File to upload (max 200MB)'
									}
								},
								required: ['file']
							}
						}
					}
				},
				responses: {
					200: {
						description: 'File uploaded successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/InvoiceDocumentUploadResponse' }
							}
						}
					},
					400: {
						description: 'Bad request - Invalid file or upload error',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ErrorResponse' }
							}
						}
					},
					413: {
						description: 'Payload too large - File exceeds 200MB limit',
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
		'/invoice-documents/upload/{documentId}': {
			delete: {
				summary: 'Remove invoice-document upload (DefaultArea)',
				description: 'Delete an uploaded file associated with a invoice-document',
				tags: ['InvoiceDocuments'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'documentId',
						required: true,
						description: 'ID of the invoice-document to remove upload from',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				requestBody: {
					required: false,
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									fileName: { type: 'string', description: 'Name of the file to remove' }
								}
							}
						}
					}
				},
				responses: {
					202: {
						description: 'Upload removal accepted',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/InvoiceDocumentRemoveUploadResponse' }
							}
						}
					},
					404: {
						description: 'InvoiceDocument not found',
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

			InvoiceDocumentListItem: {
				type: 'object',
				properties: {
					fileUrl: { type: 'string', description: 'fileUrl' },
					fileName: { type: 'string', description: 'fileName' },
					uploadedBy: { type: 'string', description: 'uploadedById' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				},
				required: ['fileUrl', ' fileName', ' uploadedBy', ' createdAt', ' updatedAt']
			},

			InvoiceDocumentListResponse: {
				type: 'object',
				properties: {
					data: {
						type: 'array',
						items: { $ref: '#/components/schemas/InvoiceDocumentListItem' }
					},
					meta: {
						type: 'object',
						properties: {
							total: { type: 'integer', description: 'Total number of invoice-documents' },
							page: { type: 'integer', description: 'Current page number' },
							pageSize: { type: 'integer', description: 'Number of items per page' }
						}
					}
				},
				required: ['data', 'meta']
			},

			InvoiceDocumentSelectItem: {
				type: 'object',
				properties: {
					value: { type: 'string', format: 'uuid', description: 'Unique invoiceDocument identifier'},
					label: { type: 'string', description: 'InvoiceDocument display label'}
				},
				required: ['value', ' label']
			},

			InvoiceDocumentSelectResponse: {
				type: 'array',
				items: { $ref: '#/components/schemas/InvoiceDocumentSelectItem' }
			},

			InvoiceDocumentDetailResponse: {
				type: 'object',
				properties: {
					fileUrl: { type: 'string', description: 'fileUrl' },
					fileName: { type: 'string', description: 'fileName' },
					uploadedBy: { type: 'string', description: 'uploadedById' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				}
			},

			CreateInvoiceDocumentInput: {
				type: 'object',
				properties: {
					fileUrl: { type: 'string', description: 'fileUrl', example: 'Example fileUrl' },
					fileName: { type: 'string', description: 'fileName', example: 'Example fileName' },
					uploadedBy: { type: 'string', description: 'uploadedById' }
				},
				required: ['fileUrl', 'fileName', 'uploadedBy']
			},

			InvoiceDocumentCreateResponse: {
				type: 'object',
				properties: {
					documentId: { type: 'string', format: 'uuid' }
				}
			},

			InvoiceDocumentEditResponse: {
				type: 'object',
				properties: {
					fileUrl: { type: 'string', description: 'fileUrl' },
					fileName: { type: 'string', description: 'fileName' },
					uploadedBy: { type: 'string', description: 'uploadedById' }
				}
			},

			UpdateInvoiceDocumentInput: {
				type: 'object',
				properties: {
					fileUrl: { type: 'string', description: 'fileUrl' },
					fileName: { type: 'string', description: 'fileName' },
					uploadedBy: { type: 'string', description: 'uploadedById' }
				},
				required: ['fileUrl', 'fileName', 'uploadedBy']
			},

			InvoiceDocumentUpdateResponse: {
				type: 'object',
				properties: {
					message: { type: 'string', example: 'InvoiceDocument updated successfully' },
					data: {
						type: 'object',
						properties: {
							fileUrl: { type: 'string', description: 'fileUrl' },
							fileName: { type: 'string', description: 'fileName' },
							uploadedBy: { type: 'string', description: 'uploadedById' }
						}
					}
				}
			},

			InvoiceDocumentDeleteResponse: {
				type: 'object',
				properties: {
					messageCode: { type: 'string' },
					message: { type: 'string', example: 'InvoiceDocument deleted successfully' }
				}
			},

			InvoiceDocumentUploadResponse: {
				type: 'object',
				properties: {
					url: { type: 'string', description: 'URL of the uploaded file' }
				}
			},

			InvoiceDocumentRemoveUploadResponse: {
				type: 'object',
				properties: {
					messageCode: { type: 'string' },
					message: { type: 'string', example: 'InvoiceDocument upload removed successfully' }
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

export default defaultAreaInvoiceDocumentSwagger;
