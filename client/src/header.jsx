import React from "react";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";

const { Header } = Layout;

class HeaderPage extends React.Component {

    handleLoginClick(){
        
    }
    
    handleSignInClick(){

    }

    handleHomePageClick(){

    }

    render() {
        return (
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
            <div/>
            <Menu theme="silver" mode="horizontal" style={{ lineHeight: "64px", float: "right" }} >
            <Menu.Item key="1" onClick = {this.handleLoginClick}>Login</Menu.Item>
            <Menu.Item key="2" onClick = {this.handleSignInClick}>Sign Up</Menu.Item>
            </Menu>
        </Header>
        );
    }
}

export default HeaderPage