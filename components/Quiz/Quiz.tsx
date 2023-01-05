import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { shuffle } from "../../functions/shuffle";

import styles from "./Quiz.module.scss";
import { questionsInterface } from "../../types/questionArrayType";
import { useRouter } from "next/router";

export default function Quiz({
  practiceQuestions,
  handleQuizSubmission,
}: {
  practiceQuestions: questionsInterface[];
  handleQuizSubmission: (wrongChoices: number, rightChoices: number) => void;
}) {
  const [entry, setEntry] = useState(0);
  const [entryOptions, setEntryOptions] = useState<string[]>([]);
  const [questions, setQuestions] = useState<questionsInterface[]>([]);
  const [userEntries, setUserEntries] = useState<
    { userSelectedOption: string; validity: boolean; validValue: string }[]
  >([]);
  const router = useRouter();

  useEffect(() => {
    setQuestions(practiceQuestions);
  }, []);

  useEffect(() => {
    if (questions.length) {
      let options = Object.values(questions[entry]?.options);
      setEntryOptions(shuffle(options));
    }
  }, [entry, questions]);

  const checkSelection = (userSelectedOption: string) => {
    if (entry + 1 === userEntries.length) return;

    let userSelectionValidity =
      questions[entry].options[
        questions[entry].answer as "A" | "B" | "C" | "D"
      ];

    setUserEntries((prevEntries) => [
      ...prevEntries,
      {
        userSelectedOption,
        validity: userSelectedOption === userSelectionValidity,
        validValue: userSelectionValidity,
      },
    ]);
  };

  const showNextEntry = () => {
    setEntry((prevEntry) => (prevEntry += 1));
  };

  const finishQuiz = () => {
    let userGrade = userEntries.reduce(
      (result, current) => {
        if (current.validity) {
          if (result?.rightChoices) {
            result.rightChoices += 1;
          } else {
            result.rightChoices = 1;
          }
        } else {
          if (result?.wrongChoices) {
            result.wrongChoices += 1;
          } else {
            result.wrongChoices = 1;
          }
        }
        return result;
      },
      { rightChoices: 0, wrongChoices: 0 }
    );
    return handleQuizSubmission(userGrade.wrongChoices, userGrade.rightChoices);
  };

  const backToHome = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will reset your progress",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Go back!",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/");
      }
    });
  };

  return (
    <div className={styles.Quiz}>
      <div className={styles.QuizExit} onClick={backToHome}>
        <img src={"chevron-left.svg"} />
        <span>Back to Home</span>
      </div>
      <div>
        <span className={styles.questionNumber}>Question - {entry + 1}</span>
        <p>{questions[entry]?.question}</p>
      </div>
      <div className={styles.QuizOptions}>
        {React.Children.toArray(
          entryOptions.map((entryOption, index) => {
            let option = String.fromCharCode(65 + index);

            let isUserSelectionValid = userEntries[entry]?.validity;
            let questionRightOption = userEntries[entry]?.validValue;
            let userSelectedOption = userEntries[entry]?.userSelectedOption;

            let isInvalidSelection =
              userSelectedOption === entryOption && !isUserSelectionValid;
            let isValidSelection =
              (userSelectedOption === entryOption && isUserSelectionValid) ||
              questionRightOption === entryOption;

            return (
              <div
                className={[
                  styles.QuizOptionsList,
                  isValidSelection && styles.validOption,
                  isInvalidSelection && styles.inValidOption,
                ].join(" ")}
                onClick={() => checkSelection(entryOption)}
              >
                <div className={styles.QuizOptionsListOption}>
                  <span>{option}</span>
                </div>
                <div className={styles.QuizOptionsListValue}>
                  <span>{entryOption}</span>
                </div>
                {isInvalidSelection && (
                  <div className={styles.inValidOptionType}>
                    <span>Your Answer</span>
                  </div>
                )}

                {isValidSelection && (
                  <div className={styles.validOptionType}>
                    <span>Correct Answer</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
      <button
        type="button"
        onClick={entry + 1 === questions.length ? finishQuiz : showNextEntry}
        disabled={entry === userEntries.length}
      >
        {entry + 1 === questions.length ? "Finish" : "Next"}
      </button>
    </div>
  );
}
