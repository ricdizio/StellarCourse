/**
 * GetAssetBalanceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

//import stellar
const StellarSdk = require('stellar-sdk');

module.exports = {

    index: function (req,res) {

        //Optenemos la llave publica a consultar balance
        let publicKey = req.param('publicKey');


        if(!publicKey){
            let messege = 'Error Public Key';
            let status = 300
            let response = {
                status: status,
                messege: messege
            }
            res.status(status);
            return res.json(response);

        }

        //Request a balance for the acount
        var server = new StellarSdk.Server('https://horizon-testnet.stellar.org'); 
        // the JS SDK uses promises for most actions, such as retrieving an account 

        // Uncomment the following line to build transactions for the live network. Be
        // sure to also change the horizon hostname.
        // StellarSdk.Network.usePublicNetwork();
        StellarSdk.Network.useTestNetwork();

        let response = {
            status: "",
            publicKey: publicKey,
            balance: []
        } 

        let AssetBalance ={
            type: "",
            emisor: "",
            code: "",
            amount: ""
        }
        server.loadAccount(publicKey)
        .catch(function(e) 
        {
            console.log("Cuenta no activa o direccion invalida");
            console.error(e);
        })  
        .then(function(account) { 
            console.log('Balances for account: ' + publicKey); 
            account.balances.forEach(function(balance) { 
                AssetBalance.type = balance.asset_type;
                AssetBalance.code = balance.asset_code;
                AssetBalance.amount = balance.balance;
                AssetBalance.emisor = balance.asset_issuer;
                response.balance.push(AssetBalance)
                console.log('Type:', balance.asset_type, ',code:', balance.asset_code, ', Balance:', balance.balance); 
            }); 
        });  

        let messege = 'OK';
        response.status = 200;

        res.status(status);
        res.json(response);

        return res;
    }

};
