import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = () => {
        axios.post('/user', { name, email, password })
            .then(response => {
                navigate('/login');
            })
            .catch(error => {
                console.error('Erreur lors de l\'inscription', error);
            });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Inscription</h1>
            <input
                type="text"
                placeholder="Nom"
                value={name}
                onChange={e => setName(e.target.value)}
                className="mb-4 px-4 py-2 border rounded w-64"
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="mb-4 px-4 py-2 border rounded w-64"
            />
            <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="mb-4 px-4 py-2 border rounded w-64"
            />
            <button
                onClick={handleSignup}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4">
                S'inscrire
            </button>
        </div>
    );
}

export default Signup;
