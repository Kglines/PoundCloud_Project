import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Songs from './components/Songs';
import SongDetails from './components/Songs/SongDetails';
import CurrentUser from './components/CurrentUser';
import Albums from './components/Albums';

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
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/songs'>
            <Songs />
          </Route>
          <Route path='/songs/:songId'>
            <SongDetails />
          </Route>
          <Route path='/albums'>
            <Albums />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
