const express = require('express')
const router = express.Router()

/* GET banner preload javascript */
router.get(
	'/',
	(req, res, next) => {
		const code = `
			(function(win, doc, cb, tag, scr) {
				win[cb] = win[cb] || []
				win[cb].push({id: ${req.query.id}, target: '${req.query.target}'}); 
				tag = doc.getElementsByTagName('script')[0];
    			scr = doc.createElement('script');
    			scr.src = '/js/getadd.js';
    			scr.type = 'text/javascript';
    			scr.async = true;
    			tag.parentNode.insertBefore(scr, tag);
			})(window, document, 'getadd_cb')
		`

		res.send(code.replace(/\s+/, ''))
	}
)

module.exports = router
