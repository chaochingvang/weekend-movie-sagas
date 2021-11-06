import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

//// SAGAS ////
// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery(`FETCH_CURRENT_GENRES`, fetchCurrentGenres);
    yield takeEvery(`FETCH_GENRES`, fetchGenres);
    yield takeEvery(`ADD_MOVIE`, addMovie);
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch (err){
        console.log('get all error', err);
    }
}

function* fetchCurrentGenres(action) {
    try {
        const response = yield axios.get(`/api/genre/${action.payload}`)
        yield put({ type: `SET_CURRENT_GENRES`, payload: response.data });
    } catch (err) {
        console.log(`fetchCurrentGenres ERROR!`, err);
    }
}

function* fetchGenres(action) {
    try {
        const response = yield axios.get(`/api/genre`);
        yield put({ type: `SET_GENRES`, payload: response.data });
    } catch (err) {
        console.log(`fetchGenres ERROR!`, err);
    }
}

function* addMovie(action) {
    try {
        axios.post(`/api/movie`, {
            title: action.payload.title,
            poster: action.payload.poster,
            description: action.payload.description,
            genre_id: action.payload.genre
        })
        yield put({ type: `FETCH_MOVIES` });
    } catch (err) {
        console.log(`addMovie ERROR!`, err);
    }
}


// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();


//// REDUCERS ////

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store all genre list
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the current movie's genres
const currentGenres = (state = [], action) => {
    switch (action.type) {
        case 'SET_CURRENT_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// reducer to store current movie details
const currentDetail = (state = `noMovie`, action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            console.log(`this is payload`, action.payload);
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        currentGenres,
        currentDetail,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
