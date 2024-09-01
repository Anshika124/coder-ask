import React from 'react'
import Question from './Question';
import '../css/BookmarkList.css';

function Bookmark({bookmarks}) {
  return (
    <div className="BookmarkList" style={{   margin: 'auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <header className="header">
        <h1>Bookmarks</h1>
      </header>
      {bookmarks.length > 0 ? (
        bookmarks.map((question,index) => (
          <Question question={question} key={index}/>
        ))
      ) : (
        <p>No Bookmarks found.</p>
      )}
    </div>
  )
}

export default Bookmark