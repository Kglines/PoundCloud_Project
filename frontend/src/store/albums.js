import { csrfFetch } from './csrf';

// Album Action Variables
const GET_ALBUMS = 'albums/get';
const GET_ALBUM = 'album/get'
const CREATE_ALBUMS = 'albums/create';
const EDIT_ALBUMS = 'albums/edit';
const DELETE_ALBUMS = 'albums/delete';

// Album Actions
// Get albums
export const getAlbums = (album) => {
  return {
    type: GET_ALBUMS,
    payload: album,
  };
};

// Get one album
export const getAlbum = (album) => {
  return {
    type: GET_ALBUM,
    payload: album
  }
}

// Create albums
export const createAlbum = (album) => {
  return {
    type: CREATE_ALBUMS,
    payload: album,
  };
};

// Edit albums
export const editAlbums = (album) => {
  return {
    type: EDIT_ALBUMS,
    payload: album,
  };
};

// Delete albums
export const deleteAlbums = (id) => {
  return {
    type: DELETE_ALBUMS,
    payload: id,
  };
};

// Album Thunks

// Get all albums
export const fetchAlbums = () => async (dispatch) => {
  const res = await csrfFetch('/api/albums');

  if (res.ok) {
    const albums = await res.json();
    dispatch(getAlbums(albums.Albums));
    return albums;
  }
  return res;
};

// Get one album thunk
export const fetchAlbum = (albumId) => async (dispatch) => {
  const res = await csrfFetch(`/api/albums/${albumId}`)

  if(res.ok){
    const album = await res.json();
    dispatch(getAlbum(album))
    return album;
  }
  return res;
}

// Create Albums thunk
export const fetchCreateAlbums = (album) => async (dispatch) => {
  const res = await csrfFetch('/api/albums', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(album),
  });

  if (res.ok) {
    const album = await res.json();
    dispatch(createAlbum(album));
    return album;
  }
  return res;
};

// Edit albums thunk
export const fetchEditAlbums = (album) => async (dispatch) => {
  const res = await csrfFetch(`/api/albums/${album.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(album),
  });

  if (res.ok) {
    const album = await res.json();
    dispatch(editAlbums(album));
    return album;
  }
  return res;
};

// Delete albums thunk
export const fetchDeleteAlbums = (albumId) => async (dispatch) => {
  const res = await csrfFetch(`/api/albums/${albumId}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    const album = await res.json();
    dispatch(deleteAlbums(album));
    return album;
  }
  return res;
};

const initialState = {};

// ******** REDUCER *********
const albumsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALBUMS:
      newState = action.payload;
      return newState;
    case GET_ALBUM:
      newState = action.payload;
      return newState;
    case CREATE_ALBUMS:
      newState = { ...state, [action.payload.id]: action.payload }
      return newState;
    case EDIT_ALBUMS:
      newState = action.payload;
      return newState;
    case DELETE_ALBUMS:
      delete newState[action.payload];
      return newState;
    default:
      return newState;
  }
};

export default albumsReducer;
