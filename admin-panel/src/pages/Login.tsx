import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, Alert, Select, Space } from 'antd';
import { UserOutlined, LockOutlined, GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

const { Title, Text } = Typography;

const Login = () => {
  const { t, i18n } = useTranslation();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFinish = async (values: { phone: string; password: string }) => {
    setError(null);
    setLoading(true);
    try {
      await login(values.phone, values.password);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        (err?.message === 'Network Error'
          ? t('networkError')
          : t('loginFailed'));
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #001529 0%, #003a70 100%)',
        padding: 16,
      }}
    >
      <Card
        style={{ width: '100%', maxWidth: 420, borderRadius: 12 }}
        styles={{ body: { padding: 32 } }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🌐</div>
          <Title level={3} style={{ margin: 0 }}>
            Globall Cloud
          </Title>
          <Text type="secondary">{t('loginSubtitle')}</Text>
        </div>

        {error && (
          <Alert
            type="error"
            message={error}
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        <Form layout="vertical" onFinish={onFinish} requiredMark={false} size="large">
          <Form.Item
            label={t('phone')}
            name="phone"
            rules={[{ required: true, message: t('phoneRequired') }]}
          >
            <Input prefix={<UserOutlined />} placeholder="0750 000 0000" />
          </Form.Item>

          <Form.Item
            label={t('password')}
            name="password"
            rules={[{ required: true, message: t('passwordRequired') }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="••••••••" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 8 }}>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {t('loginButton')}
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <Space>
            <GlobalOutlined />
            <Select
              size="small"
              variant="borderless"
              value={i18n.language}
              onChange={(lang) => i18n.changeLanguage(lang)}
              options={[
                { value: 'ku', label: 'کوردی' },
                { value: 'ar', label: 'العربية' },
                { value: 'en', label: 'English' },
              ]}
            />
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default Login;
