import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

const defaultTheme = createTheme();

const SIGN_MUTATION = gql`
  mutation registerUser(
    $name: String!
    $email: String!
    $password: String!
    $address: String!
  ) {
    register(name: $name, email: $email, password: $password, address: $address)
  }
`;

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [message, setMessage] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.address
    ) {
      setMessage("Please fill in all the required fields.");
      return;
    }
    try {
      await register({
        variables: {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          address: formData.address,
        },
      });
      setMessage("Successfully Submitted!.. Redirecting to Login");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const [register, { error }] = useMutation(SIGN_MUTATION);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "darkblue" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              type="text"
              name="name"
              margin="normal"
              required
              fullWidth
              autoFocus
              autoComplete="name"
              label="Name"
              value={formData.name}
              onChange={inputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
              value={formData.password}
              id="password"
              autoComplete="current-password"
              onChange={inputChange}
            />
            <TextField
              type="text"
              name="address"
              fullWidth
              id="address"
              autoComplete="address"
              required
              label="Address"
              margin="normal"
              value={formData.address}
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
              sx={{ mt: 3, mb: 2, backgroundColor: "darkblue" }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="center" alignItems="center">
              <Grid item>
                <Link href="login" variant="body2">
                  {"Already Have an Account? Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Signup;
