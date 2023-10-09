const mongoose = require('mongoose')

const schoolReport = new mongoose.Schema({
	schoolName: String,
	phase: String,
	data: {
		checked: Boolean,
		updatedAt: Date,
	},
	subscriptionAgreement: {
		checked: Boolean,
		updatedAt: Date,
	},
	training: {
		principal: {
			checked: Boolean,
			updatedAt: Date,
		},
		ictChampion: {
			checked: Boolean,
			updatedAt: Date,
		},
		educators: {
			checked: Boolean,
			updatedAt: Date,
		},
	},
	parentFlyers: {
		printed: {
			checked: Boolean,
			updatedAt: Date,
		},
		sentHome: {
			checked: Boolean,
			updatedAt: Date,
		},
	},
	comment: String,
})

module.exports = mongoose.model('SchoolReport', schoolReport)
