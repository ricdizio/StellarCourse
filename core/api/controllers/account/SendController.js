/**
 * SendController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    index: function (req,res) {


        let private = req.param("privatekey");
        let public = req.param("publickey");

        //Verificar si el balance antivo es suficiente para transferir

        let transactionAmaount = 2;
        // XML FEE
        let fee = 0.0000100;
        
        let need = fee * transactionAmaount;
        let balanceXML = null;


        if(private == undefined || public == undefined)
        {
            let response ={
                status: 300,
                messege: "public key or private key undefined"
            }

            res.status(response.status);
            return res.json(response);
        }
        
        // Make a transaccion a sign transaction 

        server.loadAccount(publicKey)
        .catch(function(e) 
        {
            console.error(e);
            let response = {
                status: 301,
                messege: "The account " + publicKey + " not valid",
                publicKey: publicKey
            } 
            res.status(response.status);
            return res.json(response);
        })  
        .then(function(account) {
            'use strict' 


            let obj = account.balances;
            let index = 0;
            async.forEachOf(obj, (value, key, callback) => {

            
                if(response.balance[index].asset_type == "native")
                {
                    balanceXML.push(value.balance);
                }    
                index++;
            }, err => {
                if (err) console.error(err.message);
            });

            if(balanceXML >= need)
            {
                //Continua el flujo
            }else{
                //Requerir XML para realizar la trnasaccion
            }

        });


    }

};

