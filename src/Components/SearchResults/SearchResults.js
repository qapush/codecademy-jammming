import React, { Component } from 'react';
import styles from './SearchResults.css';
import TrackList from '../TrackList/TrackList';

export default class SearchResults extends Component {
  render() {



    return (
        <div className="SearchResults">
        <h2>Results { window.sessionStorage.getItem('searchTerm') ? `for '${window.sessionStorage.getItem('searchTerm')}'` : null}</h2>
        <TrackList
          tracks={this.props.searchResults}
          onAdd={this.props.onAdd}
          onRemove={this.props.onRemove}
          isRemoval={false}
        />
        </div>
    )
  }
}
