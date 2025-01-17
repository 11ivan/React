import auth0 from 'auth0-js';

export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: 'dev-07pykma4.eu.auth0.com',
        clientID: '511h29kxsfVLgaKZNLqcCSMnGRzprum1',
        redirectUri: 'http://localhost:3000/callback',
        responseType: 'token id_token',
        scope: 'openid profile email'
    })

    login = () => {
        this.auth0.authorize()
    }
}