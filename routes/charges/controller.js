'use strict';
let requestLib = require('request-promise');

exports.getCharges = function(req, res) {
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

exports.performCharge = function(req, res) {
	const options = {
        url: 'https://api.stripe.com/v1/charges',
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
