import React, { useEffect, useState } from 'react';
import { getChecklistData } from '../Api/Api.js';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';

import { removeChecklistData as deleteServicenyo } from '../Api/Api.js';
import { removeChecklistDataItem as deleteitemServicenyo } from '../Api/Api.js';
import { updateStatusChecklistItemData } from '../Api/Api.js';


const ChecklistTodo = () => {
    const [checklists, setChecklists] = useState([]);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getChecklistData()
            .then(response => {
                setChecklists(response.data.data);
                console.log(response.data.data)
                navigate('/checklist');
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    const deleteService = (id) => {
        deleteServicenyo(id)
            .then(response => {
                setChecklists(checklists.filter(checklist => checklist.id !== id));
                console.log(response.data.data)
            })
            .catch(error => {
                setError(error.message);
            });
    }

    const deleteItemService = (idChecklist, idItem) => {
        deleteitemServicenyo(idChecklist, idItem)
            .then(response => {
                navigate('/checklist');
                // setChecklists(checklists.filter(checklist => checklist.id !== id));
                console.log(response.data.data)
            })
            .catch(error => {
                setError(error.message);
            });
    }

    const ListItemComp = ({ item, checklistId }) => {
        const [checked, setChecked] = useState(item.itemCompletionStatus);
        const handleCheckboxChange = async (event) => {
            const newChecked = event.target.checked;
            setChecked(newChecked);

            try {
                await updateStatusChecklistItemData(checklistId, item.id, newChecked);
                console.log('Suksesdd');
            } catch (error) {
                console.error('Ggal', error);
                setChecked(!newChecked);
            }
        };

        return (
            <ListItem key={item.id}>
                <Checkbox
                    checked={checked}
                    onChange={handleCheckboxChange}
                    disableRipple
                />
                <ListItemText primary={item.name} />
                <Button
                    variant="contained"
                    component={Link}
                    to="/tambahitem"
                    state={{ currentName: item.name, checklistId, statusPage: "update", idItem: item.id }}
                >
                    Ubah Item
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteItemService(checklistId, item.id)}
                >
                    Hapus Item
                </Button>
            </ListItem>
        );
    }
    return (
        <>
            <Box sx={{ minWidth: 275 }}>
                {error && <Typography color="error">{error}</Typography>}
                {checklists.length > 0 ? checklists.map(checklist => (
                    <>
                        <Card variant="outlined" key={checklist.id} sx={{ marginBottom: 2 }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {checklist.name}
                                </Typography>
                                {checklist.items && checklist.items.length > 0 ? (
                                    <List>
                                        {checklist.items.map(item => (
                                            <ListItemComp key={item.id} item={item} checklistId={checklist.id} />
                                            // <ListItem key={item.id}>
                                            //     <Checkbox
                                            //         checked={item.itemCompletionStatus}
                                            //         disableRipple
                                            //     />
                                            //     <ListItemText primary={item.name} />
                                            //     <Button variant="contained" component={Link} to="/tambahitem" state={{ currentName: item.name, checklistId: checklist.id, statusPage: "update", idItem: item.id }}>Ubah Item</Button>
                                            //     <Button variant="contained" color='error' onClick={() => deleteItemService(checklist.id, item.id)}>Hapus Item</Button>
                                            // </ListItem>
                                        ))}
                                        <Button variant="contained" component={Link} to="/tambahitem" state={{ checklistId: checklist.id, statusPage: "add" }}>Tambah Item</Button>
                                    </List>
                                ) : (
                                    <Typography variant="body2" color="text.secondary">
                                        No items available.
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                        <Button variant="contained" color='error' onClick={() => deleteService(checklist.id)}>Delete Checklist</Button>
                        <Button variant="contained" component={Link} to="/tambahchecklist">Add Checklist</Button>
                        <Button variant="contained" component={Link} onClick={() => localStorage.removeItem('token')} to="/">logout</Button>
                    </>
                )) :
                    <>
                        <Typography variant="h5" component="div" color="error">
                            Harus Login Dulu
                        </Typography>
                        <Button variant="contained" component={Link} to="/">Login Disini</Button>
                    </>
                }
            </Box>
        </>
    );
};

export default ChecklistTodo;
