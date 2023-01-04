import Quiz from "../components/Quiz/Quiz";
import quests from "./../questions.json";
import { questionsInterface } from "../types/questionArrayType";
import { ResultChart } from "../components/Quiz/ResultChart/ResultChart";

export default function Home({
  practiceQuestions,
}: {
  practiceQuestions: questionsInterface[];
}) {
  return (
    <>
      <Quiz practiceQuestions={practiceQuestions} />
      {/* <ResultChart /> */}
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      practiceQuestions: quests,
    },
  };
}
