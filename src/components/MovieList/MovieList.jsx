import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import './MovieList.css'

function MovieList() {

    const dispatch = useDispatch();
    const history = useHistory();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);


    const handleMovieClick = (movie) => {
        //dispatching to store selected movie details 
        dispatch({ type: `SET_DETAILS`, payload: movie });

        history.push(`/details`);
    }

    return (
        <main>
            <h1>MovieList</h1>
            <div>
                <h4>Your favorite movie not listed? </h4>
                <button onClick={() => history.push(`/form`)}>ADD NEW MOVIE</button>
            </div>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title} onClick={() => handleMovieClick(movie)}/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;