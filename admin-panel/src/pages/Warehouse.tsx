import React from 'react';
import { Card, Table } from 'antd';
import { useTranslation } from 'react-i18next';

const Warehouse = () => {
  const { t } = useTranslation();
  const warehouses = [
    { id: 1, name: 'Erbil Warehouse', location: 'Erbil', capacity: '1000 items', used: '750 items' },
    { id: 2, name: 'China Hub', location: 'Shanghai', capacity: '5000 items', used: '3200 items' },
    { id: 3, name: 'Dubai Center', location: 'Dubai', capacity: '2000 items', used: '1500 items' }
  ];

  const columns = [
    { title: 'Warehouse', dataIndex: 'name', key: 'name' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'Capacity', dataIndex: 'capacity', key: 'capacity' },
    { title: 'Used', dataIndex: 'used', key: 'used' }
  ];

  return (
    <Card title={`🏢 ${t('warehouse')}`}>
      <Table columns={columns} dataSource={warehouses} rowKey="id" />
    </Card>
  );
};

export default Warehouse;