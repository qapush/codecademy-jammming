import styles from './SearchBar.module.css';

export default function SearchBar() {
    return(
        <div id="searchbar" className={styles.searchbar}> 
            <input type="text" />
            <button type="submit">Search</button>
        </div>
    );
}