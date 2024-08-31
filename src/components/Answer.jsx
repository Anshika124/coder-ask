import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import { convert } from 'html-to-text';

const Answer = ({ answer }) => {
  let descriptionPreview = convert(answer.description);
  let desc = descriptionPreview.split(' ').slice(0, 15).join(' ')
  if (desc.length > 150) {
    desc = desc.slice(0, 150)
  }
  return (
    <div key={answer._id} className="answer-card" style={{
      margin: '1rem 0px',
      padding: '10px 20px',
      background: '#1a1f27',
      borderRadius: '10px'

    }}>
      <h2>{answer.answerFor.title}</h2>
      <div style={{ color:'#01aaff'}}>Answer:</div>
      <div style={{
        background: 'rgb(22 27 35)',
        borderRadius: '0px 0px 5px 5px',
        padding: '10px 15px',
        marginTop: '5px'
      }}>
        <p>{desc}</p>
        <p style={{ display: 'flex', alignItems: 'center', color: '#7f8081', fontSize:'0.9rem' }}><span style={{ marginRight: '5px' }}>{answer.upvotesList.length} </span><img width="20" height="20" style={{ marginRight: '5px' }} src="https://img.icons8.com/material-rounded/24/228BE6/thumb-up.png" alt="thumb-up" /> • {moment(new Date(answer.answeredOn)).fromNow()}</p>

      </div>
    </div>
  );
};

Answer.propTypes = {
  answer: PropTypes.object.isRequired,
};

export default Answer;
