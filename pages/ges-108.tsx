import Quiz from "../components/Quiz/Quiz";
import { questionsInterface } from "../types/questionArrayType";
import { ResultChart } from "../components/Quiz/ResultChart/ResultChart";
import { useState } from "react";

import styles from "./../styles/Home.module.scss";
import axios from "axios";

export default function Ges108({
  practiceQuestions,
}: {
  practiceQuestions: questionsInterface[];
}) {
  const [scoreBoard, setScoreBoard] = useState({
    wrongChoices: 0,
    rightChoices: 0,
  });
  const [completedQuiz, setCompletedQuiz] = useState(false);

  const handleQuizSubmission = (
    wrongChoices: number,
    rightChoices: number
  ): void => {
    setCompletedQuiz(true);
    setScoreBoard({
      wrongChoices,
      rightChoices,
    });
  };

  const resetEntry = () => {
    setCompletedQuiz(false);
    setScoreBoard({
      wrongChoices: 0,
      rightChoices: 0,
    });
  };

  return (
    <>
      {!completedQuiz && (
        <Quiz
          practiceQuestions={practiceQuestions}
          handleQuizSubmission={handleQuizSubmission}
        />
      )}
      {completedQuiz && (
        <>
          <ResultChart
            wrongSelection={scoreBoard.wrongChoices}
            rightSelection={scoreBoard.rightChoices}
          />
          <div className={styles.Button}>
            <button onClick={resetEntry}>Restart Quiz</button>
          </div>
        </>
      )}
    </>
  );
}

export async function getServerSideProps() {
  let questionsResponse = await axios.get(
    "http://localhost:3000/api/ges-pqs?questionType=GES-108"
  );

  return {
    props: {
      practiceQuestions: questionsResponse.data,
    },
  };
}
