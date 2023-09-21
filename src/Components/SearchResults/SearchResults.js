import TrackList from "../TrackList/TrackList"

export default function SearchResults({list, ...rest}) {

    const note = (
        <div className='note'>
            <p>
                Use search to find some tracks
            </p>
        </div>
    )
    
    return(
        <section>
            <h2>Search Results</h2>
            { !list[0] ? note :  <TrackList list={list} {...rest} /> }
        </section>
    )
}