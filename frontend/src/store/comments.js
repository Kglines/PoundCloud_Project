import { csrfFetch } from './csrf';

// Action Variables
const GET_COMMENTS = 'comments/get';
const GET_COMMENT = 'comment/get';
const CREATE_COMMENT = 'comment/create';
const EDIT_COMMENT = 'comment/edit';
const DELETE_COMMENT = 'comment/delete';

// ******** ACTIONS ********
export const getComments = (comments) => {
    return {
        type: GET_COMMENTS,
        payload: comments
    };
};

export const getComment = (comment) => {
    return {
        type: GET_COMMENT,
        payload: comment
    };
};

export const createComment = (comment) => {
    return {
        type: CREATE_COMMENT,
        payload: comment
    };
};

export const editComment = (comment) => {
    return {
        type: EDIT_COMMENT,
        payload: comment
    };
};

export const deleteComment = (comment) => {
    return {
        type: DELETE_COMMENT,
        payload: comment
    };
};

// ******** THUNKS ********
export const fetchGetComments = (songId) => async (dispatch) => {
    const res = await csrfFetch(`/api/songs/${songId}/comments`);

    if (res.ok){
        const comments = await res.json();
        dispatch(getComments(comments));
        return comments;
    };
    return res;
};

export const fetchCreateComments = (songId, comment) => async (dispatch) => {
    const res = await csrfFetch(`/api/songs/${songId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment),
    });
    if(res.ok){
        const comment = await res.json();
        dispatch(createComment(comment));
        return comment;
    };
    return res;
};

export const fetchEditComments = (comment) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${comment.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment)
    });

    if (res.ok){
        const comment = await res.json();
        dispatch(editComment(comment));
        return comment;
    };
    return res;
};

export const fetchDeleteComments = (comment) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${comment}`, {
        method: 'DELETE'
    });

    if (res.ok){
        const comment = await res.json();
        dispatch(deleteComment(comment));
        return comment;
    };
    return res;
};



// ******** REDUCER ********

let initialState = {}

export const commentsReducer = (state = initialState, action) => {
    let newState = {...state}
    switch(action.type){
        case GET_COMMENTS:
            newState = action.payload
            return newState
        case CREATE_COMMENT:
            newState = { ...state, [action.payload.id]: action.payload};
            return newState;
        case EDIT_COMMENT:
            newState = action.payload;
            return newState;
        case DELETE_COMMENT:
            delete newState[action.payload]
            return newState;
        default:
            return newState
    }
}
