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
    
    <div className="question" style={{
      padding: '1rem',
      background: '#22262e',
      borderRadius: '20px',
      marginBottom: '25px'
       }}>
      <NavLink to={`/question/${question.title.replace(/[?\/]/g, '')}/${question._id}`} ><h2>{question.title}</h2></NavLink>
      <p style={{ color: 'grey' }}>{String(question.postedBy.userName)} ● {moment(new Date(question.postedOn)).fromNow()}</p>
      <div> { desc }</div>
      <p style={{ color: '#0072ab', paddingTop: '15px'}}><strong>Answered:</strong> {question.answersList.length}</p>

    </div>
  );
}

export default Question;
