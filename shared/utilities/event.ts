export const onComplete = (
	callback: () => void,
) => {
	if (document.readyState === 'complete') {
		callback()
	} else {
		window.addEventListener('load', callback)
	}
}

export const onInteractive = (
	callback: () => void,
) => {
	if (document.readyState === 'complete' || document.readyState === 'interactive') {
		callback()
	} else {
		document.addEventListener('DOMContentLoaded', callback)
	}
}