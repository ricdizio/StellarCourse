/**
 * CreateController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

//import stellar
const StellarSdk = require('stellar-sdk')
//import request
const request = require('request'); 


module.exports = {

    index: async function (req,res) {

        let responseAPI = {};

        try{
            //create a seed
            var pair = StellarSdk.Keypair.random(); 
            console.log("the pair generated is: " + pair);
        }catch{
            sails.error('error trying to create pair');

            let status = 305;
            let messege = {
                status: status,
                messege:'error trying to create private key'
            }
            res.status(status);
            return res.json(messege);
        }


        //Create a private key
        try{
            var privatek = pair.secret(); // SAV76USXIJOBMEQXPANUOQM6F5LIOTLPDIDVRJBFFE2MDJXG24TAPUU7
            console.log("private key: " +  privatek);
            responseAPI.private= privatek;
        }catch{
            let status = 300;
            let messege = {
                status: status,
                messege:'error trying to create private key'
            }
            res.status(status);
            return res.json(messege);
        }

        //Create a public key

        try{
            var publick = pair.publicKey(); // GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB 
            console.log("public key: " +  publick);
            responseAPI.public= publick;
        }catch{
            let status = 301;
            let messege = {
                status: status,
                messege:'error trying to create public key'
            }
            res.status(status);
            return res.json(messege);
        }

        // The SDK does not have tools for creating test accounts, so you'll have to // make your own HTTP request. 


        request.get({ 
            url: 'https://friendbot.stellar.org', 
            qs: { 
                addr: pair.publicKey() 
            }, 
            json: true 
        }, function(error, response, body) { 
            if (error || response.statusCode !== 200) { 
                console.error('ERROR!', error || body);
                responseAPI.messege = 'ERROR!';
                responseAPI.status = 302;
                responseAPI.error = error;
                responseAPI.body = body;
                 
            } else { 
                console.log('SUCCESS! You have a new account :)\n', body);
                responseAPI.body = body;
                responseAPI.messege = 'SUCCESS! You have a new account :)';
                responseAPI.status = 200;
            }

            //Request a balance for the acount
            var server = new StellarSdk.Server('https://horizon-testnet.stellar.org'); 
            // the JS SDK uses promises for most actions, such as retrieving an account 

            server.loadAccount(pair.publicKey()).then(function(account) { 
                console.log('Balances for account: ' + pair.publicKey()); 
                responseAPI.balance = [];
                account.balances.forEach(function(balance) { 
                    console.log('Type:', balance.asset_type, ', Balance:', balance.balance); 
                    responseAPI.balance.push('Type:', balance.asset_type, ', Balance:', balance.balance);
                }); 

                res.status(responseAPI.status);
                res.json(responseAPI);
        
                return res;
            }); 
            
        }); 


    }

};

