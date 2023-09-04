import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {CircularProgress} from '@mui/material'
function Logout() {
    const navigate = useNavigate();
    
    useEffect(() =>{
        setTimeout(() => {
            localStorage.clear();
            navigate('/',{replace:true});
        }, 1000);
    },[navigate])
  return (
    <div style={{minHeight:'100%',minWidth:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <CircularProgress size={50}/>
    </div>
  )
}

export default Logout
