var StellarSdk = require('stellar-sdk'); 

StellarSdk.Network.useTestNetwork(); 

var server = new StellarSdk.Server('https://horizon-testnet.stellar.org'); 

// Keys for issuing account 

var issuingKeys = StellarSdk.Keypair .fromSecret('SCZANGBA5YHTNYVVV4C3U252E2B6P6F5T3U6MM63WBSBZATAQI3EBTQ4'); 

server.loadAccount(issuingKeys.publicKey()).then(
    function(issuer) { 
        var transaction = new StellarSdk.TransactionBuilder(issuer).addOperation(StellarSdk.Operation.setOptions({ 
            homeDomain: 'yourdomain.com', })).build(); 
        transaction.sign(issuingKeys); 
        return server.submitTransaction(transaction);
    }).catch(
        function(error) { 
            console.error('Error!', error); 
        }); 