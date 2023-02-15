import React, { Component } from 'react';
import styles from './TrackList.css';
import Track from '../Track/Track';

export default class TrackList extends Component {
  render() {



    const tracks = this.props.tracks.map( track => {
      return (
        <Track
          key={track.id}
          track={track}
          onAdd={this.props.onAdd}
          onRemove={this.props.onRemove}
          isRemoval={this.props.isRemoval}
        />
      )
    } )

    return (
      <div className="TrackList">
        {tracks}
      </div>
    )
  }
}
