var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin
dayjs.extend(utc);
dayjs.extend(timezone);
import dayjs from "dayjs";

export const ThankYouPage = ({
  configValue,
  timeSelected,
  formattedDateYear,
}) => {
  const storageData = localStorage.getItem("config-web-palloma");
  const configStorage = JSON.parse(storageData);

  let dateTime = localStorage.getItem("dateTime-paloma");
  const today = new Date();
  today.setDate(today.getDate());

  // Set the time zone to Central European Time (CET)
  today.toLocaleString("en-US", { timeZone: "Europe/Berlin" });

  // Format the time in the desired format (HH:MM)
  const hours = today.getHours().toString().padStart(2, "0");
  const minutes = today.getMinutes().toString().padStart(2, "0");

  const currentTimeZONE = dayjs.tz.guess();
  // Create the final string in the desired format
  const currentTime = `${currentTimeZONE?.replace(
    "_",
    " "
  )} (${hours}:${minutes})`;

  return (
    <div className="box__shadow">
      <div className="calendar__wrapper">
        <div className="screen__three date__time">
          <div className="thank__you-page">
            <div className="content__wrapper-page">
              <div>
                <img
                  className="avatar"
                  width="65px"
                  src={configValue?.profile_img_url || "/avatar.jpeg"}
                />
              </div>
              <h2>
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                >
                  <path
                    d="M10 0a10 10 0 1 0 10 10A10.012 10.012 0 0 0 10 0Zm4.884 8.384-5.5 5.5a1.251 1.251 0 0 1-1.768 0l-2.5-2.5a1.25 1.25 0 0 1 1.768-1.768L8.5 11.232l4.616-4.616a1.25 1.25 0 1 1 1.768 1.768Z"
                    fill="currentColor"
                  ></path>
                </svg>
                You are scheduled
              </h2>

              <p>A calendar invitation has been sent to your email address.</p>

              <div className="meeting__information">
                <h2>15 Minutes Meeting</h2>
                <div className="minute">
                  <svg
                    data-id="details-item-icon"
                    viewBox="0 0 10 10"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                  >
                    <path
                      d="M2.75 2.75a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 1 0-4.5 0ZM9.244 9.5a4.5 4.5 0 0 0-8.488 0Z"
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                  <span>{configStorage?.full_name || ""}</span>
                </div>

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
                  <span>{dateTime?.replaceAll('"', "")}</span>
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
              </div>
            </div>

            <div className="cookie__setting">Cookie settings</div>
          </div>
          <a className="logo__wrapper-calendly hide__mobile">
            <div className="background">
              <div className="powerd__by">powered by</div>
              <div className="calendly">Calendly</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
