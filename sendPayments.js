/* send a payment js */ 

var StellarSdk = require('stellar-sdk'); 

StellarSdk.Network.useTestNetwork(); 

var server = new StellarSdk.Server('https://horizon-testnet.stellar.org'); 

//LLAVE PRIVADA FUENTE
var sourceKeys = StellarSdk.Keypair.fromSecret('SD2ZKZXZNT3SHKFKEZ6MN3VGBGMBGQERO3JEQRGP5QIAPXMZFHB25FN2'); 

// LLAVE PUBLICA DESTINO
var destinationId = 'GB7DB7ROZFPJ65CWALNUNVWJIW62CKQ2XUBJAPQIGASOEPMNL7T2VAWH'; 

// Transaction will hold a built transaction we can resubmit if the result is unknown. 
var transaction; 

// Si quiero transferir un asset especifico
let emisorKey = "GDKQJCVUE2EGJIAMFGVNEUGMNU4H2QU6ZBJCO73JIVRVHWVTN7VL6VFS";
var bitcoin = new StellarSdk.Asset('BTCx', emisorKey); 

// First, check to make sure that the destination account exists. 
// You could skip this, but if the account does not exist, you will be charged 
// the transaction fee when the transaction fails. server.loadAccount(destinationId) 

server.loadAccount(destinationId).catch(StellarSdk.NotFoundError, function (error) { 
    throw new Error('The destination account does not exist!'); // Direccion invalida
})
.then(function() { 
    return server.loadAccount(sourceKeys.publicKey()); // Direccion valida
})
.then(function(sourceAccount) { 
    // Start building the transaction
    transaction = new StellarSdk.TransactionBuilder(sourceAccount);

    server.loadAccount(destinationId) 
    // If the account is not found, surface a nicer error message for logging. 
    .catch(StellarSdk.NotFoundError, function (error) { 
        throw new Error('The destination account does not exist!'); 
    }) 
    // If there was no error, load up-to-date information on your account. 
    .then(function() { 
        return server.loadAccount(sourceKeys.publicKey()); 
    })
    .then(function(sourceAccount) { 
        // Start building the transaction. 

        transaction = new StellarSdk.TransactionBuilder(sourceAccount).addOperation(StellarSdk.Operation.payment({ 

            destination: destinationId, 
            // Because Stellar allows transaction in many currencies, you must 
            // specify the asset type. The special "native" asset represents Lumens. 

            // ASSET A TRANSFERIR

            //asset: StellarSdk.Asset.native(),  
            asset: bitcoin,
            amount: "20.2161653" 
        })).addMemo(StellarSdk.Memo.text('Bitcoin Transaction')).build(); 
        // A memo allows you to add your own metadata to a transaction. It's 
        // optional and does not affect how Stellar treats the transaction. 
        // Sign the transaction to prove you are actually the person sending it. 
        transaction.sign(sourceKeys); 
        // And finally, send it off to Stellar! 
        return server.submitTransaction(transaction); 
    })
    .then(function(result){ 
        console.log('Success! Results:', result); 
    })
    .catch(function(error){ 
        console.error('Something went wrong!', error); 
        // If the result is unknown (no response body, timeout etc.) we simply resubmit 
        // already built transaction: 
        server.submitTransaction(transaction); 
    })

}); 
