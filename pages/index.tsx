import Link from "next/link";
import styles from "./../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.Home}>
      <h2>Select Quiz to Paractice</h2>
      <div className={styles.Buttons}>
        <Link href={"/ges-107"} className={styles.ButtonsLink}>
          GES 107
        </Link>
        <Link href={"/ges-108"} className={styles.ButtonsLink}>
          GES 108
        </Link>
      </div>
    </div>
  );
}
