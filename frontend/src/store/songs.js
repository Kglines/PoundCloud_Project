import { csrfFetch } from './csrf';

// ACTION VARIABLES
const GET_SONGS = 'songs/get';
const CREATE_SONGS = 'songs/create';
const EDIT_SONGS = 'songs/edit';
const DELETE_SONGS = 'songs/delete';

// ******** ACTIONS ********

// Get all the songs
export const getSongs = (songs) => {
    return {
        type: GET_SONGS,
        payload: songs
    }
}

// Create a song
export const createSongs = (song) => {
    return {
        type: CREATE_SONGS,
        payload: song
    }
}

// Edit a song
export const editSong = (song) => {
    return {
        type: EDIT_SONGS,
        payload: song
    }
}

// Delete a song
export const deleteSongs = (id) => {
    return {
      type: DELETE_SONGS,
      payload: id
    };
}

// THUNKS
// Get all songs thunk
export const fetchAllSongs = () => async dispatch => {
    const songs = await csrfFetch('/api/songs');

    if(songs.ok){
        const res = await songs.json();
        dispatch(getSongs(res.Songs));
        return songs;
    }
}

// Create a song based on album id thunk
export const fetchCreateSongs = (song, albumId) => async dispatch => {
    const res = await csrfFetch(`/api/albums/${albumId}/song`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(song)
    });

    if(res.ok){
        const song = await res.json();
        dispatch(createSongs(song));
        return song;
    }
}

// Edit song thunk
export const fetchEditSong = (song) => async dispatch => {
    const res = await csrfFetch(`/api/songs/${song.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(song)
    });

    if(res.ok){
        const song = await res.json();
        dispatch(editSong(song));
        return song;
    }
}

// Delete a song thunk
export const fetchDeleteSongs = (id) => async dispatch => {
    const res = await csrfFetch(`/api/songs/${id}`, {
        method: 'DELETE'
    })

    if(res.ok){
        const song = await res.json();
        dispatch(deleteSongs(id));
        return song;
    }
}

const initialState = {};

// ******** REDUCER ********

const songsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type){
        case GET_SONGS:
            action.payload.forEach(song => newState[song.id] = song)
            // console.log('newState = ', newState);
        return newState;
        case CREATE_SONGS:
            newState[action.payload.id] = action.payload;
            return newState;
        case EDIT_SONGS:
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_SONGS:
            delete newState[action.payload.id];
            return newState;
        default:
            return newState;
    }
}

export default songsReducer;
