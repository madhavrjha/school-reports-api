const express = require('express')
const {
	getAllSchoolReports,
	updateSchoolReport,
	addSchoolReport,
	deleteSchoolReport,
} = require('../controllers/schoolReportController')

const router = express.Router()

router.route('/').get(getAllSchoolReports).post(addSchoolReport).put(updateSchoolReport).delete(deleteSchoolReport)

module.exports = router
