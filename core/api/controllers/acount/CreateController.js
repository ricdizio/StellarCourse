/**
 * CreateController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

//import stellar
const StellarSdk = require('stellar-sdk')
//import request
//const request = require('request'); 


module.exports = {

    index: async function (req,res) {

        let responseAPI = {};

        try{
            //create a seed
            var pair = StellarSdk.Keypair.random(); 
            console.log("the pair generated is: " + pair);
        }catch{
            console.log('error trying to create pair');

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
            responseAPI.public = publick;
        }catch{
            let status = 301;
            let messege = {
                status: status,
                messege:'error trying to create public key'
            }
            res.status(status);
            return res.json(messege);
        }

        res.status(200);

        return res.json(responseAPI);;
    }
};

