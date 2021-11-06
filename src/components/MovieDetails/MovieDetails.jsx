import { useSelector } from "react-redux";
import { useHistory } from "react-router";


function MovieDetails() {
    const history = useHistory();
    const movie = useSelector(store => store.currentDetail);

    console.log(movie);

    const handleClick = () => {
        history.push(`/`);
    }
    return (<>{movie === `noMovie` ?
        <>
            <h1>No movie selected!</h1>
            <h3>Please go back and select a movie to view its details!</h3>
            <button onClick={handleClick}>Back</button>
        </> :
        
        <>
            <img src={movie.poster} />
            <h1>{movie.title}</h1>
            <p>{movie.description}</p>
            <button onClick={handleClick}>Back</button>
       </>}
    </>)
}

export default MovieDetails;