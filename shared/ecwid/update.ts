import {
	alphanumericName,
} from '../../shared/utilities/text.js'

// TODO: Create type for settings collections.
// const settingCollections = [{
//   callback: function() {},
//   filter: {} || function() {},
//   options: {},
//   orderFields: {},
// }]

export const updateSettings = (
	settingCollections: any,
) => {
	// @ts-ignore
	window.ec = window.ec || Object()
	// @ts-ignore
	window.ec.order = window.ec.order || Object()
	// @ts-ignore
	window.ec.order.extraFields = window.ec.order.extraFields || Object()
	// @ts-ignore
	window.ec.storefront = window.ec.storefront || Object()

	for (const settingCollection of settingCollections) {
		const clearFields = () => {
			// Remove options.
			if (
				settingCollection.options &&
				typeof (settingCollection.options) === 'object' &&
				!Array.isArray(settingCollection.options)
			) {
				for (const key in settingCollection.options) {
					if (!Object.hasOwnProperty.call(settingCollection.options, key)) {
						continue
					}
					// @ts-ignore
					delete window.ec.storefront[key]
				}
			}

			// Remove extra fields.
			if (
				settingCollection.orderFields &&
				typeof (settingCollection.orderFields) === 'object' &&
				!Array.isArray(settingCollection.orderFields)
			) {
				for (let name in settingCollection.orderFields) {
					if (!Object.hasOwnProperty.call(settingCollection.orderFields, name)) {
						continue
					}
					// @ts-ignore
					delete ec.order.extraFields[alphanumericName(name)]
				}
			}
		}

		if (
			settingCollection.filter !== undefined &&
			settingCollection.filter !== null
		) {
			if (settingCollection.filter === false) {
				clearFields()
				continue
			} else if (
				typeof (settingCollection.filter) === 'function'
			) {
				if (!settingCollection.filter()) {
					clearFields()
					continue;
				}
			} else {
				// TODO:
				console.warn('Filters by object data not yet implemented!')
			}
		}

		// Set options.
		if (
			settingCollection.options &&
			typeof (settingCollection.options) === 'object' &&
			!Array.isArray(settingCollection.options)
		) {
			for (const key in settingCollection.options) {
				if (!Object.hasOwnProperty.call(settingCollection.options, key)) {
					continue
				}
				// @ts-ignore
				window.ec.storefront[key] = settingCollection.options[key]
			}
		}

		// Set order extra fields.
		if (
			settingCollection.orderFields &&
			typeof (settingCollection.orderFields) === 'object' &&
			!Array.isArray(settingCollection.orderFields)
		) {
			for (let name in settingCollection.orderFields) {
				if (!Object.hasOwnProperty.call(settingCollection.orderFields, name)) {
					continue
				}
				const field = settingCollection.orderFields[name]
				// @ts-ignore
				ec.order.extraFields[alphanumericName(name)] = field
			}
		}

		// Invoke callback.
		if (settingCollection.callback && typeof (settingCollection.callback) === 'function') {
			settingCollection.callback()
		}
	}

	// @ts-ignore
	if (window.Ecwid && window.Ecwid.refreshConfig) {
		// @ts-ignore
		window.Ecwid.refreshConfig()
	}
}