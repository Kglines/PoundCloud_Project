import { csrfFetch } from "./csrf";

const GET_USER_SONGS = 'user/getSongs';
const GET_USER_ALBUMS = 'user/getAlbums';
const GET_USER_PLAYLISTS = 'user/getPlaylists';

export const getUserSongs = (songs) => {
    return {
        type: GET_USER_SONGS,
        payload: songs
    }
}

export const getUserAlbums = (albums) => {
    return {
        type: GET_USER_ALBUMS,
        payload: albums
    }
}

export const getUserPlaylists = (playlists) => {
    return {
        type: GET_USER_PLAYLISTS,
        payload: playlists
    }
}

export const fetchGetUserSongs = () => async (dispatch) => {
    const res = await csrfFetch(`/api/currentuser/songs`)

    if (res.ok){
        const songs = await res.json()
        dispatch(getUserSongs(songs))
        return songs;
    }
    return res
}
export const fetchGetUserAlbums = () => async (dispatch) => {
    const res = await csrfFetch(`/api/currentuser/albums`)

    if (res.ok){
        const albums = await res.json()
        dispatch(getUserAlbums(albums))
        return albums;
    }
    return res
}
export const fetchGetUserPlaylists = () => async (dispatch) => {
    const res = await csrfFetch(`/api/currentuser/playlists`)

    if (res.ok){
        const playlists = await res.json()
        dispatch(getUserPlaylists(playlists))
        return playlists;
    }
    return res
}

const initialState = {};

export const currentUserReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch(action.type){
        case GET_USER_SONGS:
            newState = action.payload;
            return newState;
        case GET_USER_ALBUMS:
            newState = action.payload;
            return newState;
        case GET_USER_PLAYLISTS:
            newState = action.payload;
            return newState;
        default:
            return newState;
    }
};

export default currentUserReducer;
