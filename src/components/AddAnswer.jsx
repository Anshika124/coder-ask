import axios from 'axios'
import React, { useState } from 'react'
import { localDBUrl } from '../controller/URLManager'

function AddAnswer({ setEnableAnswer, questionId, setLoading }) {

  const [description, setDescription] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      setLoading(true);
      const answer = await axios.post(localDBUrl + "/answers/addAnswer", { answerFor: questionId, description: description, answeredBy: JSON.parse(localStorage.getItem('userData'))._id });
      // console.log(answer)
      setEnableAnswer(false)
      setLoading(false);
    }
    catch (err) {

    }
  }

  return (
    <form style={{width:'100%'}} onSubmit={handleSubmit}>
      <textarea onChange={(e) => { setDescription(e.target.value) }}></textarea>
      <div style={{
        display: 'flex',
        gap: '10px',
        width: '100%',
        justifyContent: 'end'
      }}>
        <button className='padding-btn-normal' type="reset" onClick={() => { setEnableAnswer(false) }}>Cancel</button>
        <button className='padding-btn-normal' type="submit" disabled={description === ""} style={{width:'80px'}}>Post</button>
      </div>
    </form>

  )
}

export default AddAnswer