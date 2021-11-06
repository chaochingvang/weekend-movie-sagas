import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";


function MovieDetails() {
    const dispatch = useDispatch();
    const history = useHistory();

    //grab current movie details from reducer 
    const movie = useSelector(store => store.currentDetail);
    //grab current movie genre from reducer
    const genres = useSelector(store => store.currentGenres);

    //initial render
    useEffect(() => {
        //if a movie was selected, dispatched to fetch genres of selected movie
        if (movie !== `noMovie`) {
            dispatch({ type: `FETCH_CURRENT_GENRES`, payload: movie.id })
        }
    }, []);

    //on click, navigate back to home
    const handleClick = () => {
        history.push(`/`);
    }

    //conditional rendering
    //if no movie was selected, renders and tell user to select a movie to see details
    return (<>{movie === `noMovie` ?
        <>
            <h1>No movie selected!</h1>
            <h3>Please go back and select a movie to view its details!</h3>
            <button onClick={handleClick}>Back</button>
        </> :
        
        <>
            <img src={movie.poster} />
            <h1>{movie.title}</h1>
            <p>Genres: <br />
                - {genres.map(genre => (<> {genre.name} -</>))}</p>
            <p>{movie.description}</p>
            <button onClick={handleClick}>Back</button>
       </>}
    </>)
}

export default MovieDetails;