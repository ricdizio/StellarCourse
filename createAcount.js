// create a completely new and unique pair of keys 
// see more about KeyPair objects: https://stellar.github.io/js-stellar-sdk/Keypair.html 

//import stellar
const StellarSdk = require('stellar-sdk')
//import request
const request = require('request'); 

//create a seed
var pair = StellarSdk.Keypair.random(); 
console.log("the pair generated is: " + pair);

//Create a private key
var privatek = pair.secret(); // SAV76USXIJOBMEQXPANUOQM6F5LIOTLPDIDVRJBFFE2MDJXG24TAPUU7
console.log("private key: " +  privatek);

//Create a public key
var publick = pair.publicKey(); // GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB 
console.log("public key: " +  publick);

// The SDK does not have tools for creating test accounts, so you'll have to // make your own HTTP request. 


request.get({ 
    url: 'https://friendbot.stellar.org', 
    qs: { 
        addr: pair.publicKey() 
    }, 
    json: true 
}, function(error, response, body) { 
    if (error || response.statusCode !== 200) { 
        console.error('ERROR!', error || body); 
    } else { 
        console.log('SUCCESS! You have a new account :)\n', 
    body);
    }

    //Request a balance for the acount
    var server = new StellarSdk.Server('https://horizon-testnet.stellar.org'); 
    // the JS SDK uses promises for most actions, such as retrieving an account 

    server.loadAccount(pair.publicKey()).then(function(account) { 
        console.log('Balances for account: ' + pair.publicKey()); 
        account.balances.forEach(function(balance) { 
            console.log('Type:', balance.asset_type, ', Balance:', balance.balance); 
        }); 
    });  
}); 

