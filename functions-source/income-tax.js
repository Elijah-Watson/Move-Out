require('dotenv').config();
import fetch from 'node-fetch';

exports.handler = async (event) => {
	if (event.httpMethod !== 'POST') {
		return { statusCode: 405, body: 'Method Not Allowed' };
	}

	return fetch(process.env.INCOME_TAX_API_URL, {
		headers: {
			'content-type': 'application/json',
			'Authorization': process.env.INCOME_TAX_API_KEY
		},
		method: 'POST',
		body: event.body
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