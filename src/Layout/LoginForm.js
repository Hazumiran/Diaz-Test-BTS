import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
// import axios from 'axios';

import { login as loginService } from '../Api/Api.js';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    const handleLogin = () => {
        loginService(username, password)
            .then((response) => {
                // console.log('Ini tokenku udah yak:', response.data.data.token);
                localStorage.setItem('token', response.data.data.token);
                // console.log('Msg', response.message);
                setSuccess('Login successful !');
                setError(null);
                navigate('/checklist');
            })
            .catch(error => {
                setError(error.message);
                setSuccess(null);
                // console.error('Error during login:', error);
            });

        // const loginData = { username, password };
        // axios.post('http://94.74.86.174:8080/api/login', loginData)
        //     .then(response => {
        //         // console.log('Login successful udah yak:', response.data);
        //         localStorage.setItem('token', response.data.token);
        //         // console.log('Msg', response.message);
        //         setSuccess('Login successful !');
        //         setError(null);
        //     })
        //     .catch(error => {
        //         setError(error.message);
        //         setSuccess(null);
        //         console.error('Error during login:', error);
        //     });
    };

    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2">
                        Login Form
                    </Typography>
                    <Typography variant="h6">
                        Username
                    </Typography>
                    <TextField
                        id="username"
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Typography variant="h6">
                        Password
                    </Typography>
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleLogin}>
                        Login
                    </Button>
                    <Button size="small" component={Link} to="/register">
                        Register
                    </Button>
                </CardActions>
            </Card>
            {error != null ? <Typography color="error">{error}</Typography> : <Typography color="info">{success}</Typography>}
        </Box>
    );
};

export default LoginForm;
