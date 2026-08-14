import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Homepage } from './content/pages/homepage';
import { useState } from 'react'
import './App.css'
import { Login, Register } from './content/pages/Loginpage';
import { Mailbot } from './content/components/mailbot';
import { Admin } from './content/pages/admin';
import { AdminRoute } from './content/components/adminRoute';
import { Recipes } from './content/pages/recipes';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="Navigation">
          <nav className="Navigation-Links">
            <Link to="homepage">Home</Link>
            <Link to="recipes">Recipes</Link>
            <Link to="register">Newsletter</Link>
            <Link to="newsletter">Mailbot</Link>
            <Link to="login">login</Link>
          </nav>
        </div>

        <Routes>
          <Route path="homepage" element={<Homepage />} />
          <Route path='recipes' element={<Recipes/>} />

          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="newsletter" element={<Mailbot />} />


          <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
