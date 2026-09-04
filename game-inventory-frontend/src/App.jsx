import './App.css';
import './cookieconsent.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import AdminPanel from './pages/AdminPanel';
import GamePanel from './pages/GamePanel';

function App(){

  const API_BASE = "http://localhost:8080/api/items";

  return (
    <BrowserRouter>
       <div className="container">

        <nav className="navigation">
            <Link to="/admin" className="admin-button">Admin Panel</Link>
            <Link to="/game" className="game-button">Game Panel</Link>
        </nav>
        <div className="main-content">       
          <Routes>
            <Route path="/admin" element={<AdminPanel api={API_BASE} />} />
            <Route path="/game" element={<GamePanel api={API_BASE} />} />

          </Routes>  
        </div>  
        <footer>
            <div className="footer-container">
              <p className="copyright">&copy; 2026 sunnyandkate</p>         
              <div className="footer-right">
                  <a href="https://sunnyandkate.github.io/legal.html">legal <span>| </span></a>
                  <a href="https://sunnyandkate.github.io/privacypolicy.html">privacy policy</a>
              </div>
            </div>
        </footer>              
      </div>          
    </BrowserRouter>
  );
}

export default App;