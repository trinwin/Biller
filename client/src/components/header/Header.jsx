import React from "react";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import { Link } from 'react-router-dom';

const { Header } = Layout;

const HeaderPage = () => {
    return(
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
            <div/>
            <Menu theme="silver" mode="horizontal" style={{ lineHeight: "64px", float: "right" }} >
            <Menu.Item key="1">
                <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/register">Sign Up</Link>
            </Menu.Item>
            </Menu>
        </Header>
    );
}

export default HeaderPage