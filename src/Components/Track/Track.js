export default function Track({track}){
    return (
        <div>
            <p>{track.name}</p>
            <p>{track.artist}</p>
            <p>{track.album}</p>
        </div>
    );
}