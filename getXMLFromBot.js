// create a completely new and unique pair of keys 
// see more about KeyPair objects: https://stellar.github.io/js-stellar-sdk/Keypair.html 

//import stellar
const StellarSdk = require('stellar-sdk')
//import request
const request = require('request'); 


// P K where you recibe the money
let publicKey = "GC3EQUZMFYPRQMPJB3OU6TQ7TT2AKYDOXGHOUHSOV5XXGPP5Y4YIJEDK";

request.get({ 
    url: 'https://friendbot.stellar.org', 
    qs: { 
        addr: publicKey
    }, 
    json: true 
}, function(error, response, body) { 
    if (error || response.statusCode !== 200) { 
        console.error('ERROR!', error || body); 
    } else { 
        console.log('SUCCESS! You recived 1000 XML :)\n', 
    body);
    }

}); 
