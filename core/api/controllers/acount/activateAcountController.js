/**
 * acitvateController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

//import stellar
const StellarSdk = require('stellar-sdk')
//import request
const request = require('request'); 


module.exports = {

    index: async function (req,res){

        let publicKey = req.param("publicKey");

        /// Aqui se debe acrealizar una transaccion de la cuenta master a la cuenta a activar


    }
}
