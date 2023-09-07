import "./landing.css";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";

export const Landing = ({ ...props }) => {
  const recaptchaRef = useRef();
  const url = window.location.href;
  const scheduledCallValue = url?.split("=")[1];

  const fullName = scheduledCallValue?.split("_");

  // const onSubmitWithReCAPTCHA = async (e) => {
  //     e.preventDefault();
  //     const token = await recaptchaRef.current.executeAsync();
  //     recaptchaRef.current.reset();
  //     // setActive(true)
  //     props.showModal()
  //   }

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = recaptchaRef.current.getValue();
    if (!token) return;
    recaptchaRef.current.reset();
    props.showModal();
  };

  return (
    <div className="app-landing">
      <div className="bg">
        <div className="bg__wrapper">
          <h2>
            Schedule a call with{" "}
            {fullName && fullName?.length ? fullName[0] : "an Agent"}{" "}
            {fullName && fullName?.length ? fullName[1] : ""}
          </h2>
          <div className="container-fb-btn">
            <form onSubmit={handleSubmit}>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={"6LeFzLAmAAAAALwV0xuLE4RUPjwxNYqa06uGUUl1"}
              />
              <button type="submit" className="btn-fb">
                <img className="second__image" src="./fb.svg" alt="" />
                Continue with Facebook
              </button>
            </form>

            {/* <form onSubmit={onSubmitWithReCAPTCHA}>
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey="6LeD5OokAAAAAE2sMdAr5nxIGI5TVJ6J4PV9a6h7"
                    />
                      <button type="submit" className='btn-fb'> <img className='second__image' src="./fb.svg" alt="" />
                    Continue with Facebook</button>
                </form>
                 */}
          </div>
        </div>
        <div className="footer">
          <p>Powered by:</p>
          <div className="images">
            <img className="first__image" src="/logo-es.png" alt="" />
            <img className="second__image" src="/logo-calendly.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
