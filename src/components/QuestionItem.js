import React from "react";

function QuestionItem({ question, onDelete, onAnswerChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const onDeleteClick = () => {
    onDelete(question);
  }

  const answerChange = (e) => {
    // console.log(e.target,value)
    const newAnswerIndex = e.target.value
    onAnswerChange(question, newAnswerIndex)
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select 
        defaultValue={correctIndex} 
        onChange={answerChange}
        > {options}</select>
      </label>
      <button onClick={onDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
