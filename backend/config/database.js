require('dotenv').config();

module.exports = {
	development: {
		username: process.env.DB_USERNAME || 'root',
		password: process.env.DB_PASSWORD || '',
		database: process.env.DB_NAME || 'hotel_management',
		host: process.env.DB_HOST || '127.0.0.1',
		dialect: 'mysql'
	},
	test: {
		username: process.env.DB_USERNAME || 'root',
		password: process.env.DB_PASSWORD || '',
		database: process.env.DB_TEST_NAME || 'hotel_management_test',
		host: process.env.DB_HOST || '127.0.0.1',
		dialect: 'mysql'
	},
	production: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: 'mysql'
	}
};