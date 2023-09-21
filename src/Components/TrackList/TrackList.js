import { useState } from "react"
import Track from '../Track/Track';
import styles from './TrackList.module.css';

export default function TrackList({ list, ...rest }) {
    


    return(
        <div className={styles.tracklist}>
            {list.length > 0 && list.map(track => {
                return <Track key={ track.id } track={track} {...rest} />;
            }) }
        </div>
    );
}