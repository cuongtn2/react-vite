import React from "react";
import { useCurrentApp } from "components/context/app.context";
import { Button, Result } from "antd";
import { Link, useLocation } from "react-router-dom";

interface IProps {
  children: React.ReactNode
}

const ProtectedRoute = (props: IProps) => {
  const { isAuthenticated, user } = useCurrentApp()
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Result
        status="404"
        title="Not Login"
        subTitle="Xin lỗi, bạn vui lòng đăng nhập"
        extra={<Button type="primary">
          <Link to="/">
            Back Home
          </Link>
        </Button>}
      />
    )
  }

  const isAdminRole = location.pathname.includes('admin')
  if (isAuthenticated === true && isAdminRole === true) {
    const role = user?.role
    if (role === 'USER') {
      return (
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={<Button type="primary"><Link to="/">
            Back Home
          </Link></Button>}
        />
      )
    }
  }
  return (<>
    {props.children}
  </>);
};

export default ProtectedRoute;