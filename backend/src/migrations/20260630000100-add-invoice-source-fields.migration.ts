import { DataTypes } from 'sequelize';
import type { MigrationContext } from './umzug';

export async function up({ context: queryInterface }: MigrationContext): Promise<void> {
  await queryInterface.addColumn('invoices', 'source_type', {
    type: DataTypes.STRING,
    allowNull: true,
  });

  await queryInterface.addColumn('invoices', 'source_reimbursement_request_id', {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'reimbursement_requests',
      key: 'reimbursement_request_id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  });

  await queryInterface.addColumn('invoices', 'source_intercompany_transaction_id', {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'intercompany_transactions',
      key: 'transaction_id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  });

  await queryInterface.addIndex('invoices', ['source_type'], { name: 'invoices_sourcetype_idx' });
  await queryInterface.addIndex('invoices', ['source_reimbursement_request_id'], { name: 'invoices_sourcereimbursementrequestid_idx' });
  await queryInterface.addIndex('invoices', ['source_intercompany_transaction_id'], { name: 'invoices_sourceintercompanytransactionid_idx' });
}

export async function down({ context: queryInterface }: MigrationContext): Promise<void> {
  await queryInterface.removeIndex('invoices', 'invoices_sourceintercompanytransactionid_idx');
  await queryInterface.removeIndex('invoices', 'invoices_sourcereimbursementrequestid_idx');
  await queryInterface.removeIndex('invoices', 'invoices_sourcetype_idx');
  await queryInterface.removeColumn('invoices', 'source_intercompany_transaction_id');
  await queryInterface.removeColumn('invoices', 'source_reimbursement_request_id');
  await queryInterface.removeColumn('invoices', 'source_type');
}
