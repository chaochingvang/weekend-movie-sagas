import { useHistory } from "react-router";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

function MovieForm() {

    const dispatch = useDispatch();
    const history = useHistory();

    //grabbing genres from reducer
    const genres = useSelector(store => store.genres)

    //creating local state to store user input before sending to server
    const [movieInput, setMovieInput] = useState({
        title: ``,
        poster: ``,
        genre: ``,
        description: ``
    });

    //on load, grab the list of genres
    useEffect(() => {
        dispatch({ type: `FETCH_GENRES` });
    }, []);

    //on click
    const handleSubmit = (event) => {
        event.preventDefault();
        //if any input fields are left blank, alert user to enter information
        if ((movieInput.title === ``) ||
            (movieInput.poster === ``) ||
            (movieInput.genre === ``) ||
            (movieInput.description === ``)) {
            alert(`Please enter all information!`)
        }
        //otherwise, dispatch to post movie
        else {
            dispatch({ type: `ADD_MOVIE`, payload: movieInput });
            history.push(`/`);
        }
    }


    return (<>
        <h1>ADD A NEW MOVIE</h1>

        <form onSubmit={handleSubmit}>
            <label>Title: </label>
            <input
                placeholder="title"
                value={movieInput.title}
                onChange={(event) =>
                    setMovieInput({ ...movieInput, title: event.target.value })
                    }
            />
            <br />
            <label>Image URL: </label>
            <input
                placeholder="url"
                value={movieInput.poster}
                onChange={(event) =>
                    setMovieInput({ ...movieInput, poster: event.target.value })
                    }
            />
            <br />
            <label>Genre: </label>
            <select
                value={movieInput.genre}
                onChange={(event) => setMovieInput({...movieInput, genre: event.target.value})}>
                <option value="0" disabled>Select A Genre</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
            </select>
            <br />
            <label>Description: </label>
            <textarea
                rows={4}
                cols={30}
                value={movieInput.description}
                onChange={(event) => setMovieInput({...movieInput, description: event.target.value})}
                >
            </textarea>
            <br />
            <button type="button" onClick={() => history.push(`/`)}>Cancel</button>
            <button type="submit">Save</button>
        </form>
    </>)
}

export default MovieForm;