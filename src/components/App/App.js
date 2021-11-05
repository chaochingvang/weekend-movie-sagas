import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import MovieDetails from '../MovieDetails/MovieDetails.jsx';
import MovieForm from '../MovieForm/MovieForm.jsx';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        
        {/* Details page */}
        <MovieDetails />

        {/* Add Movie page */}
        <MovieForm />

      </Router>
    </div>
  );
}


export default App;
