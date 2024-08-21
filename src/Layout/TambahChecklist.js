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

import { addChecklistData as tambahService } from '../Api/Api.js';

const TambahChecklist = () => {
    const [checklistname, setChecklistname] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    const handleLogin = () => {
        tambahService(checklistname)
            .then((response) => {
                // console.log('Ini tokenku udah yak:', response.data.data.token);
                // localStorage.setItem('token', response.data.data.token);
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

    };

    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2">
                        Tambah Checklist
                    </Typography>
                    <Typography variant="h6">
                        Nama Checklist
                    </Typography>
                    <TextField
                        id="checklistname"
                        label="checklistname"
                        variant="outlined"
                        value={checklistname}
                        onChange={(e) => setChecklistname(e.target.value)}
                    />
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleLogin}>
                        Tambah
                    </Button>
                    <Button size="small" component={Link} to="/checklist">
                        Kembali
                    </Button>
                </CardActions>
            </Card>
            {error != null ? <Typography color="error">{error}</Typography> : <Typography color="info">{success}</Typography>}
        </Box>
    );
};

export default TambahChecklist;
