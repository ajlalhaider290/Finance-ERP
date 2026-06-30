import { SwaggerDefinition } from 'swagger-jsdoc';

const defaultAreaReimbursementDocumentSwagger: SwaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'DefaultArea ReimbursementDocument API',
		version: '1.0.0',
		description: 'API documentation for managing reimbursement-documents in the default-area area.',
	},
	paths: {
		'/reimbursement-documents': {
			get: {
				summary: 'Get list of reimbursement-documents (DefaultArea)',
				description: 'Retrieve a paginated list of reimbursement-documents with default-area access',
				tags: ['ReimbursementDocuments'],
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
						description: 'Search term for filtering reimbursement-documents',
						schema: { type: 'string' }
					},
					{
						in: 'query',
						name: 'reimbursementRequestId',
						description: 'Filter by reimbursementRequestId',
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
						description: 'List of reimbursement-documents retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ReimbursementDocumentListResponse' }
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
				summary: 'Create a new reimbursement-document (DefaultArea)',
				description: 'Add a new reimbursement-document to the system',
				tags: ['ReimbursementDocuments'],
				security: [{ bearerAuth: [] }],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/CreateReimbursementDocumentInput' }
						}
					}
				},
				responses: {
					201: {
						description: 'ReimbursementDocument created successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ReimbursementDocumentCreateResponse' }
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
		'/reimbursement-documents/select': {
			get: {
				summary: 'Get reimbursement-documents for selection dropdown (DefaultArea)',
				description: 'Retrieve a simplified list of reimbursement-documents for dropdown selection purposes',
				tags: ['ReimbursementDocuments'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'query',
						name: 'search',
						description: 'Search term for filtering reimbursement-documents',
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
						description: 'ReimbursementDocument selection list retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ReimbursementDocumentSelectResponse' }
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
		'/reimbursement-documents/{documentId}': {
			get: {
				summary: 'Get reimbursement-document for editing (DefaultArea)',
				description: 'Retrieve detailed information about a specific reimbursement-document for editing',
				tags: ['ReimbursementDocuments'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'documentId',
						required: true,
						description: 'ID of the reimbursement-document to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'ReimbursementDocument details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ReimbursementDocumentEditResponse' }
							}
						}
					},
					404: {
						description: 'ReimbursementDocument not found',
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
				summary: 'Update a reimbursement-document (DefaultArea)',
				description: 'Modify an existing reimbursement-document in the system',
				tags: ['ReimbursementDocuments'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'documentId',
						required: true,
						description: 'ID of the reimbursement-document to update',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/UpdateReimbursementDocumentInput' }
						}
					}
				},
				responses: {
					200: {
						description: 'ReimbursementDocument updated successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ReimbursementDocumentUpdateResponse' }
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
						description: 'ReimbursementDocument not found',
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
				summary: 'Delete a reimbursement-document (DefaultArea)',
				description: 'Remove a reimbursement-document from the system',
				tags: ['ReimbursementDocuments'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'documentId',
						required: true,
						description: 'ID of the reimbursement-document to delete',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					202: {
						description: 'ReimbursementDocument deletion accepted',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ReimbursementDocumentDeleteResponse' }
							}
						}
					},
					404: {
						description: 'ReimbursementDocument not found',
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
		'/reimbursement-documents/detail/{documentId}': {
			get: {
				summary: 'Get detailed reimbursement-document information (DefaultArea)',
				description: 'Retrieve comprehensive details about a specific reimbursement-document',
				tags: ['ReimbursementDocuments'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'documentId',
						required: true,
						description: 'ID of the reimbursement-document to retrieve',
						schema: { type: 'string', format: 'uuid' }
					}
				],
				responses: {
					200: {
						description: 'ReimbursementDocument details retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ReimbursementDocumentDetailResponse' }
							}
						}
					},
					404: {
						description: 'ReimbursementDocument not found',
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
		'/reimbursement-documents/upload': {
			post: {
				summary: 'Upload reimbursement-document file (DefaultArea)',
				description: 'Upload a file (picture) for a reimbursement-document',
				tags: ['ReimbursementDocuments'],
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
								schema: { $ref: '#/components/schemas/ReimbursementDocumentUploadResponse' }
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
		'/reimbursement-documents/upload/{documentId}': {
			delete: {
				summary: 'Remove reimbursement-document upload (DefaultArea)',
				description: 'Delete an uploaded file associated with a reimbursement-document',
				tags: ['ReimbursementDocuments'],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						in: 'path',
						name: 'documentId',
						required: true,
						description: 'ID of the reimbursement-document to remove upload from',
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
								schema: { $ref: '#/components/schemas/ReimbursementDocumentRemoveUploadResponse' }
							}
						}
					},
					404: {
						description: 'ReimbursementDocument not found',
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

			ReimbursementDocumentListItem: {
				type: 'object',
				properties: {
					reimbursementRequestId: { type: 'string', description: 'reimbursementRequestId' },
					documentType: { type: 'string', description: 'documentType' },
					fileUrl: { type: 'string', description: 'fileUrl' },
					fileName: { type: 'string', description: 'fileName' },
					uploadedBy: { type: 'string', description: 'uploadedById' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				},
				required: ['reimbursementRequestId', ' documentType', ' fileUrl', ' fileName', ' uploadedBy', ' createdAt', ' updatedAt']
			},

			ReimbursementDocumentListResponse: {
				type: 'object',
				properties: {
					data: {
						type: 'array',
						items: { $ref: '#/components/schemas/ReimbursementDocumentListItem' }
					},
					meta: {
						type: 'object',
						properties: {
							total: { type: 'integer', description: 'Total number of reimbursement-documents' },
							page: { type: 'integer', description: 'Current page number' },
							pageSize: { type: 'integer', description: 'Number of items per page' }
						}
					}
				},
				required: ['data', 'meta']
			},

			ReimbursementDocumentSelectItem: {
				type: 'object',
				properties: {
					value: { type: 'string', format: 'uuid', description: 'Unique reimbursementDocument identifier'},
					label: { type: 'string', description: 'ReimbursementDocument display label'}
				},
				required: ['value', ' label']
			},

			ReimbursementDocumentSelectResponse: {
				type: 'array',
				items: { $ref: '#/components/schemas/ReimbursementDocumentSelectItem' }
			},

			ReimbursementDocumentDetailResponse: {
				type: 'object',
				properties: {
					reimbursementRequestId: { type: 'string', description: 'reimbursementRequestId' },
					documentType: { type: 'string', description: 'documentType' },
					fileUrl: { type: 'string', description: 'fileUrl' },
					fileName: { type: 'string', description: 'fileName' },
					uploadedBy: { type: 'string', description: 'uploadedById' },
					createdAt: { type: 'string', format: 'date-time', description: 'createdAt' },
					updatedAt: { type: 'string', format: 'date-time', description: 'updatedAt' },
					_meta: { $ref: '#/components/schemas/ItemMeta' }
				}
			},

			CreateReimbursementDocumentInput: {
				type: 'object',
				properties: {
					reimbursementRequestId: { type: 'string', description: 'reimbursementRequestId' },
					documentType: { type: 'string', description: 'documentType', example: 'documentType Option' },
					fileUrl: { type: 'string', description: 'fileUrl', example: 'Example fileUrl' },
					fileName: { type: 'string', description: 'fileName', example: 'Example fileName' },
					uploadedBy: { type: 'string', description: 'uploadedById' }
				},
				required: ['reimbursementRequestId', 'documentType', 'fileUrl', 'fileName', 'uploadedBy']
			},

			ReimbursementDocumentCreateResponse: {
				type: 'object',
				properties: {
					documentId: { type: 'string', format: 'uuid' }
				}
			},

			ReimbursementDocumentEditResponse: {
				type: 'object',
				properties: {
					reimbursementRequestId: { type: 'string', description: 'reimbursementRequestId' },
					documentType: { type: 'string', description: 'documentType' },
					fileUrl: { type: 'string', description: 'fileUrl' },
					fileName: { type: 'string', description: 'fileName' },
					uploadedBy: { type: 'string', description: 'uploadedById' }
				}
			},

			UpdateReimbursementDocumentInput: {
				type: 'object',
				properties: {
					reimbursementRequestId: { type: 'string', description: 'reimbursementRequestId' },
					documentType: { type: 'string', description: 'documentType' },
					fileUrl: { type: 'string', description: 'fileUrl' },
					fileName: { type: 'string', description: 'fileName' },
					uploadedBy: { type: 'string', description: 'uploadedById' }
				},
				required: ['reimbursementRequestId', 'documentType', 'fileUrl', 'fileName', 'uploadedBy']
			},

			ReimbursementDocumentUpdateResponse: {
				type: 'object',
				properties: {
					message: { type: 'string', example: 'ReimbursementDocument updated successfully' },
					data: {
						type: 'object',
						properties: {
							reimbursementRequestId: { type: 'string', description: 'reimbursementRequestId' },
							documentType: { type: 'string', description: 'documentType' },
							fileUrl: { type: 'string', description: 'fileUrl' },
							fileName: { type: 'string', description: 'fileName' },
							uploadedBy: { type: 'string', description: 'uploadedById' }
						}
					}
				}
			},

			ReimbursementDocumentDeleteResponse: {
				type: 'object',
				properties: {
					messageCode: { type: 'string' },
					message: { type: 'string', example: 'ReimbursementDocument deleted successfully' }
				}
			},

			ReimbursementDocumentUploadResponse: {
				type: 'object',
				properties: {
					url: { type: 'string', description: 'URL of the uploaded file' }
				}
			},

			ReimbursementDocumentRemoveUploadResponse: {
				type: 'object',
				properties: {
					messageCode: { type: 'string' },
					message: { type: 'string', example: 'ReimbursementDocument upload removed successfully' }
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

export default defaultAreaReimbursementDocumentSwagger;
