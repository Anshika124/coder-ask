import React, { useState, useEffect } from 'react';
import axios from 'axios';import { localDBUrl } from '../controller/URLManager'
import Answer from './Answer';

function AnswerList({userId}) {

    const [answerList, setAnswerList] = useState([]);

    useEffect(() =>{
        const fetchAnswerList = async()=>{
            try {
                const res = await axios.get(localDBUrl+'/answers/answerlistofuser', { params: { userId: userId._id } });
                setAnswerList(res.data);
                console.log(res);
            }
            catch (e) {
            }
        }
        fetchAnswerList();
    },[])

  return (
    <div className="" style={{ maxWidth: '600px', margin: 'auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <header className="header">
        <h1>Answers</h1>
      </header>
      {answerList.length > 0 ? (
        answerList.map((answer) => (
          <Answer key={answer._id} answer={answer} />
        ))
      ) : (
        <p>No answers found.</p>
      )}
    </div>
  )
}

export default AnswerList