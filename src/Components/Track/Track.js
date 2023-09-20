import styles from './Track.module.css';

export default function Track({ track, remove, handleSongButtonClick }) {
    return (
        <div className={styles.track}>
            <div className={styles.trackData}>
                <div className={styles.trackName}>
                    <p>{track.name}</p>
                </div>
                <div className={styles.description}>
                    <span>{track.artist}</span>
                    <span className={styles.descriptionSeparator}> | </span>
                    <span>Album: {track.album}</span>
                </div>
            </div>
            <div className={styles.trackButton} >
                <span onClick={() => handleSongButtonClick(track.id)}>
                    {remove ? '-' : '+'}
                </span>
            </div>
        </div>
    );
}