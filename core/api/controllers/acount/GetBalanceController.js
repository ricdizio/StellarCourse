/**
 * GetBalanceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    index: function (req,res) {

        let messege = 'Hellow from create Controller';
        let status = 300
        let response = {
            status: status,
            messege: messege
        }
        res.status(status);
        res.json(response);

        return res;
    }

};