const express = require('express')
const router  = express.Router()
const banners = require('../data/banners')
const logger = require('../utils/datalog')

/* GET users listing. */
router.get('/', function (req, res, next) {
	const id = parseInt(req.query.id, 10)
	const banner = banners.find(item => item.id === id)

	const code = banner ? 200 : 404

	logger.log(req.query, code)

	switch (code) {
		case 404:
			res.status(404).send('ID not found')
			break
		default:
			res.send(req.query.cb + '(' + JSON.stringify(banner) + ')')
	}

})

module.exports = router
