import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Input, Spin, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "../static/css/login.css";
import { checkLogin } from "../services/login";

const Login = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const clickLogin = async () => {
    setIsLoading(true);
    if (!userName) {
      message.destroy();
      message.error("用户名不能为空");
      setIsLoading(false);
      return false;
    } else if (!password) {
      message.destroy();
      message.error("密码不能为空");
      setIsLoading(false);
      return false;
    }
    let loginInfo = {
      userName,
      password,
    };
    const res = await checkLogin(loginInfo);

    setIsLoading(false);
    //@ts-ignore
    if (res.result) {
      //@ts-ignore
      localStorage.setItem("openId", res.openId);
      navigate("/main");
    } else {
      message.error("登录失败");
    }
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
            onClick={() => clickLogin()}
          >
            登录
          </Button>
        </Card>
      </Spin>
    </div>
  );
};

export default Login;
