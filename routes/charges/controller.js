'use strict';
const requestLib = require('request-promise');

/**
 * Retrieves the charges of a certain user given by it's customer_id
 * It send a request to Stripe's "List all charges" operation specifying the customer parameter
 * see https://stripe.com/docs/api#list_charges for more info
 */
exports.getCustomerCharges = function(req, res) {
  	const options = {
        url: 'https://api.stripe.com/v1/charges',
        method: 'GET',
        auth: {
            user: process.env.STRIPE_KEY,
            pass: ''
        },
        headers: {
	        'Content-Type': 'application/json'
	    },
        qs: {
        	customer: req.query.customer_id
        },
        json: true
    };

    requestLib(options)
    .then(response => res.json(response))
    .catch(error => res.status(error.statusCode || 500).json(error));
};

/**
 * Performs a charge against the credit card of a certaing customer
 * It uses the same interface as Stripe's Create A Charge endpoint
 * see https://stripe.com/docs/api#create_charge for more info
 */
exports.performCharge = function(req, res) {
	const options = {
        url: 'https://api.stripe.com/v1/charges',
        method: 'POST',
        auth: {
            user: process.env.STRIPE_KEY,
            pass: ''
        },
        headers: {
	        'Content-Type': 'application/x-www-form-urlencoded'
	    },
        form: req.body,
        json: true
    };

    requestLib(options)
    .then(response => res.json(response))
    .catch(error => res.status(error.statusCode || 500).json(error));
};
