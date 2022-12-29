import { csrfFetch } from './csrf';

// Playlist Action Variables
const GET_PLAYLISTS = 'playlists/get';
const GET_PLAYLIST = 'playlist/get';
const CREATE_PLAYLISTS = 'playlists/create';
const EDIT_PLAYLISTS = 'playlists/edit';
const DELETE_PLAYLISTS = 'playlists/delete';
const ADD_TO_PLAYLIST = 'playlist/add';
const REMOVE_FROM_PLAYLIST = 'playlist/remove';

// Playlist Actions

// GET Playlists
export const getPlaylists = (playlists) => {
    return {
        type: GET_PLAYLISTS,
        payload: playlists
    };
};

// GET one Playlist
export const getPlaylist = (playlist) => {
    return {
        type: GET_PLAYLIST,
        payload: playlist
    }
}

// CREATE Playlist
export const createPlaylist = (playlist) => {
    return {
        type: CREATE_PLAYLISTS,
        payload: playlist
    };
};

// EDIT Playlist
export const editPlaylist = (playlist) => {
    return {
        type: EDIT_PLAYLISTS,
        payload: playlist
    };
};

// DELETE Playlist
export const deletePlaylist = (playlist) => {
    return {
        type: DELETE_PLAYLISTS,
        payload: playlist
    };
};

// ADD Song to Playlist
export const addToPlaylist = (song) => {
    return {
        type: ADD_TO_PLAYLIST,
        payload: song
    }
}

// Remove Song From Playlist
export const removeFromPlaylist = (song) => {
    return {
        type: REMOVE_FROM_PLAYLIST,
        payload: song
    }
}

// PLAYLIST THUNKS

// Get All Playlists
export const fetchPlaylists = () => async (dispatch) => {
    const res = await csrfFetch('/api/playlists');

    if (res.ok){
        const playlists = await res.json()
        dispatch(getPlaylists(playlists))
        return playlists
    };
    return res;
};

// Get One Playlist
export const fetchPlaylist = (playlistId) => async (dispatch) => {
    const res = await csrfFetch(`/api/playlists/${playlistId}`)

    if (res.ok){
        const playlist = await res.json();
        dispatch(getPlaylist(playlist));
        return playlist;
    };
    return res;
};

// Create Playlist
export const fetchCreatePlaylist = (playlist) => async (dispatch) => {
    const res = await csrfFetch('/api/playlists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(playlist)
    });

    if (res.ok){
        const playlist = await res.json();
        dispatch(createPlaylist(playlist));
        return playlist;
    };
    return res;
};

// Edit Playlist
export const fetchEditPlaylist = (playlist) => async (dispatch) => {
    const res = await csrfFetch(`/api/playlists/${playlist.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(playlist)
    });

    if (res.ok){
        const playlist = await res.json();
        dispatch(editPlaylist(playlist));
        return playlist;
    };
    return res;
};

// DELETE Playlist
export const fetchDeletePlaylist = (playlistId) => async (dispatch) => {
    console.log('DELETE FETCH = ', playlistId)
    const res = await csrfFetch(`/api/playlists/${playlistId}`, {
        method: 'DELETE'
    });
    if (res.ok){
        const playlist = await res.json();
        dispatch(deletePlaylist(playlist));
        return playlist;
    };
    return res;
};

// ADD Song to Playlist Thunk
export const fetchAddToPlaylist = (song, playlistId) => async (dispatch) => {
    console.log(song, parseInt(playlistId))
    const res = await csrfFetch(`/api/playlists/${playlistId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(song)
    });

    if (res.ok){
        const song = await res.json();
        dispatch(addToPlaylist(song));
        return song;
    };
    return res;
};

// Remove Song From Playlist Thunk
export const fetchRemoveFromPlaylist = (song, playlistId) => async (dispatch) => {
    const res = await csrfFetch(`/api/playlists/${playlistId}/${song.id}`, {
        method: 'DELETE'
    });
    console.log('RES IN REMOVE SONG = ', res)
    if(res.ok){
        const song = await res.json();
        dispatch(removeFromPlaylist(song));
        return song;
    };
    return res;
};

// REDUCER
const initialState = {};

const playlistReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type){
        case GET_PLAYLISTS:
            newState = action.payload;
            return newState;
        case GET_PLAYLIST:
            newState = action.payload;
            return newState;
        case CREATE_PLAYLISTS:
            newState = { ...state, [action.payload.id]: action.payload }
            return newState
        case EDIT_PLAYLISTS:
            newState = action.payload;
            return newState;
        case DELETE_PLAYLISTS:
            delete newState[action.payload];
            return newState;
        case ADD_TO_PLAYLIST:
            newState = action.payload;
            return newState;
        case REMOVE_FROM_PLAYLIST:
            delete newState[action.payload]
            return newState
        default:
            return newState;
    }
};

export default playlistReducer;
