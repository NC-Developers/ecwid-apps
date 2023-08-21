import {
	onEcwid,
} from './event.js'

type State = {
	customer?: any,
}

const state: State = {}
export const getState = (
): State => {
	return state
}

const listeners: ((state: any) => void)[] = []

export const addListener = (
	callback: () => void,
): void => {
	listeners.push(callback)
}

export const removeListener = (
	callback
): void => {
	let index = listeners.indexOf(callback)
	listeners.splice(index, 1)
}

const dispatch = (
): void => {
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