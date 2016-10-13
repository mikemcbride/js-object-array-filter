function objectInArray (term) {
	return element => objectHasValue(element, term)
}

function objectHasValue (obj, term) {
	for (let prop in obj) {
		// loop through every property in the object
		if (obj.hasOwnProperty(prop) && !!obj[prop]) {
			const thisProp = obj[prop]
			if (Object.prototype.toString.call(thisProp) === '[object Object]') {
				// we have an object. recursive filter on its properties.
				if (objectHasValue(thisProp, term)) {
					return true
				}
			} else if (thisProp.toString().toLowerCase().indexOf(term.toLowerCase()) !== -1) {
				return true
			}
		}
	}
	return false
}
