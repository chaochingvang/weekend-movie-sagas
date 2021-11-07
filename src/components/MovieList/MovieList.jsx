import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import './MovieList.css'
import MovieItems from '../MovieItems/MovieItems.jsx';

//mui imports
import {Box} from '@mui/material'
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';

function MovieList() {

    const dispatch = useDispatch();
    const history = useHistory();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <div className="formBox">
                <Box
                    sx={{
                        width: 300,
                        height: 200,
                        // backgroundColor: 'primary.dark',
                        // border: '3px dashed black',
                        margin: 'auto',
                    }}>
                    <Card sx={{
                        width: 300,
                        height: 150,
                        backgroundColor: 'pink'
                    }}>
                        <h4>Your favorite movie not listed? </h4>
                        <MovieOutlinedIcon fontSize="large" /> <br />
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
                        <MovieItems
                            key={movie.id}
                            movie={movie} />
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;