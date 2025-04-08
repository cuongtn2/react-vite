import { useCurrentApp } from "@/components/context/app.context";
import { loginApi } from "@/services/api";
import { App, Button, Divider, Form, FormProps, Input } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type FieldType = {
  username: string;
  password: string;
};


const LoginPage = () => {
  const navigate = useNavigate();
  const { message, notification } = App.useApp();
  const [isSubmit, setIsSubmit] = useState(false);
  const { setUser, setIsAuthenticated } = useCurrentApp();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setIsSubmit(true);
    const { username, password } = values
    const res = await loginApi(username, password);
    if (res.data) {
      localStorage.setItem("access_token", res.data.access_token)
      setIsAuthenticated(true)
      setUser(res.data.user)
      navigate("/");
      message.success("Login success!");
    } else {
      notification.error({
        message: 'Đăng nhập thất bại!',
        description: res.message && Array.isArray(res.message) ? res.message[0] : res.message,
        duration: 5,
        placement: 'topRight',
      });
    }
    setIsSubmit(false);
  };
  return (
    <div className="register-page">
      <main className="main">
        <div className="container">
          <section className="wrapper">
            <div className="heading">
              <h2 className="text text-large">Đăng nhập</h2>
              <Divider />
            </div>
            <Form
              name="form-login"
              onFinish={onFinish}
              labelCol={{ span: 24 }}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="Email"
                name="username"
                rules={[
                  { required: true, message: "Please input your Email!" },
                  { type: "email", message: "Email invalid!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item label={null}>
                <Button type="primary" htmlType="submit" loading={isSubmit}>
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
            <Divider />
            <p className="question-form-auth">
              Đã chưa có tài khoảng?{" "}
              <Link className="redirect redirect-login" to={"/login"}>
                Đăng ký
              </Link>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};
export default LoginPage