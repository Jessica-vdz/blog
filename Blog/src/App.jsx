import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Homepage } from './content/homepage';
import { Loginpage } from './content/Loginpage';
import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <nav>
          <Link to="homepage">Home</Link>
          <Link to="loginpage">Login / Register</Link>
        </nav>

        <Routes>
          <Route path="homepage" element={<Homepage/>} />
          <Route path="loginpage" element = {<Loginpage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
