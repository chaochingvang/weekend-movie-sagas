import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './MovieDetails.css'

//mui imports
import { Box, Typography, Button } from '@mui/material'
import Card from '@mui/material/Card';
import HomeIcon from '@mui/icons-material/Home';

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
            <Typography variant="h1">No movie selected!</Typography>
            <h3>Please go back and select a movie to view its details!</h3>
            <Button
                variant="outlined"
                startIcon={<HomeIcon />}
                onClick={handleClick}
                sx={{
                    color: 'black',
                }}
            >
                Back
            </Button>
        </> :

        <>
            <Box sx={{
                width: 300,
                height: 400,
                margin: 'auto',
            }}>
                <Card
                    variant="outlined"
                    sx={{
                        width: 300,
                        height: 400,
                        margin: 'auto',
                        backgroundColor: '#b2dfdb',
                        border: 'solid black'
                    }}>
                    <img
                        className="posterImg"
                        src={movie.poster} />
                    <h2>{movie.title}</h2>
                </Card>
            </Box>
            <div className="details">
                <Typography variant="body1">
                    <p style={{ textDecoration: 'underline' }}>Genres: </p>
                    <p>- {genres.map(genre => (<> {genre.name} -</>))} <br /></p>
                    <p>{movie.description}</p>
                    <Button
                        variant="outlined"
                        startIcon={<HomeIcon />}
                        onClick={handleClick}
                        sx={{
                            color: 'black',
                        }}
                    >
                        Back
                    </Button>
                </Typography>
            </div>
        </>}
    </>)
}

export default MovieDetails;