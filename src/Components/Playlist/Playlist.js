import { useState } from "react"

import TrackList from "../TrackList/TrackList";
import styles from './Playlist.module.css';

export default function Playlist(props) {
      
   const [listName, setListName] = useState('');

   const handleSubmit = () => {
      props.handleSubmit({
         name: listName,
         tracks: props.list.map( track => track.uri)
      });
      setListName('');
   }

   const note = (
      <div className={styles.note}>
         <p>
            Please add tracks from the search to create a new list
         </p>
      </div>
   )

   return (
        <section>
           <h2>Playlist</h2>
           { props.list.length == 0 ? note : (
            <form action="#" onSubmit={handleSubmit}>
               <input
                  type="text"
                  placeholder="Name your playlist"
                  value={listName}
                  onChange={e => setListName(e.target.value)}
               />
                  <TrackList {...props} remove />
                  { listName !== '' && <button type="submit">Save to Spotify</button> }
               </form>
           )}
        </section>
    )
}