import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu as AntMenu } from 'antd';
import { UserOutlined, SettingOutlined,UnorderedListOutlined } from '@ant-design/icons';
import './Menu.css';

const { Sider } = Layout;

const items = [
  {
    key: '/clients',
    icon: <UserOutlined />,
    label: <Link to="/clients">Клиенты</Link>,
  },
  {
    key: '/orders',
    icon: <UnorderedListOutlined />,
    label: <Link to="/orders">Заказы</Link>,
  },
  {
    key: '/settings',
    icon: <SettingOutlined />,
    label: <Link to="/settings">Настройки</Link>,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <Sider width={200} className="sider">
      <h1>DEMO CRM</h1>
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
