import FAQCard from "./FAQCard";
export default function FAQ({
  questionOne,
  answerOne,
  questionTwo,
  answerTwo,
  questionThree,
  answerThree,
  questionFour,
  answerFour,
  questionFive,
  answerFive,
}) {
  return (
    <div className="bg-light pb-24 text-center">
      <h1 className="md:pt-24 pt-16 md:pb-12 pb-8 text-gray-800  md:text-6xl text-4xl font-bold">
        Need Help? We're Here to Answer.
      </h1>

      <div className="lg:w-8/12 w-11/12  mx-auto pb-12">
        <FAQCard question={questionOne} answer={answerOne} />
        <FAQCard question={questionTwo} answer={answerTwo} />
        <FAQCard question={questionThree} answer={answerThree} />
        <FAQCard question={questionFour} answer={answerFour} />
        <FAQCard question={questionFive} answer={answerFive} />
      </div>
    </div>
  );
}
