import Tracklist from "../Tracklist/Tracklist"

export default function Playlist({list = []}) {
    
   return (
        <div id="playlist">
            <h3>Playlist</h3>
            <Tracklist list={list}/>
        </div>
    )
}