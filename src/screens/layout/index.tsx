import { Outlet } from "react-router";
import "./layout.scss";

const Layout = () => {
  return (
    <div className="layout">
      <Outlet />
    </div>
  );
};

export default Layout;
