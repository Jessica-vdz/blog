import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Homepage } from './content/homepage';
import { Loginpage } from './content/Loginpage';
import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <div className="Navigation">
          <h1>Jessica vd Zwaag</h1>
        <nav className="Navigation-Links">
          <Link to="homepage">Home</Link>
          <Link to="loginpage">Login / Register</Link>
        </nav>
        </div>


        <Routes>
          <Route path="homepage" element={<Homepage/>} />
          <Route path="loginpage" element = {<Loginpage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
