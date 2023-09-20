import { useState } from "react"

import TrackList from "../TrackList/TrackList";

export default function Playlist(props) {
      
   const [listName, setListName] = useState('');

   return (
        <section>
           <h2>Playlist</h2>
           { props.list.length > 0 && (
            <form action="#" onSubmit={() => { setListName(''); props.handleSubmit(); } }>
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