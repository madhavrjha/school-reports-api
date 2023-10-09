const SchoolReport = require('../model/SchoolReport')

const getSchoolReportemplate = () => {
	return {
		schoolName: '',
		phase: '',
		data: {
			checked: false,
			updatedAt: new Date().toISOString(),
		},
		subscriptionAgreement: {
			checked: false,
			updatedAt: new Date().toISOString(),
		},
		training: {
			principal: {
				checked: false,
				updatedAt: new Date().toISOString(),
			},
			ictChampion: {
				checked: false,
				updatedAt: new Date().toISOString(),
			},
			educators: {
				checked: false,
				updatedAt: new Date().toISOString(),
			},
		},
		parentFlyers: {
			printed: {
				checked: false,
				updatedAt: new Date().toISOString(),
			},
			sentHome: {
				checked: false,
				updatedAt: new Date().toISOString(),
			},
		},
		comment: '',
	}
}

const setSchoolReportemplate = schoolReport => {
	return {
		id: schoolReport.id,
		schoolName: schoolReport.schoolName,
		phase: schoolReport.phase,
		data: {
			checked: schoolReport.data.checked,
			updatedAt: schoolReport.data.updatedAt,
		},
		subscriptionAgreement: {
			checked: schoolReport.subscriptionAgreement.checked,
			updatedAt: schoolReport.subscriptionAgreement.updatedAt,
		},
		training: {
			principal: {
				checked: schoolReport.training.principal.checked,
				updatedAt: schoolReport.training.principal.updatedAt,
			},
			ictChampion: {
				checked: schoolReport.training.ictChampion.checked,
				updatedAt: schoolReport.training.ictChampion.updatedAt,
			},
			educators: {
				checked: schoolReport.training.educators.checked,
				updatedAt: schoolReport.training.educators.updatedAt,
			},
		},
		parentFlyers: {
			printed: {
				checked: schoolReport.parentFlyers.printed.checked,
				updatedAt: schoolReport.parentFlyers.printed.updatedAt,
			},
			sentHome: {
				checked: schoolReport.parentFlyers.sentHome.checked,
				updatedAt: schoolReport.parentFlyers.sentHome.updatedAt,
			},
		},
		comment: schoolReport.comment,
	}
}

const getAllSchoolReports = async (req, res) => {
	try {
		const schoolReports = await SchoolReport.find()
		if (!schoolReports.length) return res.sendStatus(204)
		const safeSchoolReports = schoolReports.map(schoolReport => setSchoolReportemplate(schoolReport))
		res.json(safeSchoolReports)
	} catch (e) {
		console.error('There are some error while getting school reports data from database')
		console.error(e.message)
		res.sendStatus(500)
	}
}

const addSchoolReport = async (req, res) => {
	try {
		const newSchoolReport = getSchoolReportemplate()
		const result = await SchoolReport.create(newSchoolReport)
		const safeSchoolReport = setSchoolReportemplate(result)
		res.status(201).json(safeSchoolReport)
	} catch (e) {
		console.error('There is an error while adding school report in database')
		console.error(e.message)
		res.sendStatus(500)
	}
}

const updateSchoolReport = async (req, res) => {
	if (!req?.body?.id) return res.status(400).json({ message: 'feature id is required' })

	try {
		const foundSchoolReport = await SchoolReport.findOne({ _id: req.body.id }).exec()
		console.log(foundSchoolReport)
		if (!foundSchoolReport) return res.sendStatus(204)

		if (req.body?.schoolName) foundSchoolReport.schoolName = req.body.schoolName

		if (req.body?.phase) foundSchoolReport.phase = req.body.phase
		if (req.body?.data?.checked) foundSchoolReport.data.checked = req.body.data.checked
		if (req.body?.data?.updatedAt) foundSchoolReport.data.updatedAt = req.body.data.updatedAt

		if (req.body?.subscriptionAgreement?.checked)
			foundSchoolReport.subscriptionAgreement.checked = req.body.subscriptionAgreement.checked
		if (req.body?.subscriptionAgreement?.updatedAt)
			foundSchoolReport.subscriptionAgreement.updatedAt = req.body.subscriptionAgreement.updatedAt

		if (req.body?.training?.principal?.checked)
			foundSchoolReport.training.principal.checked = req.body.training.principal.checked
		if (req.body?.training?.principal?.updatedAt)
			foundSchoolReport.training.principal.updatedAt = req.body.training.principal.updatedAt

		if (req.body?.training?.ictChampion?.checked)
			foundSchoolReport.training.ictChampion.checked = req.body.training.ictChampion.checked
		if (req.body?.training?.ictChampion?.updatedAt)
			foundSchoolReport.training.ictChampion.updatedAt = req.body.training.ictChampion.updatedAt

		if (req.body?.training?.educators?.checked)
			foundSchoolReport.training.educators.checked = req.body.training.educators.checked
		if (req.body?.training?.educators?.updatedAt)
			foundSchoolReport.training.educators.updatedAt = req.body.training.educators.updatedAt

		if (req.body?.parentFlyers?.printed?.checked)
			foundSchoolReport.parentFlyers.printed.checked = req.body.parentFlyers.printed.checked
		if (req.body?.parentFlyers?.printed?.updatedAt)
			foundSchoolReport.parentFlyers.printed.updatedAt = req.body.parentFlyers.printed.updatedAt

		if (req.body?.parentFlyers?.sentHome?.checked)
			foundSchoolReport.parentFlyers.sentHome.checked = req.body.parentFlyers.sentHome.checked
		if (req.body?.parentFlyers?.sentHome?.updatedAt)
			foundSchoolReport.parentFlyers.sentHome.updatedAt = req.body.parentFlyers.sentHome.updatedAt
		if (req.body?.schoolReport?.comment) foundSchoolReport.schoolReport.comment = req.body.schoolReport.comment

		if (req.body?.comment) foundSchoolReport.comment = req.body.comment

		const result = await foundSchoolReport.save()
		res.sendStatus(200)
	} catch (e) {
		console.log('There are some errors while updating the school report data to database')
		console.log(e.message)
	}
}

const deleteSchoolReport = async (req, res) => {
	if (!req?.body?.id) return res.status(400).json({ message: 'school report id is required to delete' })

	try {
		const foundSchoolReport = await SchoolReport.findOne({ _id: req.body.id }).exec()
		if (!foundSchoolReport) res.status(400).json({ message: 'school report with this id not found' })
		const result = await foundSchoolReport.deleteOne()
		res.sendStatus(200)
	} catch (e) {
		cosnole.error('There was an error while deleting the school report')
		console.error(e.message)
	}
}

module.exports = { getAllSchoolReports, updateSchoolReport, addSchoolReport, deleteSchoolReport }
