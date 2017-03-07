'use strict';
const requestLib = require('request-promise');

/**
 * Creates a new customer using the data provided in the body of the request.
 * It uses the same interface as Stripe's Create Customer endpoint
 * see https://stripe.com/docs/api#create_customer for more info
 */
exports.createCustomer = function(req, res) {
	const options = {
        url: 'https://api.stripe.com/v1/customers',
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
