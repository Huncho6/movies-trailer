import './App.css';
import MovieList from './components/MovieList';
import AddMovie from './components/AddMovie';
import MovieContextProvider from './components/MovieContext';
import { Routes, Route, useLocation } from 'react-router-dom';
import MovieDetail from './components/MovieDetail';

function App() {
  const { pathname }  = useLocation();
  
  return (
    <MovieContextProvider>
      {/* Conditionally render AddMovie based on the current route */}
      {pathname === '/' && <AddMovie />}
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </MovieContextProvider>
  );
}

export default App;
