import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, LogoutOutlined, HomeOutlined, CopyOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;

import '../styles/DefaultLayout.css';

const DefaultLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical">
                    <h1 className="text-center text-light font-wight-bold mt-4">POS</h1>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={window.location.pathname}>
                    <Menu.Item key="/" icon={<HomeOutlined />}><Link to="/">Home</Link></Menu.Item>
                    <Menu.Item key="/bills" icon={<CopyOutlined />}><Link to="/bills">Bills</Link></Menu.Item>
                    <Menu.Item key="/items" icon={<UnorderedListOutlined />}><Link to="/items">Items</Link></Menu.Item>
                    <Menu.Item key="/customers" icon={<UserOutlined />}><Link to="/customers">Cutomers</Link></Menu.Item>
                    <Menu.Item key="/logout" icon={<LogoutOutlined />}>Logout</Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => setCollapsed(!collapsed)} style={{ fontSize: '16px', width: 64, height: 64 }} />
                </Header>
                <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: colorBgContainer, borderRadius: borderRadiusLG }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default DefaultLayout;
