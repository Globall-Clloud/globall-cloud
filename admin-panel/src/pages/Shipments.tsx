import React from 'react';
import { Table, Card, Tag, Button, Space, Modal, Form, Input, message } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const Shipments = () => {
  const { t } = useTranslation();
  const [shipments, setShipments] = React.useState([
    { id: 1, tracking: 'GC-001', customer: 'عالم الخيرية', origin: 'China', destination: 'Baghdad', weight: '25kg', status: 'in_transit', date: '2024-01-10' },
    { id: 2, tracking: 'GC-002', customer: 'محمد علي', origin: 'UAE', destination: 'Erbil', weight: '15kg', status: 'delivered', date: '2024-01-09' },
    { id: 3, tracking: 'GC-003', customer: 'فاطمة أحمد', origin: 'China', destination: 'Sulaymaniyah', weight: '30kg', status: 'pending', date: '2024-01-08' }
  ]);
  const [selectedShipment, setSelectedShipment] = React.useState<any>(null);
  const [editOpen, setEditOpen] = React.useState(false);
  const [form] = Form.useForm();

  const openEdit = (shipment: any) => {
    setSelectedShipment(shipment);
    form.setFieldsValue(shipment);
    setEditOpen(true);
  };

  const saveShipment = () => {
    form.validateFields().then(values => {
      setShipments(shipments.map(shipment => shipment.id === selectedShipment.id ? { ...shipment, ...values } : shipment));
      setEditOpen(false);
      message.success('Shipment updated');
    });
  };

  const statusColors: Record<string, string> = { in_transit: 'blue', delivered: 'green', pending: 'orange' };

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
      render: (status: string) => <Tag color={statusColors[status] || 'default'}>{status}</Tag>
    },
    {
      title: t('action'),
      key: 'action',
      render: (_: unknown, record: any) => (
        <Space>
          <Button icon={<EyeOutlined />} size="small" onClick={() => Modal.info({ title: record.tracking, content: `${record.customer} • ${record.origin} to ${record.destination}` })} />
          <Button icon={<EditOutlined />} type="primary" size="small" onClick={() => openEdit(record)} />
        </Space>
      )
    }
  ];

  return (
    <Card title={`📦 ${t('shipments')}`}>
      <Table columns={columns} dataSource={shipments} rowKey="id" />
      <Modal title="Edit shipment" open={editOpen} onOk={saveShipment} onCancel={() => setEditOpen(false)}>
        <Form form={form} layout="vertical">
          <Form.Item label="Customer" name="customer" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Destination" name="destination" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label={t('weight')} name="weight" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Shipments;