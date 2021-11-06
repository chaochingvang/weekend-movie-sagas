import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";


function MovieDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const movie = useSelector(store => store.currentDetail);
    const genres = useSelector(store => store.genres);

    useEffect(() => {
        if (movie !== `noMovie`) {
            dispatch({ type: `FETCH_GENRES`, payload: movie.id })
        }
    }, []);

    const handleClick = () => {
        history.push(`/`);
    }

    let genreRender = genres.map(genre => (<> {genre.name} -</>));

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
            - {genreRender}</p>
            <p>{movie.description}</p>
            <button onClick={handleClick}>Back</button>
       </>}
    </>)
}

export default MovieDetails;