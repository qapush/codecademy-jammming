const BASE_URL = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = '?response_type=token';
const CLIENT_ID = '&client_id=247dca5eaa7949d98d2902bc2b054f63';
const REDIRECT_URL = '&redirect_uri=http://localhost:3000';
let TOKEN = '';

const getToken = () => {
    
    if (TOKEN) {
        console.log(TOKEN);
        return TOKEN;
    } else if(window.location.hash) {
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
        
    } else {
        const URL = BASE_URL + RESPONSE_TYPE + CLIENT_ID + REDIRECT_URL;
        window.location = URL;
    }
    
    
}

const getSongs = (query) => {

    sessionStorage.setItem("searchTerm", query);
    getToken();

}

export { getSongs }; 