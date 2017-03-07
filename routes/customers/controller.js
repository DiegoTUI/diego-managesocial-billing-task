'use strict';
let requestLib = require('request-promise');

exports.createCustomer = function(req, res) {
	const options = {
        url: 'https://api.stripe.com/v1/customers',
        method: 'POST',
        auth: {
            user: process.env.STRIPE_KEY,
            pass: ''
        },
        headers: {
	        'Content-Type': 'application/json'
	    },
        json: req.body
    };

    requestLib(options)
    .then(response => res.json(response))
    .catch(error => res.status(error.statusCode || 500).json(error));
};
