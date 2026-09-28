import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import { RL } from './content/pages/Loginpage';
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
          <nav className="navigation">
            <Link to="/home" className='navItem'>
              <h4>Home</h4>
            </Link>
            <Link to="books" className='navItem'>
              <h4>
                Books
              </h4>
            </Link>
            <Link to="movie" className='navItem'>
              <h4>
                Movie
              </h4>
            </Link>
          </nav>

        <Routes>
          <Route path='home' element={<News />} />
          <Route path='/news/:id' element={<NewsPost />} />
          <Route path='books' element={<Books />} />
          <Route path='/books/:id' element={<BookPost />} />
          <Route path='movie' element={<Movie />} />
          <Route path='/movie/:id' element={<MoviePost />} />
          <Route path="register" element={<RL />} />
          <Route path='adminPage' element={<Admin/>}></Route>
          <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        </Routes>

        <Footer />
      </BrowserRouter>

    </>
  )
}

export default App
