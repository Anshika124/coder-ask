import React from 'react'
import Question from './Question'

function Bookmark({bookmarks}) {
  return (
    <div className="container" style={{ padding: '2rem', maxWidth: '600px', margin: 'auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <header className="header">
        <h1>Bookmarks</h1>
      </header>
      {bookmarks.length > 0 ? (
        bookmarks.map((question) => (
          <Question question={question} />
        ))
      ) : (
        <p>No questions found.</p>
      )}
    </div>
  )
}

export default Bookmark