'use strict';

const expect = require('chai').expect;
const requestLib = require('request-promise');
const async = require('asyncawait/async');
const awaitLib = require('asyncawait/await');
//const async = require('async');
const app = require('../app');

describe('Integration tests', () => {
	const now = new Date();
	const baseUrl = 'http://localhost:' + process.env.PORT;
	const customerId = 'test_user_' + now.getTime();

	// generate the three amounts to be charged
	const amounts = [Math.ceil(Math.random() * 2500), Math.ceil(Math.random() * 2500)];
	amounts.push(5000 - amounts[0] - amounts[1]);

	// Start the app
	before(done => {
		app.startApp().then(done);
	});

	// Stop the app
	after(done => {
		app.stopApp().then(done);
	});

	it('should create a user using the given customer_id', done => {
		const options = {
			url: baseUrl + '/customers',
			method: 'POST',
			json: {
				id: customerId,
				source: {
					object: 'card',
					exp_month: now.getMonth() + 1,
					exp_year: now.getFullYear() + 1,
					number: '4111111111111111',
					cvc: '332'
				}
			}
		};

		requestLib(options).then(response => {
			expect(response.id).to.equal(customerId);

			const card = response.sources.data[0];
			expect(card.customer).to.equal(customerId);
			expect(card.brand).to.equal('Visa');
			expect(card.exp_month).to.equal(now.getMonth() + 1);
			expect(card.exp_year).to.equal(now.getFullYear() + 1);
			expect(card.last4).to.equal('1111');

			return done();
		});
    });

    it('should charge three amounts totalling 50USD to the customers credit card', done => {
    	async(() => {
    		amounts.forEach(amount => {
    			const options = {
					url: baseUrl + '/charges',
					method: 'POST',
					json: {
						customer: customerId,
						currency: 'USD',
						amount: amount
					}
				};

    			const response = awaitLib(requestLib(options));
    			expect(response.object).to.equal('charge');
				expect(response.currency).to.equal('usd');
				expect(response.amount).to.equal(amount);
    		});
    	})().then(done);
    });

    it('should retrieve the charges of the user and check that they are correct and they sum 50USD', done => {
    	let total = 0;
    	const options = {
			url: baseUrl + '/charges',
			method: 'GET',
			qs: {
	        	customer_id: customerId
	        },
	        json: true
		};

		requestLib(options).then(response => {
			expect(response.data).to.have.lengthOf(3);
			response.data.forEach(charge => {
				expect(amounts).to.contain(charge.amount);
				total += charge.amount;
			});
			expect(total).to.equal(5000);

			return done();
		});
    });
});