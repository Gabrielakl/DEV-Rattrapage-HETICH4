import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Pokemon from './pages/Pokemon';
import User from './pages/User';
import ComposeTeam from './pages/ComposeTeam';
import Battle from './pages/Batlle';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> {/* Nouvelle route pour l'inscription */}
        <Route path="/pokemon" element={<Pokemon />} />
        <Route path="/compose-team" element={<ComposeTeam />} />
        <Route path="/user" element={<User />} />
        <Route path="/battle" element={<Battle />} />
      </Routes>
    </Router>
  );
}

export default App;
