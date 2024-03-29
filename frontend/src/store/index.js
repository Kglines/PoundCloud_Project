import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import albumsReducer from "./albums";
import { commentsReducer } from "./comments";
import playlistReducer from "./playlists";
import sessionReducer from './session';
import songsReducer from "./songs";
import playlistSongsReducer from './playlistSongs';
import currentUserReducer from "./currentUser";

const rootReducer = combineReducers({
  // add reducer functions here
  session: sessionReducer,
  songs: songsReducer,
  albums: albumsReducer,
  playlists: playlistReducer,
  comments: commentsReducer,
  playlistSongs: playlistSongsReducer,
  currentUser: currentUserReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
