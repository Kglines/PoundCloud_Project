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
    const res = await fetch(`/api/songs/${songId}/comments`)

    if (res.ok){
        const comments = await res.json();
        dispatch(getComments(comments));
        return comments;
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
        default:
            return newState
    }
}
