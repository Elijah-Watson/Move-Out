require('dotenv').config();
import fetch from 'node-fetch';

exports.handler = async (event) => {
	if (event.httpMethod !== 'POST') {
		return { statusCode: 405, body: 'Method Not Allowed' };
	}

	let params = JSON.parse(event.body);

	let query = `?country=${params.country}&postalCode=${params.postalCode}`;

	return fetch(process.env.SALES_TAX_API_URL + query, {
		headers: {
			'Authorization': process.env.SALES_TAX_API_KEY
		},
		method: 'GET'
	})
		.then(response => response.json())
		.then(data => ({
			headers: {
				'content-type': 'application/json; charset=utf-8'
			},
			statusCode: 200,
			body: JSON.stringify(data)
		}))
		.catch(error => ({
			statusCode: 422,
			body: String(error)
		}));
};