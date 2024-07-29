import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import moment from 'moment/moment';
import { localDBUrl } from '../controller/URLManager';
import Loading from '../components/Loading';
import AddAnswer from '../components/AddAnswer';
import AnswerCard from '../components/AnswerCard';
import { getLocal } from '../controller/ProjectData';

const QuestionInfo = () => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [upvotes, setUpvotes] = useState(0);
  const [voteStatus, setVoteStatus] = useState('');
  const [enableAnswer, setEnableAnswer] = useState(false);

  const { id } = useParams();
  let local = null
  useEffect(()=>{
    local = getLocal();
  }, [])


  useEffect(() => {
    const fetchQuestionInfo = async () => {
      try {
        const questionInfo = await axios.get(localDBUrl + "/questions/questionbyid", { params: { _id: id } });
        console.log(questionInfo);
        setQuestion(questionInfo.data[0]);
        let upvoteCountList = questionInfo.data[0].upvotesList.filter( upvotes => upvotes.isUpvote)
        let downvoteCountList = questionInfo.data[0].upvotesList.filter( downvotes => !downvotes.isUpvote)
        setUpvotes(upvoteCountList.length - downvoteCountList.length)
        console.log(typeof(local))
        let userId = local!==null? local._id: local;

        let upd = questionInfo.data[0].upvotesList.filter(user => user.userId === userId);

        if (upd.length > 0) {
          console.log("reached " + upd[0].isUpvote);
          if (upd[0].isUpvote) {
            setVoteStatus('upvote');
          } else {
            setVoteStatus('downvote');
          }
        } 
        setLoading(false);

      } catch (err) {
        console.error(err);
      }
    };
    fetchQuestionInfo();
  }, [id, loading]);

  const handleUpvote = async () => {
    if (!local)
    {
      alert("Please Login to vote")
      return
    }
    try {
      let res = await axios.put(localDBUrl + "/questions/updateupvotecount", { questionId: id, userId: local._id, isUpvote: true });
      setUpvotes(res.data.VoteCount);
      setVoteStatus('upvote')
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownvote = async () => {
    if (!local) {
      alert("Please Login to vote")
      return
    }
    try {
      let res = await axios.put(localDBUrl + "/questions/updateupvotecount", { questionId: id, userId: local._id, isUpvote: false });
      setUpvotes(res.data.VoteCount);
      setVoteStatus('downvote')

    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!question) {
    return <p>Question not found</p>;
  }

  return (
    <div className="container">
      <article className="question-detail" style={{ display: 'flex' }}>
        <div className="vote-buttons" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginRight: '20px'
        }}>
          <button className="upvote-button" onClick={handleUpvote} disabled={voteStatus == 'upvote'}>▲</button>
          <span>{upvotes}</span>
          <button className="downvote-button" onClick={handleDownvote} disabled={voteStatus == 'downvote'}>▼</button>
        </div>
        <div className="question-content">
          <h1>{question.title}</h1>
          <p>{String(question.postedBy.userName)} ● {moment(new Date(question.postedOn)).fromNow()}</p>
          <p><strong>Description:</strong> {parse(question.description)}</p>
          {question.tags.length>0 && <p><strong>Tags:</strong> {question.tags.join(', ')}</p>}
          <div>
            {enableAnswer?<AddAnswer setEnableAnswer={setEnableAnswer} questionId={id} setLoading={setLoading}/>:<button onClick={()=>{setEnableAnswer(true)}}>Add Answer</button>  }
            
          </div>
          <h3>Answers:</h3>
          {question.answersList.length > 0 ? (
            question.answersList.map((answer) => (
              <AnswerCard answer={answer}/>
            ))
          ) : (
            <p>Not answered yet.</p>
          )}
        </div>
      </article>
    </div>
  );
};

export default QuestionInfo;
