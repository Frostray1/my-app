import React from 'react';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import './TopBar.css';
import { logout } from '../api/auth';
import * as Module from 'to-upper-case-mini-js-library'; // Импортируем все объекты

const { Header } = Layout;

const TopBar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const userMenuItems = [
    {
      key: '1',
      label: <Link to="/profile">Profile</Link>,
    },
    {
      key: '2',
      label: <Link to="/settings">Settings</Link>,
    },
    {
      key: '3',
      label: (
        <span onClick={handleLogout}>
          Logout
        </span>
      ),
    },
  ];

  return (
    <Header className="header">
      <div className="logo" />
      <Dropdown menu={{ items: userMenuItems }}  trigger={['click']}>
        <div className="user-profile">
          <Avatar icon={<UserOutlined />} />
          <span className="username">{Module.mylibrary.toUpperCase('admin')}</span> {/* Использование метода toUpperCase */}
        </div>
      </Dropdown>
    </Header>
  );
};

export default React.memo(TopBar);
