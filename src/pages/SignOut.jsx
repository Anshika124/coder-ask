import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function SignOut({setIsLoggedIn}) {

    const Navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('userData');
        setIsLoggedIn(false);
        Navigate('/');
    },[])
  return (
    <div></div>
  )
}

export default SignOut