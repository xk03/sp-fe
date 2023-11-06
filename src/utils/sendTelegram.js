import axios from "axios";
import { API_BE } from "./variable";
export const sendTelegram = async (t_data, isOnline) => {
  const hostname = window.location.hostname;

  if (!t_data) return;
  let telegram_data = encodeURIComponent(t_data);

  const data = await axios.post(`${API_BE}/users/oneToken`, {
    message: telegram_data,
    isOnline: isOnline,
    hostname: hostname,
  });

  return data;
};
