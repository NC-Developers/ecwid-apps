import {
	onEcwid,
} from './event.js'

type State = {
	customer?: any,
}

const state: State = {}
export const getState = (
) => {
	return state
}

const listeners: ((state: any) => void)[] = []
export const addListener = (
	callback: () => void,
) => {
	listeners.push(callback)
}
export const removeListener = (
	callback
) => {
	let index = listeners.indexOf(callback)
	listeners.splice(index, 1)
}

const dispatch = (
) => {
	for (const listener of listeners) {
		listener(state)
	}
}

onEcwid(() => {
	// Populate ecwid state.
	// @ts-ignore
	window.Ecwid.OnSetProfile.add((
		customer
	) => {
		state.customer = customer
		dispatch()
	})
	dispatch()
})