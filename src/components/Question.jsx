import React from 'react';

function Question({ question }) {
  return (
    <div className="question" style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
      <h2>{question.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: question.description }}></div>
      <p><strong>Posted On:</strong> {new Date(question.postedOn).toLocaleString()}</p>
      <p><strong>Posted By:</strong> {new String(question.postedBy.userName).toLocaleString()}</p>
    </div>
  );
}

export default Question;
