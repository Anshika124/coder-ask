import React from 'react'
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; 
import '../css/Ask.css'

function Ask() {
  const { quill, quillRef } = useQuill();

  console.log(quill);    
  console.log(quillRef); 

  return (
    <div className='askMainContainer'>
      <div className="askContainer" style={{ width: 770, height: 300 }}>
      <div ref={quillRef} />
    </div>
    </div>
  );
}

export default Ask