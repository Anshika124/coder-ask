import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuill } from 'react-quilljs';
import { localDBUrl } from '../controller/URLManager';
import 'quill/dist/quill.snow.css';

function Ask() {
  const { quill, quillRef } = useQuill();
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

  const handleSubmit = async() => {
    console.log('hello');
    try {
      let res = await axios.post(localDBUrl+"/questions/addquestion", {
        title: title,
        tags: [],
        description: quill.root.innerHTML,
        postedBy: JSON.parse(localStorage.getItem("userData"))._id
      });
      
      if (res.data.success) {
        console.log(res.data)
        Navigate('/')
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      // setErrorMessage("Login failed. Please check your credentials and try again.");
      console.error(error);
    } 
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ maxWidth: '770px', margin: '0 auto' }}>
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={handleTitleChange}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px', alignItems: 'center' }}>
          {tags.map((tag, index) => (
            <span key={index} style={{
              backgroundColor: '#007BFF',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '50px',
              display: 'flex',
              alignItems: 'center'
            }}>
              {tag}
            </span>
          ))}
          <input
            type='text'
            placeholder='Tags (separated by space or enter)'
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleTagInputKeyDown}
            onBlur={handleTagInputBlur}
            style={{
              flex: '1',
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>
        <div ref={quillRef} style={{ height: '300px' }} />
        <button onClick={handleSubmit} style={{
          marginTop: '10px',
        }}>Ask</button>
      </div>
    </div>
  );
}

export default Ask;
