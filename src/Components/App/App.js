import React from 'react';

import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';
import { computeHeadingLevel } from '@testing-library/react';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      searchResults: [],
      playlistTracks : [],
      playlistName: 'My playlist 💥'
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    const isInListAlready = this.state.playlistTracks.some(listTrack => listTrack.id === track.id);        
    if (!isInListAlready) {
      const playlistTracks = [...this.state.playlistTracks, track];
      this.setState( { playlistTracks } );
    }
  }

  removeTrack(track){
    const playlistTracks = this.state.playlistTracks.filter(trackOnList => trackOnList.id !== track.id);
      this.setState( { playlistTracks } );
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name })
  }

  savePlaylist() {
    // Spotify.savePlaylist();
  }

  async search(term){
    const songs = await Spotify.search(term);
    this.setState({ searchResults: songs })

  }


  render() {

    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onAdd={this.addTrack}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
