import Quiz from "../components/Quiz/Quiz";
import { questionsInterface } from "../types/questionArrayType";
import { ResultChart } from "../components/Quiz/ResultChart/ResultChart";
import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./../styles/Home.module.scss";
import localforage from "localforage";
import Meme from "../components/Quiz/Meme/Meme";

export default function Ges107({
  practiceQuestions,
}: {
  practiceQuestions: questionsInterface[];
}) {
  const [scoreBoard, setScoreBoard] = useState({
    wrongChoices: 0,
    rightChoices: 0,
  });
  const [completedQuiz, setCompletedQuiz] = useState(false);
  const [isValidUser, setIsValidUser] = useState<boolean | null>(null);

  useEffect(() => {
    localforage
      .getItem(process.env.NEXT_PUBLIC_ENTRY_KEY!)
      .then(function (value) {
        if (value === process.env.NEXT_PUBLIC_ENTRY_VALUE) {
          setIsValidUser(true);
        } else {
          setIsValidUser(false);
        }
      });
  }, []);

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

  if (isValidUser === null) {
    return "Loading...";
  }

  return !isValidUser ? (
    <Meme />
  ) : (
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
    process.env.BASE_URL + "/api/ges-pqs?questionType=GES-107"
  );

  return {
    props: {
      practiceQuestions: questionsResponse.data,
    },
  };
}
