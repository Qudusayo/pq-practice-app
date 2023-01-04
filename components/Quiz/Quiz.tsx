import React, { useEffect, useState } from "react";

import { shuffle } from "../../functions/shuffle";

import styles from "./Quiz.module.scss";
import { questionsInterface } from "../../types/questionArrayType";

export default function Quiz({
  practiceQuestions,
}: {
  practiceQuestions: questionsInterface[];
}) {
  const [entry, setEntry] = useState(0);
  const [entryOptions, setEntryOptions] = useState<string[]>([]);
  const [questions, setQuestions] = useState<questionsInterface[]>([]);
  const [userEntries, setUserEntries] = useState<
    { userSelectedOption: string; validity: boolean; validValue: string }[]
  >([]);

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

  return (
    <div className={styles.Quiz}>
      <div>
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
      <button type="button" onClick={showNextEntry}>
        {entry + 1 === questions.length ? "Finish" : "Next"}
      </button>
    </div>
  );
}
