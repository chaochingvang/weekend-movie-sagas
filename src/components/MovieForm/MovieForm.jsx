import { useHistory } from "react-router";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

//mui import
import { Box, Typography, TextField, FormControl, Select, MenuItem, Stack, Button, Card } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
// import {TextField} from '@mui/material';
// import { FormControl } from '@mui/material';
// import {Select} from '@mui/material';



function MovieForm() {

    const dispatch = useDispatch();
    const history = useHistory();

    //grabbing genres from reducer
    const genres = useSelector(store => store.genres)

    //creating local state to store user input before sending to server
    const [movieInput, setMovieInput] = useState({
        title: ``,
        poster: ``,
        genre: 0,
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
        <div>
            <Box sx={{
                width: '50%',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: '8em',
                marginTop: '3em'

            }}>
                <Card sx={{
                    width: '100%',
                    backgroundColor: 'pink',
                    paddingTop: '10px'
                }}>
                    <Typography variant="h3">New Movie:</Typography>
                    <Box sx={{
                        width: '60%',
                        height: 400,
                        margin: 'auto',
                        paddingTop: '10px',
                    }}>
                        <FormControl onSubmit={handleSubmit}>
                            <TextField
                                required
                                label="title"
                                value={movieInput.title}
                                onChange={(event) =>
                                    setMovieInput({ ...movieInput, title: event.target.value })
                                }
                            />
                            <br />
                            <TextField
                                required
                                label="image url"
                                value={movieInput.poster}
                                onChange={(event) =>
                                    setMovieInput({ ...movieInput, poster: event.target.value })
                                }
                            />
                            <br />
                            <Select
                                required
                                value={movieInput.genre}
                                onChange={(event) => setMovieInput({ ...movieInput, genre: event.target.value })}>
                                <MenuItem value="0" disabled selected>Select A Genre</MenuItem>
                                {genres.map((genre) => (
                                    <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
                                ))}
                            </Select>
                            <br />
                            <TextField
                                required
                                multiline
                                maxRows={5}
                                label="description"
                                value={movieInput.description}
                                onChange={(event) => setMovieInput({ ...movieInput, description: event.target.value })}
                            />
                            <br />
                            <Stack direction="row" spacing={25}>
                                <Button
                                    variant="outlined"
                                    type="button"
                                    startIcon={<ClearIcon />}
                                    sx={{
                                        color: 'black',
                                    }}
                                    onClick={() => history.push(`/`)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="outlined"
                                    endIcon={<SaveIcon />}
                                    sx={{
                                        color: 'black',
                                    }}
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </Stack>

                        </FormControl>
                    </Box>
                </Card>
            </Box>

        </div>
    </>)
}

export default MovieForm;