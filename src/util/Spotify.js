import { computeHeadingLevel } from "@testing-library/react";

const appID = '247dca5eaa7949d98d2902bc2b054f63';
const redirectURI = 'http://localhost:3000';

let token = null;

const Spotify = {

    async savePlaylist(playlistName, tracksArray){
        // if(!playlistName || !tracksArray) return;
        const currentToken = this.getAccessToken();
        const headers = {Authorization: `Bearer ${currentToken}`};
        let user;

        const userData =  await fetch('https://api.spotify.com/v1/me', { headers });

        if(!userData.ok){
            throw Error('Failed to get user data')
        }
        
        user = await userData.json()

        const newPlaylistData =  await fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, { 
            method: 'POST',
            headers, 
            body: JSON.stringify({name: playlistName})
        });

        if(!newPlaylistData.ok){
            throw Error('Failed to create a playlist')
        }
    },

    async search(song) {
        const currentToken = this.getAccessToken();
        let songs;
        const rawData = await fetch(`https://api.spotify.com/v1/search?type=track&q=${song}`, {
            headers: {
                Authorization: `Bearer ${currentToken}`
            }
        });
        
        if(rawData.ok){
            songs = await rawData.json();
            if(!songs.tracks) return [];
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
        
    },

    getAccessToken() {
        // If token exists - return it
        
        if (token) {
            console.log('Token exists')
            return token
        };
        
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


        
        
        // If token is empty and not in url
        
        if (!token && !urlQueryParamsObject.access_token) {
            console.log('Token is empty or not in URL')
            window.location = `https://accounts.spotify.com/authorize?client_id=${appID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
        
        // If token is in url
        
         if(urlQueryParamsObject.access_token && urlQueryParamsObject.expires_in) {
            console.log('Token is in url')
            token = urlQueryParamsObject.access_token;
            const expTime = Number(urlQueryParamsObject.expires_in);
            window.history.pushState('Access Token', null, '/');
            setTimeout(() => { token = null }, expTime * 1000);
        }
        
        return token;
    },

    // savePlaylist(name, array) {
    //     // if (!name && !array) return;
    //     const userToken = this.getAccessToken();
    //     const authHeader = { Authorization: `Bearer ${userToken}` };
    //     let userID;

    //     fetch('https://api.spotify.com/v1/me', {headers: authHeader } )
    //         .then(res => res.json())
    //         .then(data => userID = data.id)
        
    // }
}

export default Spotify;