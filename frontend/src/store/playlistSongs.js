import { csrfFetch } from './csrf';

// PlaylistSongs Actions Variables
const GET_PLAYLIST_SONGS = 'playlistSongs/get';
const CREATE_PLAYLIST_SONGS = 'playlistSongs/create';
const DELETE_PLAYLIST_SONGS = 'playlistSongs/delete';

// PlaylistSongs Actions

// Get PlaylistSongs
export const getPlaylistSongs = (playlistSongs) => {
    return {
        type: GET_PLAYLIST_SONGS,
        payload: playlistSongs
    };
};

// Create PlaylistSongs
export const createPlaylistSongs = (playlistSong) => {
    return {
        type: CREATE_PLAYLIST_SONGS,
        payload: playlistSong
    };
};

// Delete PlaylistSongs
export const deletePlaylistSong = (playlistSong) => {
    return {
        type: DELETE_PLAYLIST_SONGS,
        payload: playlistSong
    };
};

// PlaylistSongs Thunks
export const fetchPlaylistSongs = (playlistId) => async (dispatch) => {
    const res = await csrfFetch(`/api/playlists/${playlistId}/songs`);

    if (res.ok){
        const playlistSongs = await res.json();
        dispatch(getPlaylistSongs(playlistSongs));
        return playlistSongs;
    };
    return res;
};

export const fetchCreatePlaylistSong = (playlistSong) => async (dispatch) => {
    const res = await csrfFetch(`/api/playlistsongs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(playlistSong)
    })

    if (res.ok){
        const song = await res.json();
        dispatch(createPlaylistSongs(song));
        return song;
    };
    return res;
};

// Delete Playlist Song Thunk
export const fetchDeletePlaylistSong = (playlistSong) => async (dispatch) => {
    const res = await csrfFetch(`/api/playlistsongs/${playlistSong.id}`, {
      method: 'DELETE',
    });
    
    if (res.ok){
        const playlistSong = await res.json();
        dispatch(deletePlaylistSong(playlistSong));
        return playlistSong;
    };
    return res;
};



// Reducer
const initialState = {};

const playlistSongReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch(action.type){
        case GET_PLAYLIST_SONGS:
            newState = action.payload;
            return newState;
        case DELETE_PLAYLIST_SONGS:
            delete newState[action.payload];
            return newState;
        default:
            return newState
    }
}

export default playlistSongReducer;
