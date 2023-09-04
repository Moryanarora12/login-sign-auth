import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {gql,useMutation} from '@apollo/client';
import {Alert} from '@mui/material'
const defaultTheme = createTheme();

const LOGIN_MUTATION = gql`
mutation LoginMutation($email: String!, $password: String!){
  token: login(email: $email, password: $password)
}
`

export default function Login() {
    const navigate = useNavigate();
    React.useEffect(()=>{
        let login = localStorage.getItem('moryan');
        if(login){
            navigate('/')
        }
    })

    const [login,{loading,error}] = useMutation(LOGIN_MUTATION);

    const [formData,setFormData] = React.useState({
        email: '',
        password: ''
    })

    const inputChange = (e) =>{
        const {name,value} = e.target;
        setFormData((prevData)=>({
            ...prevData,
            [name]: value,
        }))
    }

    const [message,setMessage] = React.useState(null);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        console.log(formData);
        if (
          !formData.email ||
          !formData.password
        ) {
          setMessage("Please fill in all the required fields.");
          return;
        }
        try{
        const response = await login({
          variables:{
            email: formData.email,
            password: formData.password,
          }
        });
        setTimeout(()=>{
          setMessage("Successfully Login!..");
          navigate('/');
        })
        const token = response?.data?.token;
        if(token){
          localStorage.setItem('moryan',token);
          navigate('/');

        }
      }catch(error){
        console.error(error);
      }

        // localStorage.setItem('moryan',true);
        // navigate('/')
    }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'darkblue' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit}  noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={inputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={inputChange}
              
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {message && (
              <Alert
                severity={
                  message.includes("Successfully") ? "success" : "error"
                }
                sx={{ mt: 2 }}
              >
                {message}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
                
              sx={{ mt: 3, mb: 2,backgroundColor: 'darkblue' }}
            >
              Sign In
            </Button>
            <Grid container alignItems='center' justifyContent='center'>
              
              <Grid item>
                <Link href="sign" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}