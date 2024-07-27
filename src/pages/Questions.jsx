import React, { useState, useEffect } from 'react';
import axios from 'axios';import { localDBUrl } from '../controller/URLManager'
import Question from '../components/Question';

function Questions() {
  
  const [questionList, setQuestionList] = useState([]);

    useEffect(() =>{
        const fetchQuestionList = async()=>{
            try {
                const res = await axios.get(localDBUrl+'/questions/allquestionlist');
                setQuestionList(res.data);
                console.log(res);
            }
            catch (e) {
            }
        }
        fetchQuestionList();
    },[])

  return (
    <div className="container" style={{ padding: '2rem', maxWidth: '600px', margin: 'auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
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

export default Questions