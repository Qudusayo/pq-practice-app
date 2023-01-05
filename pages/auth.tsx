import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import localForage from "localforage";
import styles from "../styles/Auth.module.scss";
import { useRouter } from "next/router";

export default function Auth() {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    localForage
      .getItem(process.env.NEXT_PUBLIC_ENTRY_KEY!)
      .then(function (value) {
        if (value === process.env.NEXT_PUBLIC_ENTRY_VALUE) {
          router.push("/");
        }
      });
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      let processReq = await axios.post("/api/auth", {
        token,
      });

      if (processReq.status === 200) {
        localForage
          .setItem(
            process.env.NEXT_PUBLIC_ENTRY_KEY!,
            process.env.NEXT_PUBLIC_ENTRY_VALUE!
          )
          .then(function () {
            Swal.fire({
              icon: "success",
              title: "Success",
              html: "Your device now granted access",
              timer: 5000,
              timerProgressBar: true,
            });

            router.push("/");
          });
      } else {
        Swal.fire("Oops", "Invalid Token", "error");
      }
    } catch (error) {
      Swal.fire("Oops", "Invalid Token", "error");
    }
  };

  return (
    <>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <h2>Submit Token</h2>
        <span>Paste your token to grant your device access</span>
        <div>
          <label>Token</label>
          <input value={token} onChange={(e) => setToken(e.target.value)} />
        </div>
        <button>Grant Device Access</button>
      </form>
    </>
  );
}
