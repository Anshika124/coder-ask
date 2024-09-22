import React from 'react'
import ReactLoading from 'react-loading'


function Loading() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 0px)', flexDirection: 'column', gap:'5px' }}>
      <ReactLoading type={'spin'} color={'#ffffff'} height={'50px'} width={'50px'} />
      <p>Fetching data, please wait 1 minute.</p>
    </div>

  )
}

export default Loading