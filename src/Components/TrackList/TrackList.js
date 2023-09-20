import { useState } from "react"
import Track from '../Track/Track';

export default function Tracklist({ list }) {
    
    const [listData, setListData] = useState(list);
    
    return(
        <div id="tracklist">
            <h3>Tracklist</h3>
            {list.length > 0 && list.map(track => <Track key={ track.id } track={track} />) }
        </div>
    );
}