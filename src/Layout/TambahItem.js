import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
// import axios from 'axios';

import { addChecklistItemData as tambahService } from '../Api/Api.js';
import { updateChecklistItemData as updateServicenyo } from '../Api/Api.js';

const TambahItem = () => {
    const [checklistitemName, setChecklistitemName] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [valueStatus, setValueStatus] = useState('');
    const navigate = useNavigate();

    const location = useLocation();
    const { checklistId, statusPage, currentName, idItem } = location.state || {};

    const handleLogin = () => {
        // console.log("Cehk ngab", checklistId)
        tambahService(checklistId, checklistitemName)
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

    const updateService = () => {
        // console.log("Cehk ngab", checklistId)
        updateServicenyo(checklistId, idItem, checklistitemName)
            .then((response) => {
                // console.log('Ini tokenku udah yak:', response.data.data.token);
                // localStorage.setItem('token', response.data.data.token);
                console.log('Msg', response);
                setSuccess('update successful !');
                setError(null);
                navigate('/checklist');
            })
            .catch(error => {
                setError(error.message);
                setSuccess(null);
                // console.error('Error during login:', error);
            });
    };
    useEffect(() => {
        setValueStatus(statusPage)
    }, [])

    // React.useEffect(() => {
    //     console.log("Perubahan Nama nya", checklistitemName)
    // }, [checklistitemName])

    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2">
                        Tambah Item
                    </Typography>
                    <Typography variant="h6">
                        Nama Checklist
                    </Typography>
                    <TextField
                        id="checklistitemName"
                        label="checklistitemName"
                        variant="outlined"
                        value={valueStatus === "update" ? currentName : checklistitemName}
                        onChange={(e) => {
                            setChecklistitemName(e.target.value)
                            setValueStatus('add')
                        }}
                    />
                </CardContent>
                <CardActions>
                    {statusPage === "update" ?
                        <Button size="small" onClick={updateService}>
                            Update
                        </Button>
                        :
                        <Button size="small" onClick={handleLogin}>
                            Tambah
                        </Button>
                    }


                    <Button size="small" component={Link} to="/checklist">
                        Kembali
                    </Button>
                </CardActions>
            </Card>
            {error != null ? <Typography color="error">{error}</Typography> : <Typography color="info">{success}</Typography>}
        </Box>
    );
};

export default TambahItem;
