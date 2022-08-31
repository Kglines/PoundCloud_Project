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
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
          <Route path='/currentuser'>
            <CurrentUser />
          </Route>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/songs'>
            <Songs />
          </Route>
          <Route path='/albums'>
            <Albums />
          </Route>
          <Route exact path='/albums/:albumId'>
            <AlbumDetails />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
