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

        let response = {
            status: null,
            messege: null
        }

        console.log(publicKey)
        //Request a balance for the acount
        var server = new StellarSdk.Server('https://horizon-testnet.stellar.org'); 
        // the JS SDK uses promises for most actions, such as retrieving an account 
        
        server.loadAccount(publicKey)
        
        .then(function(account) { 

            response = {
                status: 200,
                messege: "The account " + publicKey + " is valid"
            }

            res.status(response.status);
            return res.json(response);
            
        }).catch(function(e){

            console.log("error")

            response = {
                status: 300,
                messege: "The account " + publicKey + " not valid"
            }
            res.status(response.status);
            return res.json(response);
        });    
    }
};

