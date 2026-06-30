import React from 'react'
import { CustomRoutes } from '@/interface/common'

export const publicRoutes:CustomRoutes[] = [
{
    key: 'userLogin',
    path: '/userLogin',
    component: React.lazy(() => import('@/routers/user-auth/login')),
  }, {
    key: 'userRegister',
    path: '/userRegister',
    component: React.lazy(() => import('@/routers/user-auth/register')),
  }]

export const defaultRoutes:CustomRoutes[] = [
{
			key: 'approval-history',
			path: '/approval-histories',
			component: React.lazy(() => import('@/routers/approval-history')),
		}, {
			key: 'approval-task',
			path: '/approval-tasks',
			component: React.lazy(() => import('@/routers/approval-task')),
		}, {
			key: 'company-entity',
			path: '/company-entities',
			component: React.lazy(() => import('@/routers/company-entity')),
		}, {
			key: 'customer',
			path: '/customers',
			component: React.lazy(() => import('@/routers/customer')),
		}, {
			key: 'expense-category',
			path: '/expense-categories',
			component: React.lazy(() => import('@/routers/expense-category')),
		}, {
			key: 'intercompany-settlement-record',
			path: '/intercompany-settlement-records',
			component: React.lazy(() => import('@/routers/intercompany-settlement-record')),
		}, {
			key: 'intercompany-transaction',
			path: '/intercompany-transactions',
			component: React.lazy(() => import('@/routers/intercompany-transaction')),
		}, {
			key: 'invoice-document',
			path: '/invoice-documents',
			component: React.lazy(() => import('@/routers/invoice-document')),
		}, {
			key: 'invoice-line-item',
			path: '/invoice-line-items',
			component: React.lazy(() => import('@/routers/invoice-line-item')),
		}, {
			key: 'invoice',
			path: '/invoices',
			component: React.lazy(() => import('@/routers/invoice')),
		}, {
			key: 'journal-entry',
			path: '/journal-entries',
			component: React.lazy(() => import('@/routers/journal-entry')),
		}, {
			key: 'journal-entry-line',
			path: '/journal-entry-lines',
			component: React.lazy(() => import('@/routers/journal-entry-line')),
		}, {
			key: 'payment-allocation',
			path: '/payment-allocations',
			component: React.lazy(() => import('@/routers/payment-allocation')),
		}, {
			key: 'payment',
			path: '/payments',
			component: React.lazy(() => import('@/routers/payment')),
		}, {
			key: 'reimbursement-document',
			path: '/reimbursement-documents',
			component: React.lazy(() => import('@/routers/reimbursement-document')),
		}, {
			key: 'reimbursement-request',
			path: '/reimbursement-requests',
			component: React.lazy(() => import('@/routers/reimbursement-request')),
		}, {
			key: 'reimbursement-status-history',
			path: '/reimbursement-status-histories',
			component: React.lazy(() => import('@/routers/reimbursement-status-history')),
		}, {
			key: 'tax-code',
			path: '/tax-codes',
			component: React.lazy(() => import('@/routers/tax-code')),
		}, {
			key: 'user',
			path: '/users',
			component: React.lazy(() => import('@/routers/user')),
		}, {
			key: 'vendor',
			path: '/vendors',
			component: React.lazy(() => import('@/routers/vendor')),
		}, {
										key: 'home',
										path: '/',
										component: React.lazy(() => import('@/routers/dashboard')),
									}, {
							key: 'userProfile',
							path: '/userProfile',
							component: React.lazy(() => import('@/routers/user-auth/profile')),
						}, {
							key: 'userProfileEdit',
							path: '/userProfile/edit',
							component: React.lazy(() => import('@/routers/user-auth/profile/edit')),
						}, {
							key: 'dashboard',
							path: '/dashboard',
							component: React.lazy(() => import('@/routers/dashboard')),			
						}]

export default defaultRoutes