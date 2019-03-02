const path = require('path')
const fs = require('fs')
const os = require('os')

const keys = [
	'date',
	'code',
	'id',
	'uid',
	'location',
	'referer',
	'tz',
	'tz_offset',
	'plugins',
	'cookie',
	'webgl_hash'
]

const file = path.resolve(__dirname, '../data/access.log')

const divider = '\t'

const log = (data, code = 200) => {

	let dataToLog = keys.map(key => {
		switch (key) {
			case 'date':
				return new Date().toString()
			case 'code':
				return code
			default:
				return data[key] || ''
		}
	})
	fs.appendFile(file, dataToLog.join(divider) + os.EOL, err => {
		if (err) {
			console.error(err)
		}
	})
}

module.exports.log = log