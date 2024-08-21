import axios from 'axios';

const API_BASE_URL = 'http://94.74.86.174:8080/api';

const login = (username, password) => {
    return axios.post(`${API_BASE_URL}/login`, {
        username: username,
        password: password,
    });
};

const register = (email, username, password) => {
    return axios.post(`${API_BASE_URL}/register`, {
        email: email,
        username: username,
        password: password,
    });
};

const getChecklistData = () => {
    const token = localStorage.getItem('token');
    console.log(token);

    return axios.get(`${API_BASE_URL}/checklist`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const addChecklistData = (name) => {
    const token = localStorage.getItem('token');

    return axios.post(`${API_BASE_URL}/checklist`, {
        name: name
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const addChecklistItemData = (idChecklist, itemName) => {
    const token = localStorage.getItem('token');

    return axios.post(`${API_BASE_URL}/checklist/${idChecklist}/item`, {
        itemName: itemName
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const removeChecklistData = (id) => {
    const token = localStorage.getItem('token');

    return axios.delete(`${API_BASE_URL}/checklist/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
};

const removeChecklistDataItem = (idChecklist, idItem) => {
    const token = localStorage.getItem('token');
    console.log("DIS", idChecklist);

    return axios.delete(`${API_BASE_URL}/checklist/${idChecklist}/item/${idItem}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
};

const updateChecklistItemData = (idChecklist, idItem, itemName) => {
    const token = localStorage.getItem('token');
    console.log("DIS", idChecklist);
    return axios.put(`${API_BASE_URL}/checklist/${idChecklist}/item/rename/${idItem}`, {
        itemName: itemName
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}


export {
    login,
    register,
    getChecklistData,
    addChecklistData,
    removeChecklistData,
    removeChecklistDataItem,
    addChecklistItemData,
    updateChecklistItemData
};