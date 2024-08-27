import './App.css'
import MovieList from './components/MovieList';
import AddMovie from './components/AddMovie';
import MovieContextProvider from './components/MovieContext';
import Filter from './components/Filter';

function App() {
  return (
    <MovieContextProvider>
      <AddMovie />
      <Filter />
      <MovieList />
    </MovieContextProvider>
  )
}

export default App;
