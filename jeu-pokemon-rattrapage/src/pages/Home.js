import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Bienvenue sur le jeu Pokémon</h1>
            <p className="text-lg text-gray-700 mb-8">Connectez-vous pour gérer vos Pokémon et votre compte utilisateur.</p>
            <div className="flex space-x-4">
                <Link to="/signup" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    S'inscrire
                </Link>
                <Link to="/login" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    Se connecter
                </Link>
            </div>
        </div>
    );
}

export default Home;
