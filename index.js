const jwt = require('jsonwebtoken');
const fs = require('fs');
const axios = require('axios');

// const AUTHORISATION_CODE = 'oa_sand_iH9LHe7W08CEelv0GVBKV4zmYTzqzmtfct9adq7PQ5Y';
const CLIENT_ID = 'qzq3RQcNNchQihHbIMBLPLzgTA8zP6wOlFNEuhS6QOs';
const REFRESH_TOKEN = 'oa_sand_jEyLns0FsGykeF8hifVKIaP6VORS_-ZzVZGz6xg7RB8';
let ACCESS_TOKEN = '';

function generateJwt() {
    const privateKeyName = 'privatekey.pem';
    const issuer = 'revolut-jwt-sandbox.glitch.me';
    const aud = 'https://revolut.com';
    const payload = {
        'iss': issuer,
        'sub': CLIENT_ID,
        'aud': aud,
    };

    const privateKey = fs.readFileSync(__dirname + '/' + privateKeyName);
    const token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: 60 * 60000 });

    return token;
}

async function getAccessToken() {
    const URL = `https://sandbox-b2b.revolut.com/api/1.0/auth/token`;
    const jwtToken = generateJwt();

    const body = {
        client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
        client_assertion: jwtToken,
        grant_type: 'refresh_token',
        client_id: CLIENT_ID,
        refresh_token: REFRESH_TOKEN
    };

    const data = `client_id=${body.client_id}&client_assertion_type=${body.client_assertion_type}&client_assertion=${body.client_assertion}&refresh_token=${body.refresh_token}&grant_type=${body.grant_type}`;

    try {
        let tokenResp = await axios.post(URL, data, {
            headers: {
                'Content-Type': 'x-www-form-urlencoded'
            },
        });

        return tokenResp.data;
    } catch (err) {
        throw err;
    }
}

async function getAllAccounts(token) {
    const URL = 'https://sandbox-b2b.revolut.com/api/1.0/accounts';

    try {
        let accountsResp = await axios.get(URL, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        return accountsResp.data;
    } catch (err) {
        throw err;
    }
}

getAccessToken().then(async tokenObj => {
    try {
        const { access_token } = tokenObj;
        let accounts = await getAllAccounts(access_token);
        console.log(accounts);
    } catch(err) {
        console.error(err.response.data);
    }
});
