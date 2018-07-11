/* Get balance js */ 


//import stellar
const StellarSdk = require('stellar-sdk')

//AQUI VA LLAVE PUBLICA PARA CONSULTAR EL BALANCE DE LA CUENTA
// Example GBIVJ2T4D4CAPYGNG5JKNGHFKMTTG3F6VPA62ICJXX74EY26YIJELGLC

var publicKey = "GBVRYIMAHZ5HHFKLQDO7JQ2PZCGUN4PTDAGLMM7M2O5PDUOLGJ4WOEV4";


//Request a balance for the acount
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org'); 
// the JS SDK uses promises for most actions, such as retrieving an account 

server.loadAccount(publicKey).then(function(account) { 
    console.log('Balances for account: ' + publicKey); 
    account.balances.forEach(function(balance) { 
        console.log('Type:', balance.asset_type, ', Balance:', balance.balance); 
    }); 
});  