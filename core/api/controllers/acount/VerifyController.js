/**
 * VerifyController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
//import stellar
const StellarSdk = require('stellar-sdk')
//import request
const request = require('request'); 
module.exports = {

    index: async function(req,res){

        let publicKey = req.param('publicKey');
        console.log(publicKey)
        //Request a balance for the acount
        var server = new StellarSdk.Server('https://horizon-testnet.stellar.org'); 
        // the JS SDK uses promises for most actions, such as retrieving an account 
        try{
            server.loadAccount(publicKey).then(function(account) { 
                if(true){
                    console.log(account)
                }
                console.log('Balances for account: ' + publicKey); 
                account.balances.forEach(function(balance) { 
                    console.log('Type:', balance.asset_type, ', Balance:', balance.balance); 
                }); 
            });  

        }catch{
            console.log("error")
        }


        return res.json("llego");
    }
  

};

