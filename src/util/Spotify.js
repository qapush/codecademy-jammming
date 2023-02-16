const appID = '247dca5eaa7949d98d2902bc2b054f63';
const redirectURI = 'http://localhost:3000';

let token = null;

const Spotify = {

    search(song) {
        const currentToken = this.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${song}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(songs => {
                if (!songs.tracks) {   
                    return []
                } else {
                    return songs.tracks.items.map(item => {
                        return {
                            id: item.id,
                            name: item.name,
                            artist: item.artists[0].name,
                            URI: item.uri,
                            album: item.album.name
                        }
                    })
                }
            })


    },

    getAccessToken() {
        // If token exists - return it
        if (token) return token;
        
        const urlQueryParamsObject = {};
        
        // Try to retrieve token from url
        try {
            if (window.location.hash.length > 1) {
            
                const urlQueryParamsArray = window.location.hash
                .slice(1)
                .split('&')
                .map(item => {
                    const [key, value] = item.split('=');
                    return [key, value]
                });
                
                urlQueryParamsArray.forEach(item => {
                    urlQueryParamsObject[item[0]] = item[1];
                });

            }
        } catch (e) {
            console.log(Error('Failed to retrieve token from url'))
        }


        // If token is in url
       
        
        // If token is empty and not in url
        if (!token && !urlQueryParamsObject.access_token) {
            window.location = `https://accounts.spotify.com/authorize?client_id=${appID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }

         if(urlQueryParamsObject.access_token && urlQueryParamsObject.expires_in) {
            token = urlQueryParamsObject.access_token;
            const expTime = Number(urlQueryParamsObject.expires_in);
            window.history.pushState('Access Token', null, '/');
            setTimeout(() => { token = null }, expTime * 10000);
        }
        
        return token;
    },

    savePlaylist(name, array) {
        // if (!name && !array) return;
        const userToken = this.getAccessToken();
        const authHeader = { Authorization: `Bearer ${token}` };
        let userID;

        fetch('https://api.spotify.com/v1/me', { authHeader });
    }
}

export default Spotify;