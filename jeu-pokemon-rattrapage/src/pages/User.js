import React, { useEffect, useState } from 'react';
import axios from 'axios';

function User() {
    const [user, setUser] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('/user', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                setUser(response.data);
                setName(response.data.name);
                setEmail(response.data.email);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des informations utilisateur', error);
            });
    }, []);

    const handleUpdateUser = () => {
        const token = localStorage.getItem('token');
        axios.put('/user', { name, email, password }, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                setUser(response.data);
                alert('Informations mises à jour avec succès');
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour des informations utilisateur', error);
            });
    };

    return (
        <div>
            <h1>Mon Compte</h1>
            <p>Nom : {user.name}</p>
            <p>Email : {user.email}</p>
            <h2>Modifier les informations</h2>
            <input
                type="text"
                placeholder="Nom"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={handleUpdateUser}>Mettre à jour</button>
        </div>
    );
}

export default User;
