import { App, Button, Divider, Form, FormProps, Input } from "antd";
import { useState } from "react";
import "pages/client/auth/register.scss";
import { Link, redirect, useNavigate } from "react-router-dom";
import { registerApi } from "@/services/api";
type FieldType = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [isSubmit, setIsSubmit] = useState(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setIsSubmit(true);
    const res = await registerApi(values);
    if (res.data) {
      navigate("/login");
      message.success("Register user success!");
    } else {
      message.error(res.message);
    }
    setIsSubmit(false);
  };
  return (
    <div className="register-page">
      <main className="main">
        <div className="container">
          <section className="wrapper">
            <div className="heading">
              <h2 className="text text-large">Đăng ký tài khoản</h2>
              <Divider />
            </div>
            <Form
              name="form-register"
              onFinish={onFinish}
              labelCol={{ span: 24 }}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="Fullname"
                name="fullName"
                rules={[
                  { required: true, message: "Please input your Fullname!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item<FieldType>
                label="Email"
                name="email"
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
              <Form.Item<FieldType>
                label="Phone"
                name="phone"
                rules={[
                  { required: true, message: "Please input your Phone!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label={null}>
                <Button type="primary" htmlType="submit" loading={isSubmit}>
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
            <Divider />
            <p className="question-form-auth">
              Đã có tài khoảng?{" "}
              <Link className="redirect redirect-login" to={"/login"}>
                Đăng nhập
              </Link>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};
export default RegisterPage;
