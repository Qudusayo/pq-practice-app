import React from "react";
import styles from "./Switch.module.scss";

interface SwitchInterface {
  isOn: boolean;
  handleToggle: () => void;
  onColor: string;
}

const Switch: React.FunctionComponent<SwitchInterface> = ({
  isOn,
  handleToggle,
  onColor,
}) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className={styles["react-switch-checkbox"]}
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        style={{ background: isOn ? onColor : "" }}
        className={styles["react-switch-label"]}
        htmlFor={`react-switch-new`}
      >
        <span className={styles[`react-switch-button`]} />
      </label>
    </>
  );
};

export default Switch;
