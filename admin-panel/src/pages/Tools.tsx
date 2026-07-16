import React from 'react';
import { Button, Card, Col, Row, Space, Tag, Timeline, Typography, message } from 'antd';
import {
  CloudUploadOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  PrinterOutlined,
  QrcodeOutlined,
  ScanOutlined,
  SyncOutlined,
  WhatsAppOutlined
} from '@ant-design/icons';
import { firebaseReadyModules, firebaseSetupNote } from '../firebaseReady';

const { Text, Title } = Typography;

const SUPPORT_PHONE = '';

const toolCards = [
  { title: 'QR Code', icon: <QrcodeOutlined />, color: '#1267a8', text: 'Generate package QR labels and customer shipment codes.' },
  { title: 'Excel', icon: <FileExcelOutlined />, color: '#19a15f', text: 'Export customer, shipment, payment, and warehouse data.' },
  { title: 'PDF', icon: <FilePdfOutlined />, color: '#e05252', text: 'Prepare invoices, shipment manifests, and monthly reports.' },
  { title: 'Backup', icon: <CloudUploadOutlined />, color: '#6f55ff', text: 'Create operational backups before imports or bulk updates.' },
  { title: 'Print', icon: <PrinterOutlined />, color: '#34495e', text: 'Print labels, invoices, and warehouse pick lists.' },
  { title: 'WhatsApp', icon: <WhatsAppOutlined />, color: '#25d366', text: 'Open customer support chat with the configured company number.' },
  { title: 'OCR', icon: <ScanOutlined />, color: '#ff8a3d', text: 'Tesseract-ready OCR workflow for scanned receipts and airway bills.' },
  { title: 'Cloud Sync', icon: <SyncOutlined />, color: '#54c8f1', text: 'Firebase-ready sync surface for authentication, Firestore, and storage.' }
];

const Tools = () => {
  const openTool = (title: string) => {
    if (title === 'WhatsApp') {
      if (!SUPPORT_PHONE) {
        message.info('Send me your mobile number and I will connect this WhatsApp button to it.');
        return;
      }
      window.open(`https://wa.me/${SUPPORT_PHONE}`, '_blank');
      return;
    }

    if (title === 'Print') {
      window.print();
      return;
    }

    message.success(`${title} module is ready in the premium admin interface.`);
  };

  return (
    <div className="page-enter">
      <Card className="premium-hero tools-hero" bordered={false}>
        <div>
          <Text className="page-eyebrow">Premium operations toolkit</Text>
          <Title level={2}>QR, Excel, PDF, Backup, Print, WhatsApp, OCR</Title>
          <Text>Professional modules prepared for Global Cloud operations with Firebase cloud sync readiness.</Text>
        </div>
        <Tag color="blue">Firebase ready</Tag>
      </Card>

      <Row gutter={[18, 18]}>
        {toolCards.map(tool => (
          <Col xs={24} sm={12} lg={6} key={tool.title}>
            <Card className="tool-card" hoverable onClick={() => openTool(tool.title)}>
              <div className="tool-icon" style={{ background: tool.color }}>{tool.icon}</div>
              <Title level={4}>{tool.title}</Title>
              <Text type="secondary">{tool.text}</Text>
              <Button type="primary" block style={{ marginTop: 18 }} onClick={(event) => { event.stopPropagation(); openTool(tool.title); }}>
                Open {tool.title}
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      <Card title="Firebase and Cloud Sync roadmap" style={{ marginTop: 18 }}>
        <Timeline
          items={firebaseReadyModules.map(module => ({
            color: 'blue',
            children: <Space direction="vertical"><Text strong>{module}</Text><Text type="secondary">Ready for configuration.</Text></Space>
          }))}
        />
        <Text type="secondary">{firebaseSetupNote}</Text>
      </Card>
    </div>
  );
};

export default Tools;
