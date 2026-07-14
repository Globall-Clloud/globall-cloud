import React, { useState } from 'react';
import { Table, Button, Space, Tag, Input, Card, Modal, Form, message } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const Customers = () => {
  const { t } = useTranslation();
  const [customers, setCustomers] = useState([
    { id: 1, code: 'GC-001', name: 'عالم الخيرية', phone: '+9647500000001', email: 'contact@alam.com', location: 'Baghdad', status: 'active' },
    { id: 2, code: 'GC-002', name: 'محمد علي', phone: '+9647500000002', email: 'mohammad@example.com', location: 'Erbil', status: 'active' },
    { id: 3, code: 'GC-003', name: 'فاطمة أحمد', phone: '+9647500000003', email: 'fatima@example.com', location: 'Sulaymaniyah', status: 'inactive' }
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    { title: t('customers'), dataIndex: 'code', key: 'code', width: 120 },
    { title: t('name'), dataIndex: 'name', key: 'name' },
    { title: t('phone'), dataIndex: 'phone', key: 'phone' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: t('location'), dataIndex: 'location', key: 'location' },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? 'Active' : 'Inactive'}
        </Tag>
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

  const handleAddCustomer = () => {
    form.validateFields().then(values => {
      message.success('Customer added successfully!');
      setModalVisible(false);
      form.resetFields();
    });
  };

  return (
    <Card
      title={`👥 ${t('customers')}`}
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
          {t('addCustomer')}
        </Button>
      }
    >
      <Input
        placeholder={t('searchPlaceholder')}
        prefix={<SearchOutlined />}
        style={{ marginBottom: 16, width: 300 }}
      />
      <Table columns={columns} dataSource={customers} rowKey="id" />

      <Modal
        title={t('addCustomer')}
        open={modalVisible}
        onOk={handleAddCustomer}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item label={t('name')} name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label={t('phone')} name="phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label={t('email')} name="email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label={t('location')} name="location" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Customers;