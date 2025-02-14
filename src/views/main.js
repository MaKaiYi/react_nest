import React, { useState } from 'react';
import myhead from '../assets/logo192.png';
import { Outlet, useNavigate } from 'react-router-dom';
import './css/main.css';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Space, Layout, Menu, theme, Button, Avatar, Dropdown } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

const menuList = [
  {
    key: 'user',
    icon: React.createElement(UserOutlined),
    label: '用户管理',
  },
  {
    key: 'video',
    icon: React.createElement(VideoCameraOutlined),
    label: '视频管理',
  },
  {
    key: 'upload',
    icon: React.createElement(UploadOutlined),
    label: '上传管理',
  },
  {
    key: 'menuSet',
    icon: React.createElement(MenuFoldOutlined),
    label: '标签管理',
  },
];

const App = () => {
  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" onClick={() => layOyut()}>
          退出登陆
        </a>
      ),
    },
  ];
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleMenuClick = ({ key }) => {
    navigate(key); // 跳转到对应路由
  };
  const layOyut = () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical">
          <img src={myhead} alt="" className="logo_header" />

          {!collapsed && <span className="logo_text">React</span>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['user']}
          items={menuList}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {' '}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Dropdown menu={{ items }}>
            <a
              onClick={(e) => e.preventDefault()}
              style={{
                position: 'absolute',
                right: 24,
                top: 0,
                cursor: 'pointer',
              }}
            >
              <Space>
                <Avatar
                  size={{
                    xs: 24,
                    sm: 34,
                    md: 34,
                    lg: 30,
                    xl: 35,
                    xxl: 30,
                  }}
                  src={myhead}
                />
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Maky ©{new Date().getFullYear()} Make by React
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
