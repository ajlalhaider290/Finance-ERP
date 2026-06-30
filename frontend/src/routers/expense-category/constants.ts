/**
 * ExpenseCategory Module Constants
 *
 * Centralized constants for the expenseCategory module to avoid magic strings
 * and make refactoring easier.
 */

export const EXPENSE_CATEGORY_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'expenseCategory',
  ENTITY_NAME: 'ExpenseCategory',
  ENTITY_NAME_PLURAL: 'ExpenseCategorys',
  LABEL_FIELD: 'expenseCategoryLabel',

  // Table configuration
  TABLE_CONFIG_KEY: 'expenseCategoryTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'categoryId',
  PRIMARY_KEYS: ['categoryId'],

  // Field names
  FIELDS: {
    CATEGORYID: 'categoryId',
    CATEGORYNAME: 'categoryName',
    DESCRIPTION: 'description',
    ENTITYID: 'entityId',
    CREATEDAT: 'createdAt',
    UPDATEDAT: 'updatedAt'
  },

  // Routes
  ROUTES: {
    LIST: '/expense-categories',    CREATE: '/expense-categories/create',
    EDIT: '/expense-categories/edit',
    VIEW: '/expense-categories/view'
  },

  // React Query keys
  QUERY_KEY: 'expenseCategory',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'expenseCategory',
    ACTIONS: {
      CREATE: 'add' as const,
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default EXPENSE_CATEGORY_CONSTANTS;