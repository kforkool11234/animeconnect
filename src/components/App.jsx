import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/home.jsx';
import Header from './header.jsx';
import Search from '../pages/search.jsx';
import Anime from '../pages/anime.jsx'
function App() {

  return (
    <div>
      
    <Router>
    <Header/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/anime' element={<Anime />} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
