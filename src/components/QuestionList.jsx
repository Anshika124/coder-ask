import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { localDBUrl } from '../controller/URLManager'
import Question from './Question';
import '../css/QuestionList.css';

function QuestionList({userId}) {

    const [questionList, setQuestionList] = useState([]);

    useEffect(() =>{
        const fetchQuestionList = async()=>{
            try {
                const res = await axios.get(localDBUrl+'/questions/questionlistofuser', { params: { userId: userId._id } });
                setQuestionList(res.data);
                console.log(res);
            }
            catch (e) {
            }
        }
        fetchQuestionList();
    },[])

  return (
    <div className="profile-question-list">
      <header className="header">
        <h1>Questions</h1>
      </header>
      {questionList.length > 0 ? (
        questionList.map((question) => (
          <Question key={question._id} question={question} />
        ))
      ) : (
        <p>No questions found.</p>
      )}
    </div>
  )
}

export default QuestionList