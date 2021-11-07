//libraries imports
import { HashRouter as Router, Route } from 'react-router-dom';

//file imports
import './App.css';
import MovieList from '../MovieList/MovieList';
import MovieDetails from '../MovieDetails/MovieDetails.jsx';
import MovieForm from '../MovieForm/MovieForm.jsx';

//mui imports
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        
        {/* Details page */}
        <Route path="/details">
          <MovieDetails />
        </Route>

        {/* Add Movie page */}
        <Route path="/form">
          <MovieForm />
        </Route>

      </Router>
    </div>
  );
}


export default App;
