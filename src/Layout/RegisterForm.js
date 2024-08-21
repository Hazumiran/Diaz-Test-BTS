import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleRegister = () => {
        const registerData = { email, username, password };
        axios.post('http://94.74.86.174:8080/api/register', registerData)
            .then(response => {
                setSuccess('Registration successful !');
                setError(null);
            })
            .catch(error => {
                setError(error.message);
                setSuccess(null);
            });
    };

    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2">
                        Register Form
                    </Typography>
                    <Typography variant="h6">
                        Email
                    </Typography>
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
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
                    <Button size="small" onClick={handleRegister}>
                        Register
                    </Button>
                    <Button size="small" component={Link} to="/">
                        Login
                    </Button>
                </CardActions>
            </Card>
            {error != null ? <Typography color="error">{error}</Typography> : <Typography color="info">{success}</Typography>}
        </Box>
    );
};

export default RegisterForm;
