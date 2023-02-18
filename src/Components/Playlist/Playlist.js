import React, { Component } from 'react';
import styles from './Playlist.css';
import Tracklist from '../TrackList/TrackList';

export default class Playlist extends Component {
  constructor(props) {
    super(props)
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  
  handleNameChange(e) {
    this.props.onNameChange(e.target.value)
  }
  
  render() {
    return (
        <div className="Playlist">
        <input
          onChange={this.handleNameChange}
          value={this.props.playlistName || 'New Playlist'}
        />
        <Tracklist
          tracks={this.props.playlistTracks}
          isRemoval={true}
          onAdd={this.props.onAdd}
          onRemove={this.props.onRemove}
          
        />
        <button
          className="Playlist-save"
          onClick={this.props.onSave}
        >SAVE TO SPOTIFY</button>
        </div>
    )
  }
}
