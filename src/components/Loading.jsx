import React from 'react'
import ReactLoading from 'react-loading'


function Loading() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 0px)' }}><ReactLoading type={'spin'} color={'#ffffff'} height={'50px'} width={'50px'} /></div>
    
  )
}

export default Loading