const UniqueId = (length = 8) => {

	const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

	const parts = (+new Date).toString().split('').reverse()
	const parts_length = parts.length

	let result = '';

	for (let i = 0; i < length; i++) {
		result += parts[getRandomInt(0, parts_length - 1)]
	}

	return result
}

export default UniqueId
