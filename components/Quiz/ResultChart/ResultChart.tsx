import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import styles from "./ResultChart.module.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

export function ResultChart({
  wrongSelection,
  rightSelection,
}: {
  wrongSelection: number;
  rightSelection: number;
}) {
  return (
    <div className={styles.ResultChart}>
      <Doughnut
        data={{
          labels: ["Wrong", "Correct"],
          datasets: [
            {
              label: "Selection",
              data: [wrongSelection, rightSelection],
              backgroundColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(75, 192, 192, 1)",
              ],
              borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  );
}
