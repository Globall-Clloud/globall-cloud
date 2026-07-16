import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Alert, Avatar, Badge, Button, Card, Dropdown, Form, Input, Layout, Menu, Space, Typography, message } from 'antd';
import {
  BellOutlined,
  DashboardOutlined,
  DollarOutlined,
  GlobalOutlined,
  HomeOutlined,
  LockOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  ShopOutlined,
  SolutionOutlined,
  TeamOutlined,
  UserOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Shipments from './pages/Shipments';
import Payments from './pages/Payments';
import Reports from './pages/Reports';
import Warehouse from './pages/Warehouse';
import Staff from './pages/Staff';
import Settings from './pages/Settings';
import './App.css';

const { Header, Sider, Content } = Layout;
const { Text, Title } = Typography;

type Session = {
  name: string;
  role: string;
};

const routeMap: Record<string, string> = {
  dashboard: '/dashboard',
  customers: '/customers',
  shipments: '/shipments',
  payments: '/payments',
  reports: '/reports',
  warehouse: '/warehouse',
  staff: '/staff',
  settings: '/settings'
};

function LoginScreen({ onLogin }: { onLogin: (session: Session) => void }) {
  const { i18n } = useTranslation();

  const handleLogin = (values: { username: string }) => {
    onLogin({ name: values.username || 'Global Cloud Admin', role: 'SUPER_ADMIN' });
    message.success('Logged in successfully');
  };

  return (
    <div className="login-shell">
      <div className="login-visual" aria-label="Global Cloud logistics branding">
        <div className="login-visual-overlay" />
        <div className="brand-mark">
          <div className="brand-orbit">
            <GlobalOutlined />
          </div>
          <div>
            <Text className="brand-eyebrow">Global Cloud</Text>
            <Title level={1}>الفيوم العالمية</Title>
            <Text className="brand-subtitle">Air, sea, and land logistics management</Text>
          </div>
        </div>
        <div className="logistics-scene">
          <div className="scene-plane" />
          <div className="scene-ship" />
          <div className="scene-truck" />
          <div className="scene-containers" />
        </div>
      </div>

      <div className="login-panel-wrap">
        <Card className="login-card" bordered={false}>
          <Space direction="vertical" size={18} style={{ width: '100%' }}>
            <div>
              <Text className="login-kicker">Secure admin portal</Text>
              <Title level={2}>Global Cloud Dashboard</Title>
              <Text type="secondary">Sign in to manage customers, shipments, payments, warehouses, and reports.</Text>
            </div>

            <Form layout="vertical" onFinish={handleLogin} initialValues={{ username: 'admin@globalcloud.iq' }}>
              <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Enter your username' }]}>
                <Input size="large" prefix={<UserOutlined />} placeholder="admin@globalcloud.iq" />
              </Form.Item>
              <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Enter your password' }]} initialValue="globalcloud">
                <Input.Password size="large" prefix={<LockOutlined />} placeholder="Password" />
              </Form.Item>
              <Button type="primary" size="large" htmlType="submit" block className="login-button">
                Login to dashboard
              </Button>
            </Form>

            <Alert
              type="info"
              showIcon
              message="Demo access"
              description="Use the pre-filled credentials to enter the professional admin interface."
            />

            <Space className="language-row">
              <Button onClick={() => i18n.changeLanguage('ku')}>کوردی</Button>
              <Button onClick={() => i18n.changeLanguage('ar')}>العربية</Button>
              <Button onClick={() => i18n.changeLanguage('en')}>English</Button>
            </Space>
          </Space>
        </Card>
      </div>
    </div>
  );
}

function AdminApp({ session, onLogout }: { session: Session; onLogout: () => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const selectedKey = useMemo(() => {
    const match = Object.entries(routeMap).find(([, path]) => location.pathname === path);
    return match?.[0] || 'dashboard';
  }, [location.pathname]);

  const menuItems = [
    { key: 'dashboard', label: t('dashboard'), icon: <DashboardOutlined /> },
    { key: 'customers', label: t('customers'), icon: <TeamOutlined /> },
    { key: 'shipments', label: t('shipments'), icon: <ShopOutlined /> },
    { key: 'payments', label: t('payments'), icon: <DollarOutlined /> },
    { key: 'reports', label: t('reports'), icon: <SolutionOutlined /> },
    { key: 'warehouse', label: t('warehouse'), icon: <HomeOutlined /> },
    { key: 'staff', label: t('staff'), icon: <UsergroupAddOutlined /> },
    { key: 'settings', label: t('settings'), icon: <SettingOutlined /> }
  ];

  const languageItems = [
    { key: 'ku', label: 'کوردی' },
    { key: 'ar', label: 'العربية' },
    { key: 'en', label: 'English' }
  ];

  const userMenuItems = [
    { key: 'profile', label: 'Profile', icon: <UserOutlined /> },
    { key: 'logout', label: t('logout'), icon: <LogoutOutlined />, danger: true }
  ];

  return (
    <Layout className="main-layout">
      <Sider trigger={null} collapsible collapsed={collapsed} width={270} className="app-sidebar">
        <div className="logo-block" onClick={() => navigate('/dashboard')} role="button" tabIndex={0}>
          <div className="logo-icon"><GlobalOutlined /></div>
          {!collapsed && (
            <div>
              <Text className="logo-title">Global Cloud</Text>
              <Text className="logo-subtitle">Admin System</Text>
            </div>
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={({ key }) => navigate(routeMap[key] || '/dashboard')}
        />
      </Sider>
      <Layout>
        <Header className="header">
          <Space>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="header-icon-button"
            />
            <div>
              <Text className="page-eyebrow">Operations control center</Text>
              <Title level={4}>{menuItems.find(item => item.key === selectedKey)?.label}</Title>
            </div>
          </Space>
          <Space size="middle">
            <Dropdown menu={{ items: languageItems, onClick: ({ key }) => i18n.changeLanguage(key) }}>
              <Button icon={<GlobalOutlined />}>Language</Button>
            </Dropdown>
            <Badge count={5}>
              <Button icon={<BellOutlined />} onClick={() => message.info('You have 5 operational notifications.')} />
            </Badge>
            <Dropdown
              menu={{
                items: userMenuItems,
                onClick: ({ key }) => {
                  if (key === 'logout') onLogout();
                  if (key === 'profile') navigate('/settings');
                }
              }}
            >
              <Button className="user-button">
                <Avatar size="small" icon={<UserOutlined />} />
                <span>{session.name}</span>
              </Button>
            </Dropdown>
          </Space>
        </Header>
        <Content className="content-area">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/shipments" element={<Shipments />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/warehouse" element={<Warehouse />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

function App() {
  const [session, setSession] = useState<Session | null>(() => {
    const saved = window.localStorage.getItem('global-cloud-session');
    if (!saved) return null;
    try {
      return JSON.parse(saved) as Session;
    } catch {
      window.localStorage.removeItem('global-cloud-session');
      return null;
    }
  });

  const handleLogin = (nextSession: Session) => {
    window.localStorage.setItem('global-cloud-session', JSON.stringify(nextSession));
    setSession(nextSession);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('global-cloud-session');
    setSession(null);
    message.success('Logged out');
  };

  return (
    <Router>
      {session ? <AdminApp session={session} onLogout={handleLogout} /> : <LoginScreen onLogin={handleLogin} />}
    </Router>
  );
}

export default App;
