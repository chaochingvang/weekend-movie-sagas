import { useHistory } from "react-router";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

function MovieForm() {

    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector(store => store.genres)
    const [movieInput, setMovieInput] = useState({
        title: ``,
        poster: ``,
        genre: ``,
        description: ``
    });

    useEffect(() => {
        dispatch({ type: `FETCH_GENRES` })
    }, []);


    const handleSubmit = () => {

    }

    console.log(movieInput);

    return (<>
        <h1>MOVIE FORM COMPONENT</h1>
        
        <button onClick={() => history.push(`/`)}>Back</button>

        <form onSubmit={handleSubmit}>
            <input
                placeholder="title"
                value={movieInput.title}
                onChange={(event) =>
                    setMovieInput({ ...movieInput, title: event.target.value })
                    }
            />
            <input
                placeholder="url"
                value={movieInput.poster}
                onChange={(event) =>
                    setMovieInput({ ...movieInput, poster: event.target.value })
                    }
            />
            <select
                value={movieInput.genre}
                onChange={(event) => setMovieInput({...movieInput, genre: event.target.value})}>
                <option value="0" disabled>Select A Genre</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
            </select>
            <textarea />
            <button type="submit">Submit</button>
        </form>
    </>)
}

export default MovieForm;