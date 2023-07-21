import {
	onComplete,
	onInteractive,
} from '../utilities/event.js'

let isLoaded = false
const updateIsLoaded = () => {
	// @ts-ignore
	isLoaded = window.Ecwid && window.Ecwid.refreshConfig
}
updateIsLoaded()

export const onEcwid = (
	callback: () => void,
) => {
	if (isLoaded) {
		callback()
		return
	}
	// @ts-ignore
	if (window.Ecwid.OnAPILoaded) {
		// @ts-ignore
		window.Ecwid.OnAPILoaded.add(callback)
		return
	}
	onInteractive(() => {
		// @ts-ignore
		if (window.Ecwid.OnAPILoaded) {
			// @ts-ignore
			window.Ecwid.OnAPILoaded.add(callback)
			return
		}
		onComplete(() => {
			// @ts-ignore
			if (window.Ecwid.OnAPILoaded) {
				// @ts-ignore
				window.Ecwid.OnAPILoaded.add(callback)
				return
			}
			console.warn('Unable to wait for Ecwid API loading!')
		})
	})
}