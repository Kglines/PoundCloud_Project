// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import CurrentUser from './components/CurrentUser';
import Home from './components/Home';
import Songs from './components/Songs';
import Albums from './components/Albums';
import AlbumDetails from './components/Albums/AlbumDetails';
import SongDetails from './components/Songs/SongDetails';
import LoginForm from './components/LoginFormModal/LoginForm';
import CreateSong from './components/Songs/CreateSong';
import CurrentuserSongs from './components/CurrentUser/CurrentuserSongs';
import CurrentuserAlbums from './components/CurrentUser/CurrentuserAlbums';
import EditSong from './components/Songs/EditSong';
import Playlist from './components/Playlists/Playlist';
import PlaylistList from './components/Playlists/PlaylistList';
import CurrentuserPlaylists from './components/CurrentUser/CurrentUserPlaylists';
import Footer from './components/Footer';
import Library from './components/Library';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/signup'>
            <SignupFormPage />
          </Route>
          <Route exact path='/login'>
            <LoginForm />
          </Route>
          <Route path='/currentuser/albums'>
            <CurrentuserAlbums />
          </Route>
          <Route path='/currentuser/songs'>
            <CurrentuserSongs />
          </Route>
          <Route path='/currentuser/playlists'>
            <CurrentuserPlaylists />
          </Route>
          <Route exact path='/currentuser'>
            <CurrentUser />
          </Route>
          <Route exact path='/songs/:songId'>
            <SongDetails />
          </Route>
          <Route exact path='/songs'>
            <Songs />
          </Route>
          <Route path='/albums/:albumId/song'>
            <CreateSong />
          </Route>
          <Route exact path='/albums/:albumId'>
            <AlbumDetails />
          </Route>
          <Route exact path='/albums'>
            <Albums />
          </Route>
          <Route exact path='/playlists/:playlistId'>
            <Playlist />
          </Route>
          <Route exact path='/playlists'>
            <PlaylistList />
          </Route>
          <Route exact path='/library'>
            <Library />
          </Route>
          <Route exact path='/'>
            <Home />
            <Footer />
          </Route>
          <Route>
            :Page Not Found
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
