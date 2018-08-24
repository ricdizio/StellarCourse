/* send a payment js */ 

var StellarSdk = require('stellar-sdk'); 

StellarSdk.Network.useTestNetwork(); 

var server = new StellarSdk.Server('https://horizon-testnet.stellar.org'); 

//LLAVE PRIVADA FUENTE
var sourceKeys = StellarSdk.Keypair.fromSecret('SD2ZKZXZNT3SHKFKEZ6MN3VGBGMBGQERO3JEQRGP5QIAPXMZFHB25FN2'); 

// LLAVE PUBLICA DESTINO A ACTIVAR
var destinationId = 'GBFMVMUKMPCGEG5KOSRYZEBJWWYRTUXOZ552ZZFG4NJF2REONVUA7FTV'; 

// Transaction will hold a built transaction we can resubmit if the result is unknown. 
var transaction; 

server.loadAccount(sourceKeys.publicKey())
.then(function() { 

    return server.loadAccount(sourceKeys.publicKey()); // Direccion valida

}).then(function(sourceAccount) { 
    // Start building the transaction
    transaction = new StellarSdk.TransactionBuilder(sourceAccount);

    // Start building the transaction. 
    transaction = new StellarSdk.TransactionBuilder(sourceAccount)
        .addOperation(StellarSdk.Operation.payment({ 

            destination: destinationId, 
            // Because Stellar allows transaction in many currencies, you must 
            // specify the asset type. The special "native" asset represents Lumens. 

            // ASSET A TRANSFERIR

            asset: StellarSdk.Asset.native(),  
            
            amount: "10" 
            
        })).addMemo(StellarSdk.Memo.text('Activated Acount Transaction')).build(); 

    // A memo allows you to add your own metadata to a transaction. It's 
    // optional and does not affect how Stellar treats the transaction. 
    // Sign the transaction to prove you are actually the person sending it. 

    transaction.sign(sourceKeys); 

    console.log("transaccion fee is: " + transaction.fee);
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
 