import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// import {
//     PieChartOutlined,
// } from '@ant-design/icons';
// import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import './index.less';
import { useSelector } from 'react-redux';
import { selectMenus } from '@/redux/loginReducer';
import { Avatar, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const LayoutWrap = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menus = JSON.parse(JSON.stringify(useSelector(selectMenus)));
  const toTree = (parentId: any) => {
    const arr = menus.filter((item: any) => {
      return item.parentId === parentId;
    });
    arr.forEach((item: any) => {
      const children = toTree(item.id);
      if (children.length) {
        item.children = children;
      }
    });
    return arr.map((item: any) => {
      return {
        label: item.name,
        key: item.path,
        children: item.children,
      };
    });
  };
  const tree = toTree(0);
  const handOnClick = (params: any) => {
    navigate(params.key);
  };

  const location = useLocation();
  const [breadcrumb, setBreadcrumb] = useState([]);
  useEffect(() => {
    let result = [];
    let fisrt = menus.find((item: any) => item.path === location.pathname);
    if (!fisrt) {
      return;
    }
    result.push(fisrt);
    let parentId = fisrt.parentId;
    while (parentId) {
      const cur = menus.find((item: any) => item.id === parentId);
      if (cur) {
        result.push(cur);
        parentId = cur.parentId;
      } else {
        result = [];
        break;
      }
    }
    result.reverse();
    const temp = result.map((item) => {
      return {
        title: item.name,
        key: item.path,
      };
    });
    // @ts-ignore
    setBreadcrumb(temp);
  }, [location.pathname]);

  const handDropdown: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      window.localStorage.clear();
      navigate('/login');
    }
  };

  return (
    <Layout className="layout">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={tree}
          onClick={handOnClick}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: '0 20px',
            textAlign: 'right',
            cursor: 'pointer',
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Breadcrumb items={breadcrumb} className="brea"></Breadcrumb>
          <Dropdown
            menu={{
              selectable: true,
              onClick: handDropdown,
              items: [
                {
                  label: '退出',
                  key: 'logout',
                },
              ],
            }}
            placement="bottom"
            arrow
          >
            <Avatar
              style={{
                marginTop: '10px',
                backgroundColor: '#87d068',
              }}
              className="avatar"
              icon={<UserOutlined />}
            />
          </Dropdown>
        </Header>

        <Content className="content">
          {/* <Breadcrumb items={breadcrumb}></Breadcrumb> */}
          <Outlet></Outlet>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutWrap;
