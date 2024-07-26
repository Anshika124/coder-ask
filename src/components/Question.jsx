import React from 'react';
import { convert } from 'html-to-text';
import moment from 'moment/moment';
import { NavLink } from 'react-router-dom';

function Question({ question }) {

  let descriptionPreview = convert(question.description);
  let desc = descriptionPreview.split(' ').slice(0,15).join(' ')
  if (desc.length > 150) {
    desc = desc.slice(0,150)
  }
  return (
    <div className="question" style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
      <NavLink to={`/question/${question.title.replace(/[?\/]/g, '')}/${question._id}`} ><h2>{question.title}</h2></NavLink>
      <div>{ desc }</div>
      <p><strong>Posted:</strong> {moment(new Date(question.postedOn).toLocaleString()).fromNow()}</p>
      <p><strong>Posted By:</strong> {new String(question.postedBy.userName).toLocaleString()}</p>
      <p><strong>Answered:</strong> {question.answersList.length}</p>

    </div>
  );
}

export default Question;
