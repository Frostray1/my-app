import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import MenuComponent from './Menu';
import TopBar from './TopBar';
import './AppLayout.css';

const { Content } = Layout;

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <MenuComponent />
      <Layout>
        <TopBar />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default React.memo(AppLayout);
