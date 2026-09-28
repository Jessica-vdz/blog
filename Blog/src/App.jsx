import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Homepage } from './content/pages/homepage';
import { useState } from 'react'
import './App.css'
import { Login, Register, RL } from './content/pages/Loginpage';
import { Admin } from './content/pages/admin';
import { AdminRoute } from './content/components/adminRoute';
import { News } from './content/pages/news';
import { Footer } from './content/components/footer';
import { Books } from './content/pages/books';
import { Movie } from './content/pages/movie';
import { NewsPost } from './content/pages/newsPost';
import { BookPost } from './content/pages/bookPost';
import { MoviePost } from './content/pages/moviePost';

function App() {
  return (
    <>
      <BrowserRouter>

        <div className="Navigation">
          <nav className="Navigation-Links">
            <Link to="">Home</Link>
            <Link to="books">Books</Link>
            <Link to="movie">Movie</Link>
          </nav>
        </div>

        <Routes>
          <Route path='' element={<News />} />
          <Route path='/news/:id' element={<NewsPost />} />
          <Route path='books' element={<Books />} />
          <Route path='/books/:id' element={<BookPost />} />
          <Route path='movie' element={<Movie />} />
          <Route path='/movie/:id' element={<MoviePost />} />
          <Route path="/register" element={<RL />} />
          <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        </Routes>

        <Footer />
      </BrowserRouter>

    </>
  )
}

export default App
