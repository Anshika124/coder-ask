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
  const { quill, quillRef } = useQuill({ obj });

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
      let res = await axios.put(localDBUrl + "/questions/updatequestion", {
        questionId: id,
        title: title,
        tags: tags,
        description: quill.root.innerHTML,
        postedBy: JSON.parse(localStorage.getItem("userData"))._id
      });

      if (res.data.success) {
       
      navigate(`/question/${title.replace(/[?\/]/g, "")}/${id}`);
      } else {
        // console.log("msg"+res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };  

  useEffect(() => {
    const fetchQuestionInfo = async () => {
      try {
        const questionInfo = await axios.get(
          localDBUrl + "/questions/questionbyid",
          { params: { _id: id } }
        );
        setTitle(questionInfo.data[0].title);
        setTags(questionInfo.data[0].tags);

        if (quill) {
          // Use clipboard to set HTML content in Quill
          quill.clipboard.dangerouslyPasteHTML(questionInfo.data[0].description);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuestionInfo();
  }, [quill, id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='py-100 container Ask'>
      <div style={{ maxWidth: '770px', margin: '0 auto' }}>
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
        <div className='tagContainer' style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px', alignItems: 'center' }}>
          <TagsInput
            value={tags}
            onChange={setTags}
            name="fruits"
            placeHolder="Add question tags"
          />
        </div>
        <button onClick={handleSubmit} style={{ margin: '20px 0px' }}>Update</button>
      </div>
    </div>
  );
}

export default EditAsk;
