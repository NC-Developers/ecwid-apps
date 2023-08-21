import {
	addListener,
	getState,
} from '../../../shared/ecwid/state.js'
import {
	updateSettings
} from '../../../shared/ecwid/update.js'

const settingCollections = [{
	filter: () => !getState().customer,
	options: {
		product_details_show_product_price: false,
		product_details_show_sale_price: false,
		product_details_show_price_per_unit: false,
		product_list_price_behavior: 'HIDE',
	},
}, {
	orderFields: {
		companyName: {
			checkoutDisplaySection: 'email',
			orderDetailsDisplaySection: 'customer_info',
			required: true,
			showInInvoice: true,
			showInNotifications: true,
			title: 'Bedrijfsnaam',
			type: 'text',
		},
		kvkNumber: {
			checkoutDisplaySection: 'email',
			orderDetailsDisplaySection: 'customer_info',
			required: true,
			showInInvoice: true,
			showInNotifications: true,
			title: 'KVK-nummer',
			type: 'text',
		},
	},
}]

addListener(() => updateSettings(settingCollections))
updateSettings(settingCollections)
