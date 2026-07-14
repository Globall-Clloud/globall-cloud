import React from 'react';
import { Table, Card, Tag } from 'antd';
import { useTranslation } from 'react-i18next';

const Payments = () => {
  const { t } = useTranslation();
  const payments = [
    { id: 1, code: 'PAY-001', customer: 'عالم الخيرية', amount: '$150', method: 'FIB', status: 'paid' },
    { id: 2, code: 'PAY-002', customer: 'محمد علي', amount: '$200', method: 'QI Card', status: 'pending' },
    { id: 3, code: 'PAY-003', customer: 'فاطمة أحمد', amount: '$120', method: 'Cash', status: 'paid' }
  ];

  const columns = [
    { title: 'Payment Code', dataIndex: 'code', key: 'code' },
    { title: 'Customer', dataIndex: 'customer', key: 'customer' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: 'Method', dataIndex: 'method', key: 'method' },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'paid' ? 'green' : 'orange'}>{status}</Tag>
      )
    }
  ];

  return (
    <Card title={`💰 ${t('payments')}`}>
      <Table columns={columns} dataSource={payments} rowKey="id" />
    </Card>
  );
};

export default Payments;