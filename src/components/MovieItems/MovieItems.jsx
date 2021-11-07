import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

//mui imports
import { Box } from '@mui/material'
import Card from '@mui/material/Card';


function MovieItems({ movie }) {

    const dispatch = useDispatch();
    const history = useHistory();
    const [isShown, setIsShown] = useState(false);

    const handleMovieClick = (movie) => {
        //dispatching to store selected movie details 
        dispatch({ type: `SET_DETAILS`, payload: movie });

        history.push(`/details`);
    }


    return (<>
        <div>
            <Box sx={{
                width: 300,
                height: 400,
                margin: 'auto',
                padding: '3px'
            }}>
                <Card
                    variant="outlined"
                    sx={{
                        width: 300,
                        height: 400,
                        margin: 'auto',
                        backgroundColor: 'beige'
                    }}>
                    <h3>{movie.title}</h3>
                    <img
                        src={movie.poster}
                        alt={movie.title}
                        onClick={() => handleMovieClick(movie)}
                        onMouseEnter={() => setIsShown(true)}
                        onMouseLeave={() => setIsShown(false)}
                    />
                    {isShown && (
                        <div>
                            <h5>Click to see details!</h5>
                        </div>
                    )}
                </Card>
            </Box>
        </div>
    </>)
}
export default MovieItems;