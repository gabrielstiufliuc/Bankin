// const jwt = require('jsonwebtoken');
const fs = require('fs');
const request = require('request');

const credentials = {
    access_token: "oa_sand_sY3fB2ilNsT6q8o4EWFHzIe8hM8vkaSmn96AHn3eS5c",
    token_type: "bearer",
    expires_in: 2399,
    refresh_token: "oa_sand_gpoTaJE8Mhc6wLtuBx9NSaCnYagASKsZrD2ZMcEqR4g"
};

// const privateKeyName = 'privatekey.pem';
// const issuer = 'revolut-jwt-sandbox.glitch.me';
// const client_id = 'qzq3RQcNNchQihHbIMBLPLzgTA8zP6wOlFNEuhS6QOs';
// const aud = 'https://revolut.com';
// const payload = {
//     'iss': issuer,
//     'sub': client_id,
//     'aud': aud,
// };

// const privateKey = fs.readFileSync(privateKeyName);
// const token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: 60 * 60});

// console.log(token);

request({
    headers: {
        'Authorization': `Bearer ${credentials.access_token}`,
    },
    uri: 'https://sandbox-b2b.revolut.com/api/1.0/accounts',
    method: 'GET'
}, (err, res, body) => {
    if (err) {
        console.error(err);
    }

    fs.writeFile('data.json', body, err => console.error(err));
    console.log(body);
});
