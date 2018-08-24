/* Get balance js */ 


//import stellar
const StellarSdk = require('stellar-sdk');

//AQUI VA LLAVE PUBLICA PARA CONSULTAR EL BALANCE DE LA CUENTA
// Example GBIVJ2T4D4CAPYGNG5JKNGHFKMTTG3F6VPA62ICJXX74EY26YIJELGLC

var publicKey = "GBLSVKFRWZ4WV432D4RGF6Z56UIX2MCNQWDFS7IDSTL5SQGOJESTLKAV";


//Request a balance for the acount
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org'); 
// the JS SDK uses promises for most actions, such as retrieving an account 

// Uncomment the following line to build transactions for the live network. Be
// sure to also change the horizon hostname.
// StellarSdk.Network.usePublicNetwork();
StellarSdk.Network.useTestNetwork();

server.loadAccount(publicKey).then(function(account) { 
    console.log('Balances for account: ' + publicKey); 
    account.balances.forEach(function(balance) { 
        console.log(balance)
        console.log('Type:', balance.asset_type, ',code:', balance.asset_code, ', Balance:', balance.balance); 
    }); 
});  