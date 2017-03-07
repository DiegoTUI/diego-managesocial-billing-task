# Diego ManageSocial Tech Task
A simple server enabling a couple of endpoints against the Stripe API.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node 6 LTS Boron = 6.X, npm 3 LTS = 3.X

### Installing and Testing

- Clone this repo `git clone https://github.com/DiegoTUI/diego-managesocial-billing-task.git`.
- Run `npm install` to install server dependencies.
- This app connects to Stripe using [Stripe's API](https://stripe.com/docs/api). You will need to enter your own Stripe secret key by creating a file named `.env` in the root folder of the project and adding the line
```
STRIPE_KEY=sk_test_useyourownkey
```
- Run `npm test` to run the code linter and the integration tests.
- Run `npm start` to start the server in port 3000 (you can change the port by assigning the environment variable `PORT`).

## Endpoints
### Create a user ([POST]/customers)
Creates a new user on Stripe. It uses exactly the same interface (request and response) as [Stripe's Create Customer endpoint](https://stripe.com/docs/api#create_customer). There are no compulsory parameters in this request (i.e. the body could be empty), although in order to create a user that you can later charge, you will need to specify at least one credit card.
```
curl -X POST -H "Content-Type: application/json" -d '{
	"source": {
		"object": "card",
		"exp_month": 2,
		"exp_year": 2020,
		"number": "4111111111111111",
		"cvc": "332"
	}
}' "http://localhost:3000/customers"
```
### Charge an amount to a user ([POST]/charges)
Charges a user's credit card with a certain amount of money. It uses exactly the same interface (request and response) as [Stripe's Create a Charge endpoint](https://stripe.com/docs/api#create_charge). You will need to specify at least three parameters in the body of the request:
- `amount`: the amount (in cents) to be charged to the user
- `currency`: the the three letter [ISO code](https://support.stripe.com/questions/which-currencies-does-stripe-support) for the currency
- `customer`: the `customer_id` returned by the Create User method
```
curl -X POST -H "Content-Type: application/json" -d '{
	"amount": 100,
	"currency": "USD",
	"customer": "cus_AFBvCbkMYrFFdx"
}' "http://localhost:3000/charges"
```
### Retrieve the charges of a user ([GET]/charges?customer_id=\<id\>)
Returns the list of charges of the `customer_id` specified in the query. 
```
curl -X GET "http://localhost:3000/charges?customer_id=cus_AFBvCbkMYrFFdx"
```
