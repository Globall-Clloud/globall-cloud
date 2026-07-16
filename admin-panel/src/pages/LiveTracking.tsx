import React from 'react';
import { Card, Col, Row, Space, Tag, Timeline, Typography } from 'antd';
import { AimOutlined, CarOutlined, EnvironmentOutlined, GlobalOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const LiveTracking = () => (
  <div className="page-enter">
    <Card className="premium-hero" bordered={false}>
      <div>
        <Text className="page-eyebrow">Live tracking center</Text>
        <Title level={2}>Map, courier movement, shipment timeline</Title>
        <Text>Professional tracking surface ready for Google Maps/Mapbox and courier GPS integration.</Text>
      </div>
      <Tag color="blue">Real-time ready</Tag>
    </Card>

    <Row gutter={[18, 18]}>
      <Col xs={24} xl={15}>
        <Card className="tracking-map-card">
          <div className="tracking-map-grid">
            <div className="map-route-line" />
            <div className="map-pin pin-origin"><GlobalOutlined /> Guangzhou</div>
            <div className="map-pin pin-hub"><EnvironmentOutlined /> Dubai Hub</div>
            <div className="map-pin pin-destination"><AimOutlined /> Erbil</div>
            <div className="courier-dot"><CarOutlined /></div>
          </div>
        </Card>
      </Col>
      <Col xs={24} xl={9}>
        <Card title="Shipment GCX-10021">
          <Space direction="vertical" size={14} style={{ width: '100%' }}>
            <Tag color="blue">In Transit</Tag>
            <Text strong>ETA: Today 18:30</Text>
            <Text type="secondary">Courier: Team Alpha • Vehicle: GC-ERB-04</Text>
            <Timeline
              items={[
                { color: 'green', children: 'Parcel received in Guangzhou' },
                { color: 'green', children: 'Departed international hub' },
                { color: 'blue', children: 'Arrived at Dubai transfer center' },
                { color: 'gray', children: 'Final mile delivery in Erbil' }
              ]}
            />
          </Space>
        </Card>
      </Col>
    </Row>
  </div>
);

export default LiveTracking;
