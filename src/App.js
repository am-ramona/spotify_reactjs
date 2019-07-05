import React from 'react'
import UserLogin from './Components/UserLogin'
import ArtistSearch from './Components/ArtistSearch'
import ArtistAlbums from './Components/ArtistAlbums'
import { Route, Switch } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Switch>
      <Route exact path="/" component={UserLogin} />
      <Route path="/artistSearch" component={ArtistSearch} />
      <Route exact path="/:id/:name" component={ArtistAlbums} />
    </Switch>
  );
}

export default App;
