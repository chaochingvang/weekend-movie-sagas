import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import './MovieList.css'

//mui imports
import {Box} from '@mui/material'
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
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
            <div className="formBox">
                <Box
                    sx={{
                        width: 300,
                        height: 100,
                        // backgroundColor: 'primary.dark',
                        // border: '3px dashed black',
                        margin: 'auto',
                    }}>
                    <Card sx={{
                        width: 300,
                        height: 100,
                        backgroundColor: 'pink'
                    }}>
                    <h4>Your favorite movie not listed? </h4>
                        <Button
                            sx={{
                                color: 'black',
                            }}
                            variant="text"
                            startIcon={<AddCircleOutlineOutlinedIcon />}
                            onClick={() => history.push(`/form`)}>
                            ADD NEW MOVIE
                        </Button>
                    </Card>
                </Box>
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