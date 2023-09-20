import TrackList from "../TrackList/TrackList"

export default function SearchResults({list, ...rest}) {
    return(
        <section>
            <h2>Search Results</h2>
            <TrackList list={list} {...rest} />
        </section>
    )
}