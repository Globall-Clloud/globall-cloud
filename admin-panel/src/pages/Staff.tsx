import React from 'react';
import { Card, Table, Tag, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const Staff = () => {
  const { t } = useTranslation();
  const staff = [
    { id: 1, name: 'أحمد محمد', position: 'Manager', branch: 'Erbil', role: 'MANAGER', status: 'active' },
    { id: 2, name: 'فاطمة علي', position: 'Warehouse Staff', branch: 'China', role: 'WAREHOUSE', status: 'active' },
    { id: 3, name: 'محمود حسن', position: 'Accountant', branch: 'Dubai', role: 'ACCOUNTANT', status: 'inactive' }
  ];

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Position', dataIndex: 'position', key: 'position' },
    { title: 'Branch', dataIndex: 'branch', key: 'branch' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>{status}</Tag>
      )
    },
    {
      title: t('action'),
      key: 'action',
      render: () => (
        <Space>
          <Button icon={<EditOutlined />} type="primary" size="small" />
          <Button icon={<DeleteOutlined />} danger size="small" />
        </Space>
      )
    }
  ];

  return (
    <Card title={`👨‍💼 ${t('staff')}`}>
      <Table columns={columns} dataSource={staff} rowKey="id" />
    </Card>
  );
};

export default Staff;