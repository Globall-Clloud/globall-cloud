import React from 'react';
import { Button, Card, Col, Row, Space, Tag, Typography } from 'antd';
import { AimOutlined, ArrowRightOutlined, BarcodeOutlined, CheckCircleOutlined, CloudSyncOutlined, CustomerServiceOutlined, GlobalOutlined, SafetyCertificateOutlined, TruckOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Text, Title, Paragraph } = Typography;

const services = [
  { icon: <TruckOutlined />, title: 'Air, sea, and land shipping', text: 'Manage pickup, warehouse, routes, customs, and delivery from one control center.' },
  { icon: <AimOutlined />, title: 'Live tracking', text: 'Customer-friendly shipment tracking with timeline, status, branch, and courier visibility.' },
  { icon: <BarcodeOutlined />, title: 'QR and barcode operations', text: 'Create parcel labels, scan packages, export invoices, and reduce manual entry.' },
  { icon: <CloudSyncOutlined />, title: 'Cloud-ready admin system', text: 'Built for Vercel deployment, analytics, fast global delivery, and future Firebase sync.' }
];

const stats = [
  { value: '24/7', label: 'Operations visibility' },
  { value: '3', label: 'Languages: Kurdish, Arabic, English' },
  { value: '100%', label: 'Responsive dashboard' }
];

function Landing() {
  const navigate = useNavigate();

  return (
    <main className="landing-page">
      <section className="landing-hero">
        <div className="landing-nav">
          <div className="landing-brand">
            <img src="/global-cloud-logo.svg" alt="Globall Cloud" />
            <div>
              <strong>Globall Cloud</strong>
              <span>الفيوم العالمية</span>
            </div>
          </div>
          <Space wrap>
            <Button type="text" onClick={() => navigate('/tracking')}>Track shipment</Button>
            <Button type="primary" onClick={() => navigate('/login')}>Admin login</Button>
          </Space>
        </div>

        <Row gutter={[32, 32]} align="middle" className="landing-hero-grid">
          <Col xs={24} lg={13}>
            <Space direction="vertical" size={22}>
              <Tag color="blue" className="landing-kicker"><GlobalOutlined /> Premium logistics platform</Tag>
              <div>
                <Title className="landing-title">A complete digital logistics website for Globall Cloud</Title>
                <Paragraph className="landing-subtitle">
                  Customer-facing landing page, shipment tracking entry points, pricing, and a secure operations dashboard for parcels, customers, warehouse, finance, reports, and staff.
                </Paragraph>
              </div>
              <Space size="middle" wrap>
                <Button type="primary" size="large" onClick={() => navigate('/tracking')} icon={<AimOutlined />}>
                  Track a shipment
                </Button>
                <Button size="large" onClick={() => navigate('/login')} icon={<ArrowRightOutlined />}>
                  Open dashboard
                </Button>
              </Space>
              <div className="landing-trust-row">
                <span><CheckCircleOutlined /> Vercel-ready</span>
                <span><SafetyCertificateOutlined /> Admin workspace</span>
                <span><CustomerServiceOutlined /> WhatsApp support</span>
              </div>
            </Space>
          </Col>
          <Col xs={24} lg={11}>
            <Card className="landing-preview-card" bordered={false}>
              <div className="preview-map">
                <i className="route-line" />
                <span className="hub hub-erbil">Erbil</span>
                <span className="hub hub-baghdad">Baghdad</span>
                <span className="hub hub-basra">Basra</span>
                <div className="preview-truck"><TruckOutlined /></div>
              </div>
              <div className="preview-panel">
                <Text className="page-eyebrow">Live route</Text>
                <Title level={4}>GC-2048 is in transit</Title>
                <Text>Airport warehouse → customer delivery</Text>
              </div>
            </Card>
          </Col>
        </Row>
      </section>

      <section className="landing-section">
        <Row gutter={[18, 18]}>
          {stats.map(stat => (
            <Col xs={24} md={8} key={stat.label}>
              <Card className="landing-stat-card" bordered={false}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section className="landing-section">
        <div className="section-heading">
          <Text className="page-eyebrow">Platform modules</Text>
          <Title level={2}>Everything needed to run the shipping business</Title>
        </div>
        <Row gutter={[18, 18]}>
          {services.map(service => (
            <Col xs={24} md={12} xl={6} key={service.title}>
              <Card className="service-card" bordered={false}>
                <div className="service-icon">{service.icon}</div>
                <Title level={4}>{service.title}</Title>
                <Text>{service.text}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section className="landing-cta">
        <div>
          <Text className="page-eyebrow">Ready on Vercel</Text>
          <Title level={2}>Deploy, connect your domain, and start receiving customers.</Title>
          <Paragraph>Web Analytics and Speed Insights are wired so traffic and performance are visible after deployment.</Paragraph>
        </div>
        <Button type="primary" size="large" onClick={() => navigate('/login')}>Manage the business</Button>
      </section>
    </main>
  );
}

export default Landing;
