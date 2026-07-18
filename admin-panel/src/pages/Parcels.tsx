import React from 'react';
import { Button, Card, Col, Form, Input, Row, Select, Space, Statistic, Steps, Table, Tag, Typography, message } from 'antd';
import { BarcodeOutlined, CarOutlined, CheckCircleOutlined, InboxOutlined, PlusOutlined, QrcodeOutlined, ScanOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const parcels = [
  { id: 1, code: 'GCX-10021', customer: 'Ali Hassan', origin: 'Guangzhou', destination: 'Erbil', weight: '3.4kg', service: 'Air Express', status: 'In Transit' },
  { id: 2, code: 'GCX-10022', customer: 'Zana Market', origin: 'Dubai', destination: 'Baghdad', weight: '12kg', service: 'Cargo', status: 'Customs' },
  { id: 3, code: 'GCX-10023', customer: 'Nawroz Co.', origin: 'Istanbul', destination: 'Sulaymaniyah', weight: '1.2kg', service: 'Door to Door', status: 'Delivered' }
];

const Parcels = () => {
  const [form] = Form.useForm();

  const createParcel = () => {
    form.validateFields().then(() => {
      message.success('Parcel created and QR label prepared');
      form.resetFields();
    });
  };

  return (
    <div className="page-enter">
      <Card className="premium-hero" bordered={false}>
        <div>
          <Text className="page-eyebrow">Parcel operating system</Text>
          <Title level={2}>Parcels, QR labels, barcode scanning</Title>
          <Text>Aramex-style workflow for receiving, weighing, routing, tracking, and delivering packages.</Text>
        </div>
        <Space wrap>
          <Button type="primary" icon={<PlusOutlined />} onClick={createParcel}>Create Parcel</Button>
          <Button icon={<QrcodeOutlined />} onClick={() => message.success('QR label preview ready')}>QR Label</Button>
          <Button icon={<ScanOutlined />} onClick={() => message.info('Scanner module ready for camera integration')}>Scan</Button>
        </Space>
      </Card>

      <Row gutter={[18, 18]}>
        <Col xs={24} lg={8}><Card className="modern-stat-card"><Statistic title="Received Today" value={84} prefix={<InboxOutlined />} /></Card></Col>
        <Col xs={24} lg={8}><Card className="modern-stat-card"><Statistic title="Out for Delivery" value={37} prefix={<CarOutlined />} /></Card></Col>
        <Col xs={24} lg={8}><Card className="modern-stat-card"><Statistic title="Delivered" value={1290} prefix={<CheckCircleOutlined />} /></Card></Col>
      </Row>

      <Row gutter={[18, 18]} style={{ marginTop: 18 }}>
        <Col xs={24} xl={8}>
          <Card title="New parcel intake">
            <Form form={form} layout="vertical">
              <Form.Item name="customer" label="Customer" rules={[{ required: true }]}><Input placeholder="Customer name" /></Form.Item>
              <Form.Item name="phone" label="Phone"><Input placeholder="+964..." /></Form.Item>
              <Form.Item name="origin" label="Origin" rules={[{ required: true }]}><Input placeholder="China / UAE / Turkey" /></Form.Item>
              <Form.Item name="destination" label="Destination" rules={[{ required: true }]}><Input placeholder="Erbil / Baghdad / Sulaymaniyah" /></Form.Item>
              <Form.Item name="service" label="Service"><Select defaultValue="Air Express" options={[{ value: 'Air Express' }, { value: 'Cargo' }, { value: 'Door to Door' }]} /></Form.Item>
              <Button type="primary" block icon={<BarcodeOutlined />} onClick={createParcel}>Save and print label</Button>
            </Form>
          </Card>
        </Col>
        <Col xs={24} xl={16}>
          <Card title="Parcel lifecycle">
            <Steps
              current={2}
              items={['Received', 'Measured', 'Customs', 'In Transit', 'Out for Delivery', 'Delivered'].map(title => ({ title }))}
            />
            <Table
              style={{ marginTop: 20 }}
              dataSource={parcels}
              rowKey="id"
              columns={[
                { title: 'Code', dataIndex: 'code' },
                { title: 'Customer', dataIndex: 'customer' },
                { title: 'Route', render: (_, row: any) => `${row.origin} → ${row.destination}` },
                { title: 'Weight', dataIndex: 'weight' },
                { title: 'Service', dataIndex: 'service' },
                { title: 'Status', dataIndex: 'status', render: (status: string) => <Tag color={status === 'Delivered' ? 'green' : status === 'Customs' ? 'orange' : 'blue'}>{status}</Tag> }
              ]}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Parcels;
