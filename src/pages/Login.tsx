import React, { useState } from "react";
import { Button, Card, Input, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "../static/css/login.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const checkLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="login-div">
      <Spin tip="Loading..." spinning={isLoading}>
        <Card
          title={<div style={{ textAlign: "center" }}>Darry Blog System</div>}
          bordered={true}
          style={{ width: 400 }}
        >
          <Input
            id="userName"
            size="large"
            placeholder="Enter your username"
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          ></Input>
          <br />
          <br />
          <Input.Password
            id="password"
            size="large"
            placeholder="Enter your password"
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Input.Password>
          <br />
          <br />
          <Button
            type="primary"
            size="large"
            block
            onClick={() => checkLogin()}
          >
            登录
          </Button>
        </Card>
      </Spin>
    </div>
  );
};

export default Login;
