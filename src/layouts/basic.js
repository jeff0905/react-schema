import React from "react";
import { Layout, Menu, Icon } from "antd";
import { Link } from 'react-router-dom';
import { Switch, Route } from "react-router";

import G6Page from "./../pages/diagram/g6";
import D3Page from "./../pages/diagram/d3";
import Home from "./../pages/home";

import './basic.less';

const { Header, Sider, Content } = Layout;

export default class BasicLayout extends React.Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    // const { children } = this.props;
    // console.log('children', children);
    return (
      <Layout className="layout" style={{width: '100%', height: '100%'}}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Icon type="user" />
              <Link to="/">首页</Link>
            </Menu.Item>
            <Menu.SubMenu key="sub2" title={<span><Icon type="appstore" /><span>diagram</span></span>}>
                <Menu.Item key="5">
                    <span><Link to="/d3">d3首页</Link></span>
                </Menu.Item>
                <Menu.Item key="6">
                    <span><Link to="/g6">g6</Link></span>
                </Menu.Item>
                <Menu.SubMenu key="sub3" title="Submenu">
                    <Menu.Item key="7">Option 7</Menu.Item>
                    <Menu.Item key="8">Option 8</Menu.Item>
                </Menu.SubMenu>
            </Menu.SubMenu>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 280
            }}
          >
            
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/d3" component={D3Page} />
            <Route path="/g6" component={G6Page} />
        </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
