import Tracklist from "../Tracklist/Tracklist"

export default function SearchResults({list = []}) {
    return(
        <div id="search-results">
            <h3>Search Results</h3>
            <Tracklist list={list} />
        </div>
    )
}