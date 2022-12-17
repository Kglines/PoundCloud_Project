import { csrfFetch } from './csrf';

// ACTION VARIABLES
const GET_SONGS = 'songs/get';
const GET_SONG = 'song/get';
const CREATE_SONGS = 'songs/create';
const EDIT_SONGS = 'songs/edit';
const DELETE_SONGS = 'songs/delete';

// ******** ACTIONS ********

// Get all the songs
export const getSongs = (songs) => {
  return {
    type: GET_SONGS,
    payload: songs,
  };
};

// Get a song
export const getSong = (song) => {
  return {
    type: GET_SONG,
    payload: song
  }
}

// Create a song
export const createSongs = (song) => {
  return {
    type: CREATE_SONGS,
    payload: song,
  };
};

// Edit a song
export const editSong = (song) => {
  return {
    type: EDIT_SONGS,
    payload: song,
  };
};

// Delete a song
export const deleteSongs = (id) => {
  return {
    type: DELETE_SONGS,
    payload: id,
  };
};

// THUNKS
// Get all songs thunk
export const fetchAllSongs = () => async (dispatch) => {
  const res = await csrfFetch('/api/songs');

  if (res.ok) {
    const songs = await res.json();
    dispatch(getSongs(songs.Songs));
    return songs;
  }
  return res;
};

// Get a song thunk
export const fetchSong = (songId) => async (dispatch) => {
  const res = await csrfFetch(`/api/songs/${songId}`);

  if(res.ok){
    const song = await res.json();
    dispatch(getSong(song));
    return song;
  }
  return res;
}

// Create a song thunk

export const fetchCreateSongs = (song) => async (dispatch) => {
  const { title, description, imageUrl, albumId, url } = song;

  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('imageUrl', imageUrl);
  formData.append('albumId', albumId);
  // formData.append('url', url);
  if(url) formData.append('url', url);
  
  // console.log('SONG IN FETCH = ', song)

  const res = await csrfFetch('/api/songs', {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: formData,
  });
  // console.log('RES IN THUNK = ', res)
  if(res.ok){
    const data = await res.json();
    dispatch(createSongs(data));
    return data;
  }
  return res;
}

// Edit song thunk
export const fetchEditSong = (song) => async (dispatch) => {
  const res = await csrfFetch(`/api/songs/${song.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(song),
  });

  if (res.ok) {
    const song = await res.json();
    dispatch(editSong(song));
    return song;
  }
  return res;
};

// Delete a song thunk
export const fetchDeleteSongs = (songId) => async (dispatch) => {
  const res = await csrfFetch(`/api/songs/${songId}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    const song = await res.json();
    dispatch(deleteSongs(song));
    return song;
  }
  return res;
};

const initialState = {};

// ******** REDUCER ********

const songsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_SONGS:
      // action.payload.forEach((song) => (newState[song.id] = song));
      newState = action.payload
      return newState;
    case GET_SONG:
      newState = action.payload;
      return newState;
    case CREATE_SONGS:
      newState = { ...state, [action.payload.id]: action.payload }
      // newState = action.payload;
      return newState;
    case EDIT_SONGS:
      // newState = { ...state, [action.payload.id]: action.payload}
      newState = action.payload;
      return newState;
    case DELETE_SONGS:
      delete newState[action.payload];
      return newState;
    default:
      return newState;
  }
};

export default songsReducer;
