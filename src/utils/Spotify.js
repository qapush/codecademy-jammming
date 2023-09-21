const BASE_URL = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = '?response_type=token';
const CLIENT_ID = `&client_id=${process.env.REACT_APP_SPOTIFY}`;
const REDIRECT_URL = `&redirect_uri=${process.env.NODE_ENV === 'development'
    ? 'https://qapush-jammming.netlify.app/'
    : 'http://localhost:3000/'}`;
const SCOPE = '&scope=playlist-modify-private user-read-private';
let TOKEN = null;

const getToken = () => {
   
    if (TOKEN) {
        return TOKEN;
    } else if (window.location.hash.length > 1) {

        const hashParameters = {}
        // window.location.hash.split('&').forEach(i => hashParameters[i] = i);
        window.location.hash
            .slice(1) // to remove # sign
            .split('&') // to split to paramater/value groups))
            .forEach(item => {
                const parameter = item.split('=')
                hashParameters[parameter[0]] = parameter[1];
            });

        TOKEN = hashParameters.access_token;
        window.history.pushState('Access Token', '', '/');
        return TOKEN;
        
    } else if (!TOKEN) {
        const URL = BASE_URL + RESPONSE_TYPE + CLIENT_ID + SCOPE + REDIRECT_URL;
        window.location = URL;
    }
    
    
}

const getSongs = async (query) => {
    
    
    const token = getToken();
    if (!token) return [];

    const urlEncodedQuery = encodeURIComponent(query);
    const url = 'https://api.spotify.com/v1/search?q=' + urlEncodedQuery + '&type=track';

    const response = await fetch(url, {
        headers: {'Authorization': 'Bearer ' + token }
    });
    const data = await response.json();
    sessionStorage.removeItem("searchTerm");
    return  !data.tracks ? [] : data.tracks.items.map( ({name, id, album, artists, uri}) => ({
        name, 
        id,
        uri,
        artist: artists[0].name,
        album: album.name,
        image: album.images[2].url
    }));
}

const createPlaylist = async (listObject) => {

    const token = getToken();
    const urlEncodedListName = encodeURIComponent(listObject.name);
    const headers = {'Authorization': 'Bearer ' + token};

    const userResponse = await fetch('https://api.spotify.com/v1/me', {headers});
    
    const {id: userId} = await userResponse.json();

    const createPlaylistResponse = await fetch('https://api.spotify.com/v1/users/' + userId + '/playlists', {
        headers,
        method: 'POST',
        body: JSON.stringify({name: urlEncodedListName, public: false})
    });
    
    const { id } = await createPlaylistResponse.json();

    fetch('https://api.spotify.com/v1/playlists/' + id + '/tracks', {
        headers,
        method: 'POST',
        body: JSON.stringify({uris: listObject.tracks })
    });

}

export { getSongs, createPlaylist }; 