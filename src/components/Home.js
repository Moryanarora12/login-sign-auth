import { Button } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function Home(){
    const navigate = useNavigate();
    const logout = () =>{
        navigate('logout')
    }
    return(
        <>
            Home
            <Button variant='contained' sx={{float: 'right'}} onClick={logout}>LOgOut</Button>
        </>
    )
}

export default Home;