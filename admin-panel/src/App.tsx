import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Alert, Avatar, Badge, Button, Card, ConfigProvider, Dropdown, Form, Input, Layout, Menu, Space, Switch, Tag, Typography, message, theme as antdTheme } from 'antd';
import {
  BellOutlined,
  BulbOutlined,
  DashboardOutlined,
  DollarOutlined,
  GlobalOutlined,
  HomeOutlined,
  LockOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  SettingOutlined,
  ShopOutlined,
  SolutionOutlined,
  TeamOutlined,
  ToolOutlined,
  BarcodeOutlined,
  CalculatorOutlined,
  AimOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  WhatsAppOutlined
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
import Tools from './pages/Tools';
import Parcels from './pages/Parcels';
import LiveTracking from './pages/LiveTracking';
import Pricing from './pages/Pricing';
import { SpeedInsights } from '@vercel/speed-insights/react';
import './App.css';

const { Header, Sider, Content } = Layout;
const { Text, Title } = Typography;
const SUPPORT_PHONE = '9647507577137';

type Session = {
  name: string;
  role: string;
  phone?: string;
};

type ThemeMode = 'light' | 'dark';

const routeMap: Record<string, string> = {
  dashboard: '/dashboard',
  customers: '/customers',
  shipments: '/shipments',
  payments: '/payments',
  reports: '/reports',
  warehouse: '/warehouse',
  staff: '/staff',
  parcels: '/parcels',
  tracking: '/tracking',
  pricing: '/pricing',
  tools: '/tools',
  settings: '/settings'
};

function LoginScreen({ onLogin, themeMode, onThemeToggle }: { onLogin: (session: Session) => void; themeMode: ThemeMode; onThemeToggle: () => void }) {
  const { i18n } = useTranslation();

  const handleLogin = (values: { username: string; phone?: string }) => {
    onLogin({ name: values.username || 'Ali Blbas', role: 'Founder & CEO', phone: values.phone || SUPPORT_PHONE });
    message.success('Welcome back, boss');
  };

  return (
    <div className={`login-shell app-theme-${themeMode}`}>
      <div className="login-visual" aria-label="Global Cloud logistics branding">
        <div className="login-visual-overlay" />
        <div className="brand-mark pro-logo-wrap">
          <img className="brand-logo-img" src="/global-cloud-logo.svg" alt="Globall Cloud" />
          <div>
            <Text className="brand-eyebrow">Premium logistics platform</Text>
            <Title level={1}>Globall Cloud</Title>
            <Text className="brand-subtitle">الفيوم العالمية — Air, sea, and land operations</Text>
          </div>
        </div>
        <div className="login-feature-strip">
          <Tag color="blue">QR</Tag>
          <Tag color="green">Excel</Tag>
          <Tag color="red">PDF</Tag>
          <Tag color="purple">Firebase</Tag>
          <Tag color="gold">OCR</Tag>
        </div>
        <div className="logistics-scene">
          <div className="scene-plane" />
          <div className="scene-ship" />
          <div className="scene-truck" />
          <div className="scene-containers" />
        </div>
      </div>

      <div className="login-panel-wrap">
        <Card className="login-card glass-card" bordered={false}>
          <Space direction="vertical" size={18} style={{ width: '100%' }}>
            <div className="login-card-head">
              <div>
                <Text className="login-kicker">Secure admin portal</Text>
                <Title level={2}>Boss Login</Title>
              </div>
              <Switch
                checked={themeMode === 'dark'}
                onChange={onThemeToggle}
                checkedChildren={<MoonOutlined />}
                unCheckedChildren={<BulbOutlined />}
              />
            </div>
            <Text type="secondary">Sign in to manage live tracking, QR scanning, customers, finance, backup, and cloud sync.</Text>

            <Form layout="vertical" onFinish={handleLogin} initialValues={{ username: 'Ali Blbas', phone: SUPPORT_PHONE }}>
              <Form.Item label="Boss name" name="username" rules={[{ required: true, message: 'Enter your name' }]}>
                <Input size="large" prefix={<UserOutlined />} placeholder="Ali Blbas" />
              </Form.Item>
              <Form.Item label="Mobile / WhatsApp" name="phone">
                <Input size="large" prefix={<WhatsAppOutlined />} placeholder="+9647507577137" />
              </Form.Item>
              <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Enter your password' }]} initialValue="globalcloud">
                <Input.Password size="large" prefix={<LockOutlined />} placeholder="Password" />
              </Form.Item>
              <Button type="primary" size="large" htmlType="submit" block className="login-button">
                Enter premium dashboard
              </Button>
            </Form>

            <Alert
              type="info"
              showIcon
              message="Premium modules enabled"
              description="QR, Excel, PDF, Backup, Print, WhatsApp, OCR, dark/light mode, and Firebase-ready cloud sync surfaces are included."
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

function AdminApp({ session, onLogout, themeMode, onThemeToggle }: { session: Session; onLogout: () => void; themeMode: ThemeMode; onThemeToggle: () => void }) {
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
    { key: 'parcels', label: 'Parcels', icon: <BarcodeOutlined /> },
    { key: 'tracking', label: 'Live Tracking', icon: <AimOutlined /> },
    { key: 'pricing', label: 'Pricing', icon: <CalculatorOutlined /> },
    { key: 'payments', label: t('payments'), icon: <DollarOutlined /> },
    { key: 'reports', label: t('reports'), icon: <SolutionOutlined /> },
    { key: 'warehouse', label: t('warehouse'), icon: <HomeOutlined /> },
    { key: 'staff', label: t('staff'), icon: <UsergroupAddOutlined /> },
    { key: 'tools', label: 'Tools', icon: <ToolOutlined /> },
    { key: 'settings', label: t('settings'), icon: <SettingOutlined /> }
  ];

  const languageItems = [
    { key: 'ku', label: 'کوردی' },
    { key: 'ar', label: 'العربية' },
    { key: 'en', label: 'English' }
  ];

  const userMenuItems = [
    { key: 'profile', label: 'Profile', icon: <UserOutlined /> },
    { key: 'whatsapp', label: 'WhatsApp', icon: <WhatsAppOutlined /> },
    { key: 'logout', label: t('logout'), icon: <LogoutOutlined />, danger: true }
  ];

  const openWhatsApp = () => {
    const phone = session.phone || SUPPORT_PHONE;
    if (!phone) {
      message.info('Send me your mobile number and I will connect the WhatsApp buttons to it.');
      return;
    }
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  return (
    <Layout className={`main-layout app-theme-${themeMode}`}>
      <Sider trigger={null} collapsible collapsed={collapsed} width={280} className="app-sidebar">
        <div className="logo-block premium-logo-block" onClick={() => navigate('/dashboard')} role="button" tabIndex={0}>
          <img className="sidebar-logo-img" src="/global-cloud-logo.svg" alt="Globall Cloud" />
          {!collapsed && (
            <div>
              <Text className="logo-title">Globall Cloud</Text>
              <Text className="logo-subtitle">الفيوم العالمية</Text>
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
        <div className="mobile-top-brand">
          <img src="/global-cloud-logo.svg" alt="Globall Cloud" />
          <div>
            <strong>Globall Cloud</strong>
            <span>الفيوم العالمية</span>
          </div>
          <Switch
            checked={themeMode === 'dark'}
            onChange={onThemeToggle}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<BulbOutlined />}
          />
        </div>
        <Header className="header glass-header">
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
          <Space size="middle" wrap>
            <Switch
              checked={themeMode === 'dark'}
              onChange={onThemeToggle}
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<BulbOutlined />}
            />
            <Dropdown menu={{ items: languageItems, onClick: ({ key }) => i18n.changeLanguage(key) }}>
              <Button icon={<GlobalOutlined />}>Language</Button>
            </Dropdown>
            <Badge count={5}>
              <Button icon={<BellOutlined />} onClick={() => message.info('Push notifications are ready for Firebase setup.')} />
            </Badge>
            <Dropdown
              menu={{
                items: userMenuItems,
                onClick: ({ key }) => {
                  if (key === 'logout') onLogout();
                  if (key === 'profile') navigate('/settings');
                  if (key === 'whatsapp') openWhatsApp();
                }
              }}
            >
              <Button className="user-button">
                <Avatar size="small" icon={<UserOutlined />} />
                <span>{session.name}</span>
                <Tag color="gold">{session.role}</Tag>
              </Button>
            </Dropdown>
          </Space>
        </Header>
        <Content className="content-area animated-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/shipments" element={<Shipments />} />
            <Route path="/parcels" element={<Parcels />} />
            <Route path="/tracking" element={<LiveTracking />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/warehouse" element={<Warehouse />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Content>
        <nav className="mobile-bottom-nav" aria-label="Mobile quick navigation">
          {[
            { key: 'dashboard', label: 'Home', icon: <DashboardOutlined /> },
            { key: 'parcels', label: 'Parcels', icon: <BarcodeOutlined /> },
            { key: 'tracking', label: 'Track', icon: <AimOutlined /> },
            { key: 'pricing', label: 'Price', icon: <CalculatorOutlined /> },
            { key: 'tools', label: 'Tools', icon: <ToolOutlined /> }
          ].map(item => (
            <button
              key={item.key}
              className={selectedKey === item.key ? 'active' : ''}
              onClick={() => navigate(routeMap[item.key])}
              type="button"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </Layout>
    </Layout>
  );
}

function App() {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => (window.localStorage.getItem('global-cloud-theme') as ThemeMode) || 'light');
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

  const toggleTheme = () => {
    const nextTheme = themeMode === 'dark' ? 'light' : 'dark';
    window.localStorage.setItem('global-cloud-theme', nextTheme);
    setThemeMode(nextTheme);
  };

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
    <ConfigProvider
      theme={{
        algorithm: themeMode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: { colorPrimary: '#1267a8', borderRadius: 14 }
      }}
    >
      <Router>
        {session ? (
          <AdminApp session={session} onLogout={handleLogout} themeMode={themeMode} onThemeToggle={toggleTheme} />
        ) : (
          <LoginScreen onLogin={handleLogin} themeMode={themeMode} onThemeToggle={toggleTheme} />
        )}
      </Router>
      <SpeedInsights />
    </ConfigProvider>
  );
}

export default App;
