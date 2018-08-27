/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'pages/homepage'
  },

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝

/**
 * Method: Get Create Acount
 * INPUTS: 
 *  Void
 * OUTPUT:
 *  
 */
'GET /api/create': {
  controller: 'account/create',
  action: 'index'
},

/**
 * Method: Get Verify Acount
 * INPUTS: 
 *  Public Key
 * OUTPUT:
 *  
 */
'GET /api/verify/:publicKey': {
  controller: 'account/VerifyController',
  action: 'index'
},

/**
 * Method: Get Balance (all assets)
 * INPUTS: 
 *  publicKEY: Required to sign account
 *  Asset: Asset to view balance
 */
  'GET /api/account/:publicKey/balance': {
    controller: 'account/getBalance',
    action: 'index'
  },

/**
 * Method: Get Balance specific asset
 * INPUTS: 
 *  publicKEY: Required to sign account
 *  Asset: Asset to view balace
 */
  'GET /api/account/:publicKey/balance/:asset': {
    controller: 'account/getAssetBalance',
    action: 'index'
  },

/**
 * Method: Send asset to public key
 * INPUTS: 
 *  privateKEY: Required to sing transactions
 *  Asset: Asset to send
 *  publicKEY: Destination 
 */
  'POST /api/auth/send/:asset/:keyToSend': {
    controller: 'account/send',
    action: 'index'
  },




  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
