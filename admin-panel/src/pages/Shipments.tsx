import React from 'react';
import { Table, Card, Tag, Button, Space } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const Shipments = () => {
  const { t } = useTranslation();
  const shipments = [
    { id: 1, tracking: 'GC-001', customer: 'عالم الخيرية', origin: 'China', destination: 'Baghdad', weight: '25kg', status: 'in_transit', date: '2024-01-10' },
    { id: 2, tracking: 'GC-002', customer: 'محمد علي', origin: 'UAE', destination: 'Erbil', weight: '15kg', status: 'delivered', date: '2024-01-09' },
    { id: 3, tracking: 'GC-003', customer: 'فاطمة أحمد', origin: 'China', destination: 'Sulaymaniyah', weight: '30kg', status: 'pending', date: '2024-01-08' }
  ];

  const columns = [
    { title: 'Tracking', dataIndex: 'tracking', key: 'tracking' },
    { title: 'Customer', dataIndex: 'customer', key: 'customer' },
    { title: 'Origin', dataIndex: 'origin', key: 'origin' },
    { title: 'Destination', dataIndex: 'destination', key: 'destination' },
    { title: t('weight'), dataIndex: 'weight', key: 'weight' },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = { in_transit: 'blue', delivered: 'green', pending: 'orange' };
        return <Tag color={colors[status]}>{status}</Tag>;
      }
    },
    {
      title: t('action'),
      key: 'action',
      render: () => (
        <Space>
          <Button icon={<EyeOutlined />} size="small" />
          <Button icon={<EditOutlined />} type="primary" size="small" />
        </Space>
      )
    }
  ];

  return (
    <Card title={`📦 ${t('shipments')}`}>
      <Table columns={columns} dataSource={shipments} rowKey="id" />
    </Card>
  );
};

export default Shipments;