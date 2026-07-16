import React from 'react';
import { Card, Col, Progress, Row, Space, Statistic, Table, Tag, Typography } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { CheckCircleOutlined, ClockCircleOutlined, DollarOutlined, EnvironmentOutlined, RiseOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Text, Title } = Typography;

const Dashboard = () => {
  const { t } = useTranslation();

  const chartData = [
    { name: 'Jan', sales: 4000, customers: 2400, packages: 320 },
    { name: 'Feb', sales: 3000, customers: 1398, packages: 280 },
    { name: 'Mar', sales: 5200, customers: 4200, packages: 510 },
    { name: 'Apr', sales: 4780, customers: 3908, packages: 470 },
    { name: 'May', sales: 6890, customers: 4800, packages: 660 },
    { name: 'Jun', sales: 7390, customers: 5800, packages: 720 }
  ];

  const recentShipments = [
    { id: 1, trackingId: 'GC-001', customer: 'عالم الخيرية', status: 'In Transit', date: '2024-01-10', city: 'Baghdad' },
    { id: 2, trackingId: 'GC-002', customer: 'محمد علي', status: 'Delivered', date: '2024-01-09', city: 'Erbil' },
    { id: 3, trackingId: 'GC-003', customer: 'فاطمة أحمد', status: 'Pending', date: '2024-01-08', city: 'Sulaymaniyah' }
  ];

  const kpis = [
    { title: 'Total Packages', value: 1284, icon: <ShoppingCartOutlined />, color: '#1267a8', trend: '+18%' },
    { title: 'Delivered', value: 936, icon: <CheckCircleOutlined />, color: '#19a15f', trend: '+12%' },
    { title: 'In Transit', value: 248, icon: <ClockCircleOutlined />, color: '#ff8a3d', trend: '+9%' },
    { title: t('monthlyRevenue'), value: 12580, icon: <DollarOutlined />, color: '#6f55ff', trend: '+23.5%' }
  ];

  return (
    <div className="page-enter">
      <Card className="premium-hero dashboard-hero" bordered={false}>
        <div>
          <Text className="page-eyebrow">Global Cloud command center</Text>
          <Title level={2}>{t('welcome')} — سەرۆک</Title>
          <Text>Premium logistics dashboard for packages, delivery, warehouse, finance, QR, and cloud sync.</Text>
        </div>
        <div className="hero-live-map">
          <EnvironmentOutlined />
          <span>Live Tracking Map</span>
          <i className="map-pulse" />
        </div>
      </Card>

      <Row gutter={[18, 18]}>
        {kpis.map(kpi => (
          <Col xs={24} sm={12} xl={6} key={kpi.title}>
            <Card className="modern-stat-card">
              <div className="modern-stat-icon" style={{ background: kpi.color }}>{kpi.icon}</div>
              <Statistic title={kpi.title} value={kpi.value} prefix={kpi.title === t('monthlyRevenue') ? '$' : undefined} />
              <Tag color="green" icon={<RiseOutlined />}>{kpi.trend}</Tag>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[18, 18]} style={{ marginTop: 18 }}>
        <Col xs={24} xl={15}>
          <Card title="Revenue and package growth" className="chart-card">
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#1267a8" strokeWidth={3} />
                <Line type="monotone" dataKey="packages" stroke="#ff8a3d" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} xl={9}>
          <Card title="Delivery performance" className="chart-card">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData.slice(-4)}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Bar dataKey="packages" fill="#54c8f1" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text strong>Delivered today</Text>
              <Progress percent={82} strokeColor="#19a15f" />
              <Text strong>In transit SLA</Text>
              <Progress percent={74} strokeColor="#ff8a3d" />
            </Space>
          </Card>
        </Col>
      </Row>

      <Card title="Recent shipments" style={{ marginTop: 18 }}>
        <Table
          columns={[
            { title: 'Tracking ID', dataIndex: 'trackingId', key: 'trackingId' },
            { title: 'Customer', dataIndex: 'customer', key: 'customer' },
            { title: 'City', dataIndex: 'city', key: 'city' },
            { title: 'Status', dataIndex: 'status', key: 'status', render: (status: string) => <Tag color={status === 'Delivered' ? 'green' : status === 'In Transit' ? 'blue' : 'orange'}>{status}</Tag> },
            { title: 'Date', dataIndex: 'date', key: 'date' }
          ]}
          dataSource={recentShipments}
          pagination={false}
          rowKey="id"
        />
      </Card>
    </div>
  );
};

export default Dashboard;
