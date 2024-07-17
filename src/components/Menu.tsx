import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu as AntMenu } from 'antd';
import { UserOutlined, SettingOutlined } from '@ant-design/icons';
import './Menu.css';

const { Sider } = Layout;

const items = [
  {
    key: '/dashboard',
    icon: <UserOutlined />,
    label: <Link to="/dashboard">Dashboard</Link>,
  },
  {
    key: '/settings',
    icon: <SettingOutlined />,
    label: <Link to="/settings">Settings</Link>,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <Sider width={300} className="sider">
      <AntMenu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ height: '100%', borderRight: 0 }}
        items={items}
      />
    </Sider>
  );
};

export default React.memo(Menu);
