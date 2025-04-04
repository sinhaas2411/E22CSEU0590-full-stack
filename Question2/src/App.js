import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import './App.css';

// Import pages
import TopUsers from './pages/TopUsers';
import TrendingPosts from './pages/TrendingPosts';
import Feed from './pages/Feed';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">Social Media Analytics</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink className={({isActive}) => "nav-link" + (isActive ? " active" : "")} to="/">Top Users</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({isActive}) => "nav-link" + (isActive ? " active" : "")} to="/trending">Trending Posts</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({isActive}) => "nav-link" + (isActive ? " active" : "")} to="/feed">Feed</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="app-container">
          <Routes>
            <Route path="/" element={<TopUsers />} />
            <Route path="/trending" element={<TrendingPosts />} />
            <Route path="/feed" element={<Feed />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 