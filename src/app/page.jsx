import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <p className={styles.title}>PLEASE I NEED YOUR VOTE!</p>
        <Image src="/image.jpg" width={100} height={100} alt="image" />
        <div className={styles.platform}>
          <span>Voting platform</span>
          <div className={styles.buttons}>
            <Link href="/instagram">
              <button>
                VOTE WITH INSTAGRAM
                <Image src="/instag.png" width={20} height={20} alt="image" />
              </button>
            </Link>
            <Link href="/facebook">
              <button>
                VOTE WITH FACEBOOK
                <Image src="/facebook.png" width={20} height={20} alt="image" />
              </button>
            </Link>
            <Link href="/outlook">
              <button>
                VOTE WITH OUTLOOK
                <Image
                  src="/outlook-removebg-preview.png"
                  width={20}
                  height={20}
                  alt="image"
                />
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.votes}>
            <i className="fa-solid fa-house-chimney"></i>
            <p>Total votes: 312 out of 450</p>
          </div>
          <div className={styles.votes}>
            <i className="fa-solid fa-check"></i>
            <p>Total votes to Win: 450</p>
          </div>
          <div className={styles.votes}>
            <i className="fa-solid fa-flag"></i>
            <p>Help</p>
          </div>
        </div>
      </div>
    </div>
  );
}
