import Link from "next/link";
import styles from "./../styles/Home.module.scss";
import { useEffect, useState } from "react";
import localForage from "localforage";
import Meme from "../components/Meme/Meme";
import Switch from "../components/Switch/Switch";
import { useSwitchContext } from "../context/shuffleContext";
import SectionSelector from "../components/SectionSelector/SectionSelector";

export default function Home() {
  const [isValidUser, setIsValidUser] = useState<boolean | null>(null);
  // const { shuffled, shuffleToggler } = useSwitchContext()!;
  const { selection, toggleSelection } = useSwitchContext()!;

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
      <h2>PRACTICE GES-107</h2>
      {/* <div className={styles.ToggleControl}>
        <h2>Shuffle Questions: </h2>
        <Switch
          isOn={shuffled}
          onColor="#249efb"
          handleToggle={shuffleToggler}
        />
      </div> */}
      <div>
        <span
          style={{
            textTransform: "uppercase",
            display: "block",
            width: "fit-content",
            margin: "auto",
          }}
        >
          Select practice sector
        </span>
        <SectionSelector
          selections={selection}
          toggleSelection={toggleSelection}
        />
      </div>
      <div className={styles.Buttons}>
        <Link href={"/ges-107"} className={styles.ButtonsLink}>
          START GES 107
        </Link>
        {/* <Link href={"/ges-108"} className={styles.ButtonsLink}>
          GES 108
        </Link> */}
      </div>
    </div>
  );
}
