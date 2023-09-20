import { useState } from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar({ handleSearch }) {
    
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = ({ target }) => {
        setSearchTerm(target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm) {
            sessionStorage.setItem("searchTerm", searchTerm);
            handleSearch(searchTerm);
            setSearchTerm('');
        }
    }

    return(
        <form className={styles.searchbar} onSubmit={handleSubmit}> 
            <input type="text" placeholder="Search for songs" value={searchTerm} onChange={handleChange} />
            <button type="submit">Search</button>
        </form>
    );
}