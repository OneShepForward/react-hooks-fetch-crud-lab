import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ allQuestions, onDelete, onAnswerChange }) {



const renderQuestions = allQuestions.map(question => {
    return <QuestionItem 
    key={question.id} 
    question={question} 
    onDelete={onDelete}
    onAnswerChange={onAnswerChange}
    />
  })


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{renderQuestions}</ul>
    </section>
  );
}

export default QuestionList;
