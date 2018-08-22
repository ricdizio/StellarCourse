var StellarSdk = require('stellar-sdk'); 

StellarSdk.Network.useTestNetwork(); 

var server = new StellarSdk.Server('https://horizon-testnet.stellar.org'); 

// Create an object to represent the new asset 

//public key from issuing

let receivingKeys = StellarSdk.Keypair.fromSecret('SBO34VWETIRZPKF7R6JPJJCJZN2J22LIN2PQCGBAQSXLVCJGEDNWN7JD'); 

let emisorKey = "GDKQJCVUE2EGJIAMFGVNEUGMNU4H2QU6ZBJCO73JIVRVHWVTN7VL6VFS";

var bitcoin = new StellarSdk.Asset('BTCx', emisorKey); 

server.loadAccount(receivingKeys.publicKey()).then(
    function(receiver){
    // The `changeTrust` operation creates (or alters) a trustline 
        // The `limit` parameter below is optional 
        var transaction = new StellarSdk.TransactionBuilder(receiver).addOperation(StellarSdk.Operation.changeTrust({ 
            asset: bitcoin, //VARIBLE QUE SE CREO ARRIBA 
            limit: '21000000' //Maximo cantidad permitida a recibir
        })).build();

        transaction.sign(receivingKeys); 
        
        return server.submitTransaction(transaction);

}).catch(
    function(error) { 
        console.error('Error!', error); 
    }
)