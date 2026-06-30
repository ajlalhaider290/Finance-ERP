import { SwaggerDefinition } from 'swagger-jsdoc';

const userAuthSwagger: SwaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'User Authentication API',
		version: '1.0.0',
		description: 'Authentication API documentation for users.',
	},
	paths: {
		'/users-auth/login': {
			post: {
				summary: 'User login',
				description: 'Authenticate user and receive access token',
				tags: ['Authentication Users'],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/LoginRequest' }
						}
					}
				},
				responses: {
					200: {
						description: 'Login successful',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/UserLoginResponse' }
							}
						}
					},
					401: {
						description: 'Invalid credentials',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/AuthErrorResponse' }
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
					}
				}
			},
		},
		'/users-auth/register': {
			post: {
				summary: 'User registration',
				description: 'Register a new user account',
				tags: ['Authentication Users'],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/RegisterRequest' }
						}
					}
				},
				responses: {
					201: {
						description: 'Registration successful',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/UserRegisterResponse' }
							}
						}
					},
					400: {
						description: 'Bad request - Invalid input data or user already exists',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ValidationErrorResponse' }
							}
						}
					},
					409: {
						description: 'Conflict - User already exists',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/AuthErrorResponse' }
							}
						}
					}
				}
			},
		},
		'/users-auth/profile': {
			get: {
				summary: 'Get user profile',
				description: 'Retrieve current user profile information',
				tags: ['Authentication Users'],
				security: [{ bearerAuth: [] }],
				responses: {
					200: {
						description: 'Profile retrieved successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/UserProfileResponse' }
							}
						}
					},
					401: {
						description: 'Unauthorized - Invalid or missing token',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/AuthErrorResponse' }
							}
						}
					}
				}
			},
			put: {
				summary: 'Update user profile',
				description: 'Update current user profile information',
				tags: ['Authentication Users'],
				security: [{ bearerAuth: [] }],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/ProfileUpdateRequest' }
						}
					}
				},
				responses: {
					200: {
						description: 'Profile updated successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ProfileUpdateResponse' }
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
								schema: { $ref: '#/components/schemas/AuthErrorResponse' }
							}
						}
					}
				}
			},
		},
		'/users-auth/forgot-password': {
		post: {
			summary: 'Send password reset email',
			description: 'Send password reset email to user',
			tags: ['Authentication Users'],
			requestBody: {
				required: true,
				content: {
					'application/json': {
						schema: { $ref: '#/components/schemas/ForgotPasswordRequest' }
					}
				}
			},
			responses: {
				200: {
					description: 'Password reset email sent successfully',
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/UserForgotPasswordResponse' }
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
					description: 'User not found',
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/AuthErrorResponse' }
						}
					}
				},
				500: {
					description: 'Internal server error - Failed to send email',
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/AuthErrorResponse' }
						}
					}
				}
			}
		},		},
		'/users-auth/reset-password': {
		post: {
			summary: 'Reset user password',
			description: 'Reset user password with token',
			tags: ['Authentication Users'],
			requestBody: {
				required: true,
				content: {
					'application/json': {
						schema: { $ref: '#/components/schemas/ResetPasswordRequest' }
					}
				}
			},
			responses: {
				200: {
					description: 'Password reset successful',
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/UserResetPasswordResponse' }
						}
					}
				},
				400: {
					description: 'Bad request - Invalid or expired token',
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/ValidationErrorResponse' }
						}
					}
				},
				404: {
					description: 'User not found',
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/AuthErrorResponse' }
						}
					}
				},
				500: {
					description: 'Internal server error - Failed to reset password',
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/AuthErrorResponse' }
						}
					}
				}
			}
		},		},
		'/users-auth/change-password': {
			put: {
				summary: 'Change user password',
				description: 'Change user password with current password verification (uses userId from token)',
				tags: ['Authentication Users'],
				security: [{ bearerAuth: [] }],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/ChangePasswordRequest' }
						}
					}
				},
				responses: {
					200: {
						description: 'Password changed successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/ChangePasswordResponse' }
							}
						}
					},
					400: {
						description: 'Bad request - Invalid input data or current password incorrect',
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
								schema: { $ref: '#/components/schemas/AuthErrorResponse' }
							}
						}
					},
					404: {
						description: 'User not found',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/AuthErrorResponse' }
							}
						}
					},
					500: {
						description: 'Internal server error - Failed to change password',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/AuthErrorResponse' }
							}
						}
					}
				}
			}
		},
		'/users-auth/refresh-token': {
			post: {
				summary: 'Refresh access token',
				description: 'Refresh the access token using a valid refresh token',
				tags: ['Authentication Users'],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: { $ref: '#/components/schemas/RefreshTokenRequest' }
						}
					}
				},
				responses: {
					200: {
						description: 'Token refreshed successfully',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/UserRefreshTokenResponse' }
							}
						}
					},
					401: {
						description: 'Unauthorized - Invalid or expired refresh token',
						content: {
							'application/json': {
								schema: { $ref: '#/components/schemas/AuthErrorResponse' }
							}
						}
					}
				}
			},
		},
	},
	components: {
		schemas: {
			LoginRequest: {
				type: 'object',
				required: ['email', 'password'],
				properties: {
					email: {
						type: 'string',
						format: 'email',
						example: 'email'
					},
					password: {
						type: 'string',
						format: 'password',
						example: 'password'
					}
				}
			},
			RegisterRequest: {
				type: 'object',
				properties: {
					email: {
						type: 'string',
						format: 'email',
						example: 'user@example.com'
					},
					username: {
						type: 'string',
						example: 'username value'
					},
					password: {
						type: 'string',
						example: 'password value'
					},
					role: {
						type: 'string',
						example: 'role value'
					},
					department: {
						type: 'string',
						example: 'department value'
					},
					entityId: {
						type: 'string',
						example: 'entityId value'
					},
				},
				required: ['email', 'username', 'password', 'role'],
			},
			ProfileUpdateRequest: {
				type: 'object',
				properties: {
					email: {
						type: 'string',
						format: 'email',
						example: 'user@example.com'
					},
					username: {
						type: 'string',
						example: 'username value'
					},
					role: {
						type: 'string',
						example: 'role value'
					},
					department: {
						type: 'string',
						example: 'department value'
					},
					entityId: {
						type: 'string',
						example: 'entityId value'
					},
				}
			},
			ForgotPasswordRequest: {
				type: 'object',
				required: ['email'],
				properties: {
					email: {
						type: 'string',
						format: 'email',
						example: 'user@example.com'
					}
				}
			},
			ResetPasswordRequest: {
				type: 'object',
				required: ['token', 'newPassword'],
				properties: {
					token: {
						type: 'string',
						example: 'abc123def456'
					},
					newPassword: {
						type: 'string',
						minLength: 8,
						example: 'newSecurePassword123'
					}
				}
			},
			ChangePasswordRequest: {
				type: 'object',
				required: ['currentPassword', 'newPassword'],
				properties: {
					currentPassword: {
						type: 'string',
						format: 'password',
						example: 'currentPassword123'
					},
					newPassword: {
						type: 'string',
						minLength: 8,
						example: 'newSecurePassword123'
					}
				}
			},
			RefreshTokenRequest: {
				type: 'object',
				required: ['refreshToken'],
				properties: {
					refreshToken: {
						type: 'string',
						description: 'Refresh token',
						example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
					}
				}
			},
			UserLoginResponse: {
				type: 'object',
				properties: {
					message: {
						type: 'string',
						example: 'user logged in successfully.'
					},
					user: {
						type: 'object',
						properties: {
							userId: {
								type: 'string',
								example: 'userId value'
							},
							email: {
								type: 'string',
								format: 'email',
								example: 'user@example.com'
							},
							username: {
								type: 'string',
								example: 'username value'
							},
							role: {
								type: 'string',
								example: 'role value'
							},
							department: {
								type: 'string',
								example: 'department value'
							},
							entityId: {
								type: 'string',
								example: 'entityId value'
							},
							createdAt: {
								type: 'string',
								example: 'createdAt value'
							},
							updatedAt: {
								type: 'string',
								example: 'updatedAt value'
							},
							scope: {
								type: 'object',
								description: 'User permissions and scope'
							}
						}
					},
					token: {
						type: 'string',
						example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
					}
				}
			},
			UserRegisterResponse: {
				type: 'object',
				properties: {
					message: {
						type: 'string',
						example: 'user has been created successfully.'
					},
					user: {
						type: 'object',
						properties: {
							userId: {
								type: 'string',
								example: 'userId value'
							},
							email: {
								type: 'string',
								format: 'email',
								example: 'user@example.com'
							},
							username: {
								type: 'string',
								example: 'username value'
							},
							role: {
								type: 'string',
								example: 'role value'
							},
							department: {
								type: 'string',
								example: 'department value'
							},
							entityId: {
								type: 'string',
								example: 'entityId value'
							},
							createdAt: {
								type: 'string',
								example: 'createdAt value'
							},
							updatedAt: {
								type: 'string',
								example: 'updatedAt value'
							},
							scope: {
								type: 'object',
								description: 'User permissions and scope'
							}
						}
					},
					token: {
						type: 'string',
						example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
					},
					statusCode: {
						type: 'integer',
						example: 201
					}
				}
			},
			UserProfileResponse: {
				type: 'object',
				properties: {
					userId: {
						type: 'string',
						example: 'userId value'
					},
					email: {
						type: 'string',
						format: 'email',
						example: 'user@example.com'
					},
					username: {
						type: 'string',
						example: 'username value'
					},
					role: {
						type: 'string',
						example: 'role value'
					},
					department: {
						type: 'string',
						example: 'department value'
					},
					entityId: {
						type: 'string',
						example: 'entityId value'
					},
					createdAt: {
						type: 'string',
						example: 'createdAt value'
					},
					updatedAt: {
						type: 'string',
						example: 'updatedAt value'
					},
				}
			},
			ProfileUpdateResponse: {
				type: 'object',
				properties: {
					message: {
						type: 'string',
						example: 'Profile updated successfully'
					}
				}
			},
			UserForgotPasswordResponse: {
				type: 'object',
				properties: {
					message: {
						type: 'string',
						example: 'Password reset email sent successfully'
					}
				}
			},
			UserResetPasswordResponse: {
				type: 'object',
				properties: {
					message: {
						type: 'string',
						example: 'Password reset successfully'
					}
				}
			},
			UserChangePasswordResponse: {
				type: 'object',
				properties: {
					message: {
						type: 'string',
						example: 'Password changed successfully'
					}
				}
			},
			FileUploadResponse: {
				type: 'object',
				properties: {
					message: {
						type: 'string',
						example: 'Profile updated successfully'
					},
					fileName: {
						type: 'string',
						example: 'profile-picture.jpg'
					},
					fileUrl: {
						type: 'string',
						example: '/uploads/profile-picture.jpg'
					}
				}
			},
			UserRefreshTokenResponse: {
				type: 'object',
				properties: {
					message: {
						type: 'string',
						example: 'Token refreshed successfully'
					},
					token: {
						type: 'string',
						example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
					}
				}
			},
			AuthErrorResponse: {
				type: 'object',
				properties: {
					message: {
						type: 'string',
						example: 'Authentication failed'
					},
					error: {
						type: 'string',
						example: 'Invalid credentials'
					}
				}
			},
			ValidationErrorResponse: {
				type: 'object',
				properties: {
					message: {
						type: 'string',
						example: 'Validation failed'
					},
					errors: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								field: {
									type: 'string',
									example: 'email'
								},
								message: {
									type: 'string',
									example: 'Invalid email format'
								}
							}
						}
					}
				}
			},
		},
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT'
			}
		}
	},
};

export default userAuthSwagger;
