import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/home.jsx';
import Header from './header.jsx';
import Search from '../pages/search.jsx';
import Anime from '../pages/anime.jsx'
import Login from '../pages/login.jsx';
import Signup from '../pages/signup.jsx';
import Wl from '../pages/wl.jsx'
function App() {

  return (
    <div>
      
    <Router>
    <Header/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search/:malid' element={<Search />} />
          <Route path='/anime/:malid' element={<Anime />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/wl' element={<Wl />} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
