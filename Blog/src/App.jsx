import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Homepage } from './content/pages/homepage';
import { useState } from 'react'
import './App.css'
import { Login, Register, RL } from './content/pages/Loginpage';
import { Mailbot } from './content/components/mailbot';
import { Admin } from './content/pages/admin';
import { AdminRoute } from './content/components/adminRoute';
import { News } from './content/pages/news';
import { Footer } from './content/components/footer';
import { Books } from './content/pages/books';
import { Movie } from './content/pages/movie';

function App() {
  return (
    <>
      <BrowserRouter>

        <div className="Navigation">
          <nav className="Navigation-Links">
            <Link to="/">Home</Link>
            <Link to="news">News</Link>
            <Link to="/">Projects</Link>
            <Link to="books">Books</Link>
            <Link to="movie">Movie</Link>
            <Link to="register">Newsletter</Link>
          </nav>
        </div>

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path='news' element={<News />} />
          <Route path='books' element={<Books/>} />
          <Route path='movie' element={<Movie/>}/>
          <Route path="register" element={<RL />} />
          <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </>
  )
}

export default App
