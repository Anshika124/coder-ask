import React from 'react'
import ReactLoading from 'react-loading'


function Loading() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 136px)' }}><ReactLoading type={'spin'} color={'#ffffff'} height={'5%'} width={'5%'} /></div>
    
  )
}

export default Loading