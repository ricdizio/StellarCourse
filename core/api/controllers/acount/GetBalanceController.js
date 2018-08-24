
/**
 * GetBalanceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

//import stellar
const StellarSdk = require('stellar-sdk');

var async = require("async");


module.exports = {

    index: async function (req,res) {

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
            messege: "",
            publicKey: publicKey,
            balance: []
        } 

        let AssetBalance ={
            type: "X",
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
            'use strict' 

            console.log('Balances for account: ' + publicKey);

            let obj = account.balances;

            async.forEachOf(obj, (value, key, callback) => {
                /*
                AssetBalance.type = value.asset_type;
                AssetBalance.code = value.asset_code;
                AssetBalance.amount = value.balance;
                AssetBalance.emisor = value.asset_issuer;
                */
                response.balance.push(value)

            }, err => {
                if (err) console.error(err.message);
            });
               
            let messege = 'OK';
            response.status = 200;
            response.messege = messege;
    
            res.status(response.status);
            res.json(response);
    
            return res;
        });  
    }
};




