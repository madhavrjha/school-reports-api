const mongoose = require('mongoose')

const dbConnect = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://madhavrjha:${process.env.DB_PASSWORD}@cluster0.xodjmmg.mongodb.net/district-school-report`,
			{
				useUnifiedTopology: true,
				useNewURLParser: true,
			}
		)
	} catch (err) {
		console.error('There are Error while Connecting with Database')
		console.error(err.message)
	}
}

module.exports = dbConnect
