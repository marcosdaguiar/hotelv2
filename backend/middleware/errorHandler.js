const errorHandler = (err, req, res, next) => {
	console.error(err.stack);
	
	if (err.name === 'SequelizeValidationError') {
		return res.status(400).json({
			error: 'Validation error',
			details: err.errors.map(e => e.message)
		});
	}

	res.status(500).json({
		error: 'Internal server error',
		message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
	});
};

module.exports = errorHandler;