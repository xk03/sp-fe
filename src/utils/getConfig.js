import axios from "axios";
import { API_BE } from "./variable";

export const getConfig = async () => {
  const hostname = window.location.hostname;
  try {
    const config = await axios.get(`${API_BE}/users/config/web/${hostname}`);

    if (config && config?.data) {
      localStorage.setItem(
        "config-web-palloma",
        JSON.stringify(config?.data?.data)
      );
    } else {
      localStorage.removeItem("config-web-palloma");
    }
  } catch (error) {
    localStorage.removeItem("config-web-palloma");
  }
};
