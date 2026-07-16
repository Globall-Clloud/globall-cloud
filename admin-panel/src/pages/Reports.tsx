import React from 'react';
import { Card, Row, Col, Button, Select, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const Reports = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Card title={`📈 ${t('reports')}`}>
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12}>
            <Select placeholder="Select Report Type" style={{ width: '100%' }}>
              <Select.Option value="daily">Daily Report</Select.Option>
              <Select.Option value="monthly">Monthly Report</Select.Option>
              <Select.Option value="annual">Annual Report</Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={12}>
            <Button type="primary" icon={<DownloadOutlined />} block onClick={() => message.success('Report export prepared')}>
              Export as PDF
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Reports;