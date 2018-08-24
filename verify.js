/* send a payment js */ 

var StellarSdk = require('stellar-sdk'); 

StellarSdk.Network.useTestNetwork(); 

var server = new StellarSdk.Server('https://horizon-testnet.stellar.org'); 

// LLAVE PUBLICA A VERIFICAR
var destinationId = 'GBFMVMUKMPCGEG5KOSRYZEBJWWYRTUXOZ552ZZFG4NJF2REONVUA7FTV'; 

// First, check to make sure that the destination account exists. 
// You could skip this, but if the account does not exist, you will be charged 
// the transaction fee when the transaction fails. server.loadAccount(destinationId) 

server.loadAccount(destinationId).catch(function(e) 
{
    console.log("Cuenta no activa o direccion invalida");
    console.error(e);
});