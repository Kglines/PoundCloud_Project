import { csrfFetch } from './csrf';

// Album Action Variables
const GET_ALBUMS = 'albums/get';
const CREATE_ALBUMS = 'albums/create';
const EDIT_ALBUMS = 'albums/edit';

// Album Actions
export const getAlbums = (album) => {
    return {
        type: GET_ALBUMS,
        payload: album
    }
}

export const createAlbum = (album) => {
    return {
        type: CREATE_ALBUMS,
        payload: album
    }
}

export const editAlbums = (album) => {
    return {
        type: EDIT_ALBUMS,
        payload: album
    }
}

// Album Thunks
export const fetchAlbums = () => async dispatch => {
    const res = await csrfFetch('/api/albums');

    if(res.ok){
        const albums = await res.json();
        dispatch(getAlbums(albums.Albums));
        console.log('albums', albums);
        return albums;
    }
}

export const fetchCreateAlbums = (album) => async dispatch => {
    const res = await csrfFetch('/api/albums', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(album),
    });

    if(res.ok){
        const album = await res.json();
        dispatch(createAlbum(album));
        return album;
    }
}

export const fetchEditAlbums = (album) => async dispatch => {
    const res = await csrfFetch(`/albums/${album.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(album)
    });

    if(res.ok){
        const album = await res.json();
        dispatch(editAlbums(album));
        return album;
    }
}

const initialState = {};

// ******** REDUCER *********
const albumsReducer = (state = initialState, action) => {
    let newState = {...state};
  switch (action.type) {
    case GET_ALBUMS:
        newState = action.payload
        return newState;
    case CREATE_ALBUMS:
        newState = action.payload;
        return newState;
    case EDIT_ALBUMS:
        newState = action.payload;
        return newState;
    default:
      return newState;
  }
};

export default albumsReducer;
