// const jwt = require('jsonwebtoken');
const fs = require('fs');
const request = require('request');

const ACCESS_TOKEN = 'oa_sand_sY3fB2ilNsT6q8o4EWFHzIe8hM8vkaSmn96AHn3eS5c';
const REFRESH_TOKEN = 'oa_sand_gpoTaJE8Mhc6wLtuBx9NSaCnYagASKsZrD2ZMcEqR4g';

const credentials = {
    access_token: ACCESS_TOKEN,
    token_type: 'bearer',
    expires_in: 2399,
    refresh_token: REFRESH_TOKEN,
};

function revolutApi(uri, token, method, file) {
    request({
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        uri,
        method,
    }, (err, res, body) => {
        if (err) {
            console.error(err);
        }

        fs.writeFile(file, body, err => console.error(err));
        console.log(body);
    } );
}

const ACCCOUNTS_URI = 'https://sandbox-b2b.revolut.com/api/1.0/accounts';

revolutApi(ACCCOUNTS_URI, credentials.access_token, 'GET', 'data.json');
