import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");

  const [allQuestions, setAllQuestions] = useState([]);

  const getQuestions = () => {
    fetch("http://localhost:4000/questions")
    .then(r => r.json())
    .then(questionData => setAllQuestions(questionData))
  }

  const handleAddQuestion = (addQuestion) => {
    setAllQuestions([...allQuestions, addQuestion])
  }

  const handleDelete = (questionToDelete) => {
    const updatedQuestions = allQuestions.filter(q => q.id !== questionToDelete.id);
    setAllQuestions(updatedQuestions);
    fetch(`http://localhost:4000/questions/${questionToDelete.id}`, {method: "DELETE"})
    .then(r => r.json())
    .then(() => console.log(questionToDelete));
  }

  const handleChangeAnswer = (question, newAnswerIndex) => {
    // console.log(question, newAnswerIndex);

    

    const patchHeaders = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( {"correctIndex": newAnswerIndex,} )
    }

    fetch(`http://localhost:4000/questions/${question.id}`, patchHeaders)
    .then(r => r.json())
    .then(() => {
      // this seems a little redundanct since the user essentially changes the 
      // DOM when they select a new answer, but what the hay... here ya go!
      const questionIndex = allQuestions.findIndex(s => s.id === question.id);
      const updatedQuestions = allQuestions;
      updatedQuestions[questionIndex].correctIndex = newAnswerIndex
      setAllQuestions(updatedQuestions);
      console.log(allQuestions)
    })    
  }
  
  useEffect(() => {getQuestions()}, [])

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {
      page === "Form" ? 
      <QuestionForm 
      onAddQuestion={handleAddQuestion} 
      /> 
      : 
      <QuestionList 
      allQuestions={allQuestions} 
      onDelete={handleDelete} 
      onAnswerChange={handleChangeAnswer} 
      />
      }
    </main>
  );
}

export default App;
