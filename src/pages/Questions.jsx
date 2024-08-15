import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { localDBUrl } from '../controller/URLManager'
import Question from '../components/Question';
import Loading from '../components/Loading';

function Questions() {
  
  const [questionList, setQuestionList] = useState([]);
  const [loading, setLoading] = useState(false);

    useEffect(() =>{
        const fetchQuestionList = async()=>{
            try {
                setLoading(true);
                const res = await axios.get(localDBUrl+'/questions/allquestionlist');
                setQuestionList(res.data);
                console.log(res);
                setLoading(false);
            }
            catch (e) {
            }
        }
        fetchQuestionList();
    },[])

    if (loading)
    {
      return <Loading/>
    }

  return (
    <div className="container" style={{
      padding: '2rem',
      maxWidth: '70vw',
      margin: 'auto',
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 8px'
       }}>
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