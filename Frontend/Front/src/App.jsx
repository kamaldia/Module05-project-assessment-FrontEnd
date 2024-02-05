import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Login from './Pages/Login.jsx';
import Products from './Pages/Products.jsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  )
}

export default App
