import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuill } from 'react-quilljs';
import { localDBUrl } from '../controller/URLManager';
import { TagsInput } from "react-tag-input-component";
import 'quill/dist/quill.snow.css';
import '../css/Ask.css'

function Ask() {
  // const placeholder = "Add Description of the question...";
  const placeholder = "";
  const { quill, quillRef } = useQuill({ placeholder });
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);  // Initialize as an empty array
  const [tagInput, setTagInput] = useState('');


  const Navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e) => {
    if ((e.key === ' ' || e.key === 'Enter') && tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
      e.preventDefault();
    }
  };

  const handleTagInputBlur = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleSubmit = async () => {
    
    try {
      let res = await axios.post(localDBUrl + "/questions/addquestion", {
        title: title,
        tags: tags,
        description: quill.root.innerHTML,
        postedBy: JSON.parse(localStorage.getItem("userData"))._id
      });

      if (res.data.success) {
        // console.log(res.data)
        Navigate('/')
      } else {
        // console.log(res.data.message);
      }
    } catch (error) {
      // setErrorMessage("Login failed. Please check your credentials and try again.");
      console.error(error);
    }
  };

  return (
    <div className='py-100 container Ask'>
      <div>
        <input
          type='text'
          placeholder='Add question title'
          value={title}
          onChange={handleTitleChange}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            fontSize: '1.2rem',
            outline: 'none',
            border: 'none',
            borderRadius: '4px',
            color: '#c4c4c4',
            fontWeight: '500',
          }}
        />
        
        <div ref={quillRef} style={{ height: '300px' }} />
        <div className='tagContainer'>
          <TagsInput
            value={tags}
            onChange={setTags}

            name="fruits"
            placeHolder="Add question tags"
          />
        </div>
        <button className='padding-btn-normal' onClick={handleSubmit} style={{
          margin: '20px 0px',
        }}>Ask Question</button>
      </div>
    </div>
  );
}

export default Ask;
