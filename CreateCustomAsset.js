var StellarSdk = require('stellar-sdk'); 

StellarSdk.Network.useTestNetwork(); 

var server = new StellarSdk.Server('https://horizon-testnet.stellar.org'); 

// Keys for accounts to issue and receive the new asset 

var issuingKeys = StellarSdk.Keypair.fromSecret('SAHVFUDUQYXAB6J76MRIVL23U2I53WVKFKVZ7R23BNKZ7AUDDGCHVR7L'); 

var receivingKeys = StellarSdk.Keypair.fromSecret('SD2ZKZXZNT3SHKFKEZ6MN3VGBGMBGQERO3JEQRGP5QIAPXMZFHB25FN2'); 

// Create an object to represent the new asset 

var bitcoin = new StellarSdk.Asset('BTCone', issuingKeys.publicKey()); 

// First, the receiving account must trust the asset 

server.loadAccount(receivingKeys.publicKey()).then(
    function(receiver){
    // The `changeTrust` operation creates (or alters) a trustline 
        // The `limit` parameter below is optional 
        var transaction = new StellarSdk.TransactionBuilder(receiver).addOperation(StellarSdk.Operation.changeTrust({ 
            asset: bitcoin, //VARIBLE QUE SE CREO ARRIBA
            limit: '21000000' 
        })).build();

        transaction.sign(receivingKeys); 
        
        return server.submitTransaction(transaction);
    }
// Second, the issuing account actually sends a payment using the asset 
).then(
    function() { 
        return server.loadAccount(issuingKeys.publicKey());
    }
).then(
    function(issuer) { 
        var transaction = new StellarSdk.TransactionBuilder(issuer).addOperation(StellarSdk.Operation.payment({ 
            destination: receivingKeys.publicKey(), 
            asset: bitcoin, 
            amount: '21000000' 
        })).build();
        
        transaction.sign(issuingKeys); 
        let result = server.submitTransaction(transaction);
        result.then(res => console.log(res));
        return result;
    }
).catch(
    function(error) { 
        console.error('Error!', error); 
    }
); 