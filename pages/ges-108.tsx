import Quiz from "../components/Quiz/Quiz";
import { questionsInterface } from "../types/questionArrayType";
import { ResultChart } from "../components/ResultChart/ResultChart";
import { useEffect, useState } from "react";

import styles from "./../styles/Home.module.scss";
import axios from "axios";
import localforage from "localforage";
import Meme from "../components/Meme/Meme";
import { useSwitchContext } from "../context/shuffleContext";
import { shuffle } from "../functions/shuffle";

export default function Ges108({
  practiceQuestions,
}: {
  practiceQuestions: questionsInterface[];
}) {
  const [scoreBoard, setScoreBoard] = useState({
    wrongChoices: 0,
    rightChoices: 0,
  });
  const { shuffled } = useSwitchContext()!;
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

  return (
    <>
      {!completedQuiz && (
        <Quiz
          practiceQuestions={
            shuffled ? shuffle(practiceQuestions) : practiceQuestions
          }
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
    process.env.BASE_URL + "/api/ges-pqs?questionType=GES-108"
  );

  return {
    props: {
      practiceQuestions: questionsResponse.data,
    },
  };
}
