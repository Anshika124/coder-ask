import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuill } from 'react-quilljs';
import { localDBUrl } from '../controller/URLManager';
import Loading from "../components/Loading";
import { TagsInput } from "react-tag-input-component";
import 'quill/dist/quill.snow.css';
import '../css/Ask.css';
import { useParams } from 'react-router-dom';

function EditAsk() {
    const obj = "EditAsk";
  const { quill, quillRef } = useQuill({obj});
  const [updating, setUpdating ]= useState(true);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);  // Initialize as an empty array
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

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
        navigate('/');
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchQuestionInfo = async () => {
        console.log("oo")
      try {
        const questionInfo = await axios.get(
          localDBUrl + "/questions/questionbyid",
          { params: { _id: id } }
        );
        setTitle(questionInfo.data[0].title);
        setTags(questionInfo.data[0].tags);
        
        if (quill) {
          quill.clipboard.dangerouslyPasteHTML(
            questionInfo.data[0].description
          );
          setUpdating(false);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    console.log(quill)
    if (quill) {
      fetchQuestionInfo();
    }
  }, [quill, id, updating]);

  if (loading) {
    return <Loading />;
  }

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
        <div className='tagContainer' style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px', alignItems: 'center' }}>
          <TagsInput
            value={tags}
            onChange={setTags}
            name="fruits"
            placeHolder="enter tags"
          />
        </div>
        <div ref={quillRef} style={{ height: '300px' }} />
        <button onClick={handleSubmit} style={{ marginTop: '10px' }}>Ask</button>
      </div>
    </div>
  );
}

export default EditAsk;
