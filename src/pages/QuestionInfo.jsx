import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import  parse from 'html-react-parser';
import { localDBUrl } from '../controller/URLManager';
import AnswerList from '../components/AnswerList';
import Loading from '../components/Loading';

const QuestionInfo = () => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  const {title, id} = useParams();
    
    useEffect(() =>{
        const fetchQuestionInfo = async () =>{
            try {
                const questionInfo = await axios.get(localDBUrl+"/questions/questionbyid", {params: {_id:id}})
                console.log(questionInfo);
                setQuestion(questionInfo.data[0])
                setLoading(false)
            }
            catch (err) {
            }
        }
        fetchQuestionInfo();
    },[])

  if (loading) {
    return <Loading />;
  }

  if (!question) {
    return <p>Question not found</p>;
  }

  return (
    <div className="container">
      <div className="question-detail">
        <h1>{question.title}</h1>
        <p><strong>Description:</strong> {parse(question.description)}</p>
        <p><strong>Tags:</strong> {question.tags.join(', ')}</p>
        <p><strong>Posted On:</strong> {new Date(question.postedOn).toLocaleString()}</p>
        <p><strong>Upvotes:</strong> {question.upvotesList.length}</p>
        <h2>Answers:</h2>
        {/* <AnswerList answers={question.answersList} /> */}
      </div>
    </div>
  );
};

export default QuestionInfo;
