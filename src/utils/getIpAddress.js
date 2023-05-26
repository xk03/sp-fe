export const getIpAddress = () => {
  let dataIp = localStorage.getItem("ip-datas");
  if (dataIp) {
    dataIp = JSON.parse(dataIp);
    return `  IP: ${dataIp.ip}
        City: ${dataIp.city}
        Region: ${dataIp.region}
        Country: ${dataIp.country}
        ZIP: ${dataIp.zip}
        ORG: ${dataIp.org}`;
      
  } else {
    return "NO DATA";
  }
};
