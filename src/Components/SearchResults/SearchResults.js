import Tracklist from "../Tracklist/Tracklist"

export default function SearchResults({list, ...rest}) {
    return(
        <section>
            <h2>Search Results</h2>
            <Tracklist list={list} {...rest} />
        </section>
    )
}