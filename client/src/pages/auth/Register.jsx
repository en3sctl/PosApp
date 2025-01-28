import React from "react";
import { Button, Carousel, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch(
        process.env.REACT_APP_SERVER_URL + "/api/auth/register",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      if (res.status === 200) {
        message.success("Registration successful.");
        navigate("/login");
        setLoading(false);
      }
    } catch (error) {
      message.error("Something went wrong.");
      console.log(error);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-2">PJATK</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="User name"
              name={"username"}
              rules={[
                {
                  required: true,
                  message: "Username Field Cannot Be Left Blank!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="E-mail"
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "Email Field Cannot Be Left Blank!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Password Field Cannot Be Left Blank!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Password Again"
              name={"passwordAgain"}
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Password Again Field Cannot Be Left Blank!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Passwords Must Be The Same!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Sign up
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Do you have an account??&nbsp;
            <Link to="/login" className="text-blue-600">
              Log in now
            </Link>
          </div>
        </div>
        <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#6c63ff] h-full">
          <div className="w-full h-full flex items-center">
            <div className="w-full">
              <Carousel className="!h-full px-6" autoplay>
                <AuthCarousel
                  img="/images/responsive.svg"
                  title="Responsive"
                  desc="Compatibility with All Device Sizes"
                />
                <AuthCarousel
                  img="/images/statistic.svg"
                  title="Statistics"
                  desc="Widely Held Statistics"
                />
                <AuthCarousel
                  img="/images/customer.svg"
                  title="Customer Satisfaction"
                  desc="Customers Satisfied with the Product at the End of the Experience"
                />
                <AuthCarousel
                  img="/images/admin.svg"
                  title="Yönetici Paneli"
                  desc="Admin Panel"
                />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
