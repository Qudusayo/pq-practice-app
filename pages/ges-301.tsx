import Quiz from "../components/Quiz/Quiz";
import { questionsInterface } from "../types/questionArrayType";
import { ResultChart } from "../components/ResultChart/ResultChart";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert
import styles from "./../styles/Home.module.scss";
import { useSwitchContext } from "../context/shuffleContext";
import { shuffle } from "../functions/shuffle";
import Link from "next/link";

export default function Ges301({
  practiceQuestionsData,
}: {
  practiceQuestionsData: questionsInterface[];
}) {
  const [scoreBoard, setScoreBoard] = useState({
    wrongChoices: 0,
    rightChoices: 0,
  });
  const { shuffled, selection } = useSwitchContext()!;
  const [completedQuiz, setCompletedQuiz] = useState(false);
  const [practiceQuestions, setPracticeQuestions] = useState<
    questionsInterface[]
  >(practiceQuestionsData);

  useEffect(() => {
    // Show SweetAlert before accessing quiz
    Swal.fire({
      title: "Subscribe to DevMarkson!",
      text: "Subscribe to my YouTube channel to unlock the quiz!",
      icon: "info",
      confirmButtonText: "Go to YouTube",
      allowOutsideClick: false, // Prevents users from clicking outside to dismiss
    }).then(() => {
      // Redirect to YouTube channel
      window.open("https://www.youtube.com/@DevMarkson", "_blank");
    });
  }, []);

  // useEffect(() => {
  //   let seletions = selection.sort((a, b) => a - b);
  //   let questionSelections: questionsInterface[] = [];
  //   for (let index = 0; index < seletions.length; index++) {
  //     let questionSliceStart = (seletions[index] - 1) * 30;
  //     questionSelections.push(
  //       ...practiceQuestionsData.slice(
  //         questionSliceStart,
  //         questionSliceStart + 30
  //       )
  //     );
  //   }

  //   setPracticeQuestions(shuffle(questionSelections));
  // }, [practiceQuestionsData]);

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
          <div className={styles.Buttons}>
            <Link href={"/"} className={styles.ButtonsLink}>
              Back to Home
            </Link>
          </div>
        </>
      )}
    </>
  );
}

export async function getServerSideProps() {
  let questionsResponse = await axios.get(
    process.env.BASE_URL + "/api/ges-pqs?questionType=GES-301"
  );

  return {
    props: {
      practiceQuestionsData: questionsResponse.data,
    },
  };
}
