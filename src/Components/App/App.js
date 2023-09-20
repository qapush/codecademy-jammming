import { useState, useEffect } from 'react';

import { fakeSongs } from './fakeData';

import { getSongs } from '../../utils/Spotify';

import styles from './App.module.css';
import Header from './Header/Header';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';

function App() {

  const [songsList, setSongsList] = useState(fakeSongs);
  const [selectedSongs, setSelectedSongs] = useState([]);

  useEffect(() => {
    
    if (sessionStorage.getItem("searchTerm")){
      getSongs(sessionStorage.getItem("searchTerm"));
    };


  }, [])

  const handleSearch = query => {
    getSongs(query);
  }

  const handleSongButtonClick = id => {

    // Check if this song is already in the list
    const isSelected = selectedSongs.some(song => song.id === id);

    if (!isSelected) {
      const index = songsList.findIndex(song => song.id === id);
      setSelectedSongs(prev => [songsList[index], ...prev]);  
      setSongsList(prev => [...prev.filter(song => song.id !== id)]);
    } else {
      const index = selectedSongs.findIndex(song => song.id === id);
      setSongsList(prev => [selectedSongs[index], ...prev]);  
      setSelectedSongs(prev => [...prev.filter(song => song.id !== id)]);
    }

  }


  const saveToSpotify = () => {
    console.log(selectedSongs.map(item => item.uri));
    setSongsList(prev => [...selectedSongs, ...prev]);
    setSelectedSongs([]);
  }

  return (
    <div className={styles.app}>
      <Header>
        <SearchBar handleSearch={handleSearch} />
      </Header>
      <main>
        <SearchResults list={songsList} handleSongButtonClick={handleSongButtonClick} />
        <Playlist list={selectedSongs} handleSongButtonClick={handleSongButtonClick} handleSubmit={saveToSpotify} />
      </main>

    </div>
  );
}

export default App;
