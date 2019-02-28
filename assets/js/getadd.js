import {UniqueId, webgl} from './utils/index'

((win, doc) => {
	const KEY = 'getadd_cb';
	const URL = '/getadd'

	const getAdd = (id, target) => {
		let data = {
			id: id,
			uid: UniqueId(),
			location: doc.location.href,
			referer: doc.referrer,
			tz: (win.Intl &&  Intl.DateTimeFormat().resolvedOptions().timeZone) || '',
			tz_offset: (new Date).getTimezoneOffset() * -1,
			plugins: ((win.navigator && Array.prototype.slice.apply(navigator.plugins)) || []).map(plugin => plugin.name).join(','),
			cookie: (win.navigator && navigator.cookieEnabled) || false,
			webgl_hash: webgl()
		}

		data.cb = '_cb_' + data.uid;

		let link = URL + '?' + Object.keys(data).map(k => encodeURIComponent(k) + "=" + encodeURIComponent(data[k])).join('&')

		win[data.cb] = (data) => {
			try {
				const a = doc.createElement('a')
				const img = a.appendChild(doc.createElement('img'))
				const dst = doc.getElementById(target)
				dst.innerHTML = ''
				dst.appendChild(a)
				a.href = data.link
				a.target = '_blank'
				img.alt = ''
				img.src = data.src
			} catch (e) {
			}
		}

		// Use script json for cross domain support
		const tag = doc.getElementsByTagName('script')[0]
		const script = doc.createElement('script')
		script.src = link
		script.type = 'text/javascript'
		script.async = true;
		tag.parentNode.insertBefore(script, tag);
	}

	/**
	 * Check each 0.5sec if new banner added (ex html generated from ajax request)
	 */
	setInterval(() => {
		const calls = win[KEY] || []
		delete win[KEY]

		for (let i = 0, len = calls.length; i < len; i++) {
			getAdd(calls[i].id, calls[i].target)
		}
	}, 500)


})(window, document)