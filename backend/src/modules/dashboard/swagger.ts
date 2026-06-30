import { SwaggerDefinition } from 'swagger-jsdoc';

const defaultAreaDashboardSwagger: SwaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'DefaultArea Dashboard API',
		version: '1.0.0',
		description: 'API documentation for DefaultArea dashboard metrics.',
	},
	paths: {
		'/api/defaultArea/dashboard/total-reimbursement-requests': {
			get: {
				summary: 'Total Reimbursement Requests',
				description: 'Total number of reimbursement requests',
				tags: ['DefaultArea - Dashboard'],
				security: [{ bearerAuth: [] }],
				responses: {
					'200': {
						description: 'Successfully retrieved total reimbursement requests',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									example: { "count": 25 }
								}
							}
						}
					},
					'401': {
						description: 'Unauthorized - Invalid or missing authentication token'
					},
					'403': {
						description: 'Forbidden - Insufficient permissions'
					},
					'500': {
						description: 'Internal server error'
					}
				}
			}
		},
		'/api/defaultArea/dashboard/total-invoices': {
			get: {
				summary: 'Total Invoices',
				description: 'Total number of invoices',
				tags: ['DefaultArea - Dashboard'],
				security: [{ bearerAuth: [] }],
				responses: {
					'200': {
						description: 'Successfully retrieved total invoices',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									example: { "count": 25 }
								}
							}
						}
					},
					'401': {
						description: 'Unauthorized - Invalid or missing authentication token'
					},
					'403': {
						description: 'Forbidden - Insufficient permissions'
					},
					'500': {
						description: 'Internal server error'
					}
				}
			}
		},
		'/api/defaultArea/dashboard/total-invoice-amount': {
			get: {
				summary: 'Total Invoice Amount',
				description: 'Sum of all invoice total amounts',
				tags: ['DefaultArea - Dashboard'],
				security: [{ bearerAuth: [] }],
				responses: {
					'200': {
						description: 'Successfully retrieved total invoice amount',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									example: { "total": 5000 }
								}
							}
						}
					},
					'401': {
						description: 'Unauthorized - Invalid or missing authentication token'
					},
					'403': {
						description: 'Forbidden - Insufficient permissions'
					},
					'500': {
						description: 'Internal server error'
					}
				}
			}
		},
		'/api/defaultArea/dashboard/total-payments-made': {
			get: {
				summary: 'Total Payments Made',
				description: 'Sum of all payment amounts',
				tags: ['DefaultArea - Dashboard'],
				security: [{ bearerAuth: [] }],
				responses: {
					'200': {
						description: 'Successfully retrieved total payments made',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									example: { "total": 5000 }
								}
							}
						}
					},
					'401': {
						description: 'Unauthorized - Invalid or missing authentication token'
					},
					'403': {
						description: 'Forbidden - Insufficient permissions'
					},
					'500': {
						description: 'Internal server error'
					}
				}
			}
		},
		'/api/defaultArea/dashboard/reimbursement-requests-by-status': {
			get: {
				summary: 'Reimbursement Requests by Status',
				description: 'Distribution of reimbursement requests by their current status',
				tags: ['DefaultArea - Dashboard'],
				security: [{ bearerAuth: [] }],
				responses: {
					'200': {
						description: 'Successfully retrieved reimbursement requests by status',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									example: { "data": [{ "name": "Item 1", "value": 100 }, { "name": "Item 2", "value": 200 }] }
								}
							}
						}
					},
					'401': {
						description: 'Unauthorized - Invalid or missing authentication token'
					},
					'403': {
						description: 'Forbidden - Insufficient permissions'
					},
					'500': {
						description: 'Internal server error'
					}
				}
			}
		},
		'/api/defaultArea/dashboard/invoices-trend-by-date': {
			get: {
				summary: 'Invoices Trend by Date',
				description: 'Monthly trend of total invoice amounts',
				tags: ['DefaultArea - Dashboard'],
				security: [{ bearerAuth: [] }],
				responses: {
					'200': {
						description: 'Successfully retrieved invoices trend by date',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									example: { "data": [{ "name": "Item 1", "value": 100 }, { "name": "Item 2", "value": 200 }] }
								}
							}
						}
					},
					'401': {
						description: 'Unauthorized - Invalid or missing authentication token'
					},
					'403': {
						description: 'Forbidden - Insufficient permissions'
					},
					'500': {
						description: 'Internal server error'
					}
				}
			}
		},
		'/api/defaultArea/dashboard/payments-by-method': {
			get: {
				summary: 'Payments by Method',
				description: 'Distribution of payments across different methods',
				tags: ['DefaultArea - Dashboard'],
				security: [{ bearerAuth: [] }],
				responses: {
					'200': {
						description: 'Successfully retrieved payments by method',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									example: { "data": [{ "name": "Item 1", "value": 100 }, { "name": "Item 2", "value": 200 }] }
								}
							}
						}
					},
					'401': {
						description: 'Unauthorized - Invalid or missing authentication token'
					},
					'403': {
						description: 'Forbidden - Insufficient permissions'
					},
					'500': {
						description: 'Internal server error'
					}
				}
			}
		}
	},
	components: {
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT'
			}
		}
	}
};

export default defaultAreaDashboardSwagger;