import { csrfFetch } from './csrf';

// Playlist Action Variables
const GET_PLAYLISTS = 'playlists/get';
const GET_PLAYLIST = 'playlist/get';
const CREATE_PLAYLISTS = 'playlists/create';
const EDIT_PLAYLISTS = 'playlists/edit';
const DELETE_PLAYLISTS = 'playlists/delete';

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
        type: getPlaylist,
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

// PLAYLIST THUNKS
