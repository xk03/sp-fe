import "antd/dist/antd.css";
import React from "react";
import { Menu } from "antd";

const { SubMenu } = Menu;

export const Sidebar = () => {
  //   const [collapse, setCollapse] = useState(false);

  return (
    <Menu mode="inline" defaultOpenKeys={["sub3", "sub6"]}>
      <SubMenu
        icon={
          <div className="using-facebook">
            <span className="using-facebook-icon"></span>
          </div>
        }
        key="sub"
        title="Using Facebook"
      >
      </SubMenu>
      <SubMenu icon={
          <div className="managing-account">
            <span className="managing-account-icon"></span>
          </div>
        } key="sub1" title="Managing Your Account">
      </SubMenu>
      <SubMenu icon={
          <div className="managing-account">
            <span className="privacy-safety-icon"></span>
          </div>
        } key="sub3" title="Privacy, Safety and Security">
        <SubMenu  icon={
          <div className="managing-account">
            <span className="privacy-safety-icon"></span>
          </div>
        } key="sub4" title="Your Privacy"></SubMenu>
        <SubMenu icon={
          <div className="managing-account">
            <span className="staying-safe-icon"></span>
          </div>
        } key="sub5" title="Staying Safe"></SubMenu>
        <SubMenu icon={
          <div className="keeping-secure">
            <span className="keeping-secure-icon"></span>
          </div>
        } key="sub6" title="Keeping Your Account Secure">
          <Menu.Item className="menu-sub-text" key="4">
            Security Features and Tips
          </Menu.Item>
          <Menu.Item className="menu-sub-text" key="5">
            Login Alerts and Two-Factor Authentication
          </Menu.Item>
          <Menu.Item className="menu-sub-text" key="6">
            Avoid Spam and Scams
          </Menu.Item>
        </SubMenu>
        <SubMenu icon={
          <div className="managing-account">
            <span className="shooping-safety-icon"></span>
          </div>
        } key="sub7" title="Shooping Safety"></SubMenu>
      </SubMenu>
      <SubMenu icon={
          <div className="managing-account">
            <span className="policies-reporting-icon"></span>
          </div>
        } key="sub8" title="Policies and Reporting">
        <SubMenu key="sub9" title="Reportin Abuse"></SubMenu>
        <Menu.Item className="menu-sub-text" key="7">
          Reporting a Problem with Facebook{" "}
        </Menu.Item>
        <Menu.Item className="menu-sub-text" key="8">
          Being Your Authentic Self on Facebook{" "}
        </Menu.Item>
        <Menu.Item className="menu-sub-text" key="9">
          Reporting a Privacy Violation{" "}
        </Menu.Item>
        <Menu.Item className="menu-sub-text" key="10">
          Hacked and Fake Accounts{" "}
        </Menu.Item>
        <SubMenu
          key="sub10"
          title="Managing a Deceased Person's Account"
        ></SubMenu>
        <SubMenu key="sub11" title="Intellectual Property"></SubMenu>
        <Menu.Item className="menu-sub-text" key="11">
          About Our Policies{" "}
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};
