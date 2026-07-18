import React from 'react';
import { Button, Card, Col, Form, InputNumber, Row, Select, Statistic, Typography, message } from 'antd';
import { CalculatorOutlined, DollarOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const Pricing = () => {
  const [price, setPrice] = React.useState(0);
  const [form] = Form.useForm();

  const calculate = () => {
    const values = form.getFieldsValue();
    const weight = Number(values.weight || 1);
    const serviceMultiplier = values.service === 'Air Express' ? 7.5 : values.service === 'Door to Door' ? 5.5 : 3.2;
    const insurance = values.insurance ? 12 : 0;
    setPrice(Math.round(weight * serviceMultiplier + insurance));
    message.success('Price calculated');
  };

  return (
    <div className="page-enter">
      <Card className="premium-hero" bordered={false}>
        <div><Text className="page-eyebrow">Pricing engine</Text><Title level={2}>Shipping calculator</Title><Text>Weight, service, route, insurance, and cash-on-delivery ready.</Text></div>
      </Card>
      <Row gutter={[18, 18]}>
        <Col xs={24} lg={10}>
          <Card title="Calculate shipment price">
            <Form form={form} layout="vertical" initialValues={{ service: 'Air Express', weight: 1 }}>
              <Form.Item label="Weight (kg)" name="weight"><InputNumber min={0.1} style={{ width: '100%' }} /></Form.Item>
              <Form.Item label="Service" name="service"><Select options={[{ value: 'Air Express' }, { value: 'Cargo' }, { value: 'Door to Door' }]} /></Form.Item>
              <Form.Item label="Insurance" name="insurance"><Select options={[{ value: false, label: 'No' }, { value: true, label: 'Yes' }]} /></Form.Item>
              <Button type="primary" icon={<CalculatorOutlined />} block onClick={calculate}>Calculate</Button>
            </Form>
          </Card>
        </Col>
        <Col xs={24} lg={14}>
          <Card className="modern-stat-card price-result"><Statistic title="Estimated price" value={price} prefix={<DollarOutlined />} suffix="USD" /></Card>
        </Col>
      </Row>
    </div>
  );
};

export default Pricing;
