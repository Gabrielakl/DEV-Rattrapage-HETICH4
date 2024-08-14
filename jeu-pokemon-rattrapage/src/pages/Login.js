import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        axios.post('/auth', { email, password })
            .then(response => {
                localStorage.setItem('token', response.data.token);
                navigate('/pokemon');
            })
            .catch(error => {
                console.error('Erreur lors de la connexion', error);
            });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Connexion</h1>
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
                onClick={handleLogin}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mb-4">
                Se connecter
            </button>
            <p>Pas encore inscrit ? <Link to="/signup" className="text-blue-500">Créer un compte</Link></p>
        </div>
    );
}

export default Login;
