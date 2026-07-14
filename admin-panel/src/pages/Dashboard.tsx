import React from 'react';
import { Card, Row, Col, Statistic, Table, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { UserOutlined, ShoppingCartOutlined, DollarOutlined, RiseOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();

  const data = [
    { name: 'Jan', sales: 4000, customers: 2400 },
    { name: 'Feb', sales: 3000, customers: 1398 },
    { name: 'Mar', sales: 2000, customers: 9800 },
    { name: 'Apr', sales: 2780, customers: 3908 },
    { name: 'May', sales: 1890, customers: 4800 },
    { name: 'Jun', sales: 2390, customers: 3800 }
  ];

  const recentShipments = [
    { id: 1, trackingId: 'GC-001', customer: 'عالم الخيرية', status: 'In Transit', date: '2024-01-10' },
    { id: 2, trackingId: 'GC-002', customer: 'محمد علي', status: 'Delivered', date: '2024-01-09' },
    { id: 3, trackingId: 'GC-003', customer: 'فاطمة أحمد', status: 'Pending', date: '2024-01-08' }
  ];

  return (
    <div>
      <h1>{t('welcome')} 👋</h1>
      
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t('totalCustomers')}
              value={226}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t('activeShipments')}
              value={45}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t('monthlyRevenue')}
              value={12580}
              prefix={<DollarOutlined />}
              suffix="$"
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t('growth')}
              value={23.5}
              prefix={<RiseOutlined />}
              suffix="%"
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginBottom: 24 }}>
        <h2>Sales Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            <Line type="monotone" dataKey="customers" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <h2>Recent Shipments</h2>
        <Table
          columns={[
            { title: 'Tracking ID', dataIndex: 'trackingId', key: 'trackingId' },
            { title: 'Customer', dataIndex: 'customer', key: 'customer' },
            { title: 'Status', dataIndex: 'status', key: 'status' },
            { title: 'Date', dataIndex: 'date', key: 'date' }
          ]}
          dataSource={recentShipments}
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default Dashboard;