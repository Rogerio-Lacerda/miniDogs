import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Login from './Components/Login';
import Photos from './Components/Photos';

function App() {
  return (
    <>
      <BrowserRouter>
        <section className="container">
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/minidogs" element={<Photos />} />
          </Routes>
        </section>
      </BrowserRouter>
    </>
  );
}

export default App;
