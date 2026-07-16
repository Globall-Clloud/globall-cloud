import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout, Menu, Button, Dropdown, Space, Badge, Spin } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, BellOutlined, UserOutlined, LogoutOutlined, GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
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

function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();

  const menuItems = [
    { key: 'dashboard', label: t('dashboard'), icon: '📊' },
    { key: 'customers', label: t('customers'), icon: '👥' },
    { key: 'shipments', label: t('shipments'), icon: '📦' },
    { key: 'payments', label: t('payments'), icon: '💰' },
    { key: 'reports', label: t('reports'), icon: '📈' },
    { key: 'warehouse', label: t('warehouse'), icon: '🏢' },
    { key: 'staff', label: t('staff'), icon: '👨‍💼' },
    { key: 'settings', label: t('settings'), icon: '⚙️' }
  ];

  const languageItems = [
    { key: 'ku', label: 'کوردی' },
    { key: 'ar', label: 'العربية' },
    { key: 'en', label: 'English' }
  ];

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const userMenuItems = [
    { key: 'profile', label: 'Profile', icon: <UserOutlined /> },
    { key: 'logout', label: t('logout'), icon: <LogoutOutlined /> }
  ];

  const onUserMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      logout();
    }
  };

  return (
    <Router>
      <Layout className="main-layout" style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed} width={250}>
          <div className="logo" style={{ padding: '16px', textAlign: 'center', color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
            {!collapsed && '🌐 Globall Cloud'}
          </div>
          <Menu
            theme="dark"
            mode="inline"
            items={menuItems.map(item => ({
              key: item.key,
              icon: item.icon,
              label: item.label
            }))}
          />
        </Sider>
        <Layout>
          <Header className="header">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: '16px' }}
            />
            <Space>
              <Dropdown menu={{ items: languageItems, onClick: (e) => handleLanguageChange(e.key) }}>
                <Button icon={<GlobalOutlined />}>Lang</Button>
              </Dropdown>
              <Badge count={5}>
                <Button icon={<BellOutlined />} />
              </Badge>
              <Dropdown menu={{ items: userMenuItems, onClick: onUserMenuClick }}>
                <Button icon={<UserOutlined />}>{user?.name || user?.role || 'User'}</Button>
              </Dropdown>
            </Space>
          </Header>
          <Content style={{ padding: '24px' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/shipments" element={<Shipments />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/warehouse" element={<Warehouse />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

function AppContent() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  return isAuthenticated ? <AdminLayout /> : <Login />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
