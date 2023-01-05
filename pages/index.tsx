import Link from "next/link";
import styles from "./../styles/Home.module.scss";
import { useEffect, useState } from "react";
import localForage from "localforage";
import Meme from "../components/Quiz/Meme/Meme";

export default function Home() {
  const [isValidUser, setIsValidUser] = useState<boolean | null>(null);

  useEffect(() => {
    async function verifyAuth() {
      let storedToken = await localForage.getItem(
        process.env.NEXT_PUBLIC_ENTRY_KEY!
      );
      if (storedToken === process.env.NEXT_PUBLIC_ENTRY_VALUE) {
        setIsValidUser(true);
      } else {
        setIsValidUser(false);
      }
    }

    verifyAuth();
  }, []);

  if (isValidUser === null) {
    return "Loading...";
  }

  return !isValidUser ? (
    <Meme />
  ) : (
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
