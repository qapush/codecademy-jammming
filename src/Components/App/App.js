import { fakeSongs } from './fakeData';

import styles from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';


function App() {

  return (
    <div className={styles.app}>
      <header>
        <span className={styles.logo}>Jammming</span>
        <SearchBar/>
      </header>
      <main>
        <SearchResults list={fakeSongs} />
        <Playlist/>
      </main>

    </div>
  );
}

export default App;
