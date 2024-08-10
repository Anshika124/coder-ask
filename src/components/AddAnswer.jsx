import axios from 'axios'
import React, { useState } from 'react'
import { localDBUrl } from '../controller/URLManager'

function AddAnswer({setEnableAnswer, questionId, setLoading}) {

  const [description, setDescription] = useState("");
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(description);
    try {
      
      setLoading(true);
      const answer = await axios.post(localDBUrl+"/answers/addAnswer", {answerFor: questionId , description: description, answeredBy:JSON.parse(localStorage.getItem('userData'))._id});
      console.log(answer)
      setEnableAnswer(false)
      setLoading(false);
    }
    catch (err) {

    }
  }

  return (
    <form className="container" onSubmit={handleSubmit}>
      <textarea onChange={(e)=>{setDescription(e.target.value)}}></textarea>
      <div style={{
        display: 'flex',
        gap: '10px',
        width: '25%'
      }}>
        <button type="reset" onClick={()=>{setEnableAnswer(false)}}>Cancel</button>
        <button type="submit" disabled={description===""}>Post</button>
      </div>
    </form>
    
  )
}

export default AddAnswer