import React from 'react';
import { Card, Form, Input, Select, Button, Switch, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleSave = () => {
    form.validateFields().then(() => {
      // Save settings
    });
  };

  return (
    <Card title={`⚙️ ${t('settings')}`}>
      <Form form={form} layout="vertical">
        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Form.Item label="Company Name" name="company" rules={[{ required: true }]}>
              <Input defaultValue="Globall Cloud" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input defaultValue="tamanblbas271@gmail.com" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
              <Input defaultValue="+964 750 000 0000" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Default Currency" name="currency">
              <Select>
                <Select.Option value="USD">USD</Select.Option>
                <Select.Option value="IQD">IQD</Select.Option>
                <Select.Option value="AED">AED</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24}>
            <Form.Item label="Enable SMS Notifications" name="smsNotifications" valuePropName="checked">
              <Switch defaultChecked />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24}>
            <Form.Item label="Enable Email Notifications" name="emailNotifications" valuePropName="checked">
              <Switch defaultChecked />
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" onClick={handleSave} size="large">
          Save Settings
        </Button>
      </Form>
    </Card>
  );
};

export default Settings;