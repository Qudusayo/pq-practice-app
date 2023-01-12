import styles from "./SectionSelector.module.scss";

interface SectionSelectorInterface {
  selections: number[];
  toggleSelection: (entry: number) => void;
}

export default function SectionSelector({
  selections,
  toggleSelection,
}: SectionSelectorInterface) {
  return (
    <div className={styles.SectionSelector}>
      <div
        className={selections.includes(1) ? styles.Selected : ""}
        onClick={() => toggleSelection(1)}
      >
        1-30
      </div>
      <div
        className={selections.includes(2) ? styles.Selected : ""}
        onClick={() => toggleSelection(2)}
      >
        30-60
      </div>
      <div
        className={selections.includes(3) ? styles.Selected : ""}
        onClick={() => toggleSelection(3)}
      >
        60-90
      </div>
      <div
        className={selections.includes(4) ? styles.Selected : ""}
        onClick={() => toggleSelection(4)}
      >
        90-120
      </div>
      <div
        className={selections.includes(5) ? styles.Selected : ""}
        onClick={() => toggleSelection(5)}
      >
        120-150
      </div>
      <div
        className={selections.includes(6) ? styles.Selected : ""}
        onClick={() => toggleSelection(6)}
      >
        150-180
      </div>
    </div>
  );
}
