import * as React from 'react'
import { initState } from './Context'

export type Values = Record<string, any>
export interface FormType {
	getState(): State
	dispatch: React.DispatchWithoutAction | React.Dispatch<Action>
	updateFieldsValue(values: Record<string, any>): void
	updateFieldsValidating(fieldsValidating: Record<string, boolean>): void
	updateFieldValidateResult(fieldsValidateResult: Record<string, any[]>): void
	updateSubmiting(submiting: boolean): void
	submit(): void
	getFieldValue(name: string): any
	validateFields(...names: string[]): void
}
export type Validator = { validator(value: unknown): Promise<unknown> }
export type Rule = Validator | ((form: FormType) => Validator)
export type State = {
	fieldsValidating: Record<string, boolean>
	fieldsValidateResult: Record<string, any[]>
	submiting: boolean
	values: Record<string, any>
}
export const enum actionTypes {
	UPDATE_SUBMITING = 'update_submiting',
	UPDATE_FIELDS_VALIDATING = 'update_fields_validating',
	UPDATE_FIELDS_VALUE = 'update_fields_value',
	UPDATE_FIELD_VALIDATE_RESULT = 'update_field_validate_result'
}

export type Action =
	| { type: actionTypes.UPDATE_FIELDS_VALUE; payload: Values }
	| { type: actionTypes.UPDATE_SUBMITING; payload: boolean }
	| { type: actionTypes.UPDATE_FIELDS_VALIDATING; payload: Record<string, boolean> }
	| { type: actionTypes.UPDATE_FIELD_VALIDATE_RESULT; payload: Record<string, any[]> }

let dispatch: React.Dispatch<Action>

export function reducer(state: State, action: Action): State {
	console.log(`logger action: ${action.type},`, action.payload)
	switch (action.type) {
		case actionTypes.UPDATE_SUBMITING:
			return { ...state, submiting: action.payload }

		case actionTypes.UPDATE_FIELDS_VALIDATING:
			return {
				...state,
				fieldsValidating: {
					...state.fieldsValidating,
					...action.payload
				}
			}

		case actionTypes.UPDATE_FIELD_VALIDATE_RESULT:
			return {
				...state,
				fieldsValidateResult: {
					...state.fieldsValidateResult,
					...action.payload
				}
			}

		case actionTypes.UPDATE_FIELDS_VALUE:
			return {
				...state,
				values: { ...state.values, ...action.payload }
			}

		default:
			throw Error('not match')
	}
}

type useEnhancedReducerReturnType = [() => State, React.Dispatch<Action>, State]

/**
 * customize useReducer. provide getState and enhancedReducer
 * @param reducer
 * @param initState
 * @param initializer
 */
export function useEnhancedReducer(
	reducer: Parameters<typeof React.useReducer>[0],
	initState: Parameters<typeof React.useReducer>[1],
	initializer?: Parameters<typeof React.useReducer>[2]
): useEnhancedReducerReturnType {
	const lastState = React.useRef<ReturnType<typeof reducer>>(initState)
	const getState = React.useCallback(() => lastState.current, [])
	// to prevent reducer called twice, per: https://github.com/facebook/react/issues/16295
	const enhancedReducer = React.useRef(
		(state: State, action: Action): State => (lastState.current = reducer(state, action))
	).current
	return [
		...React.useReducer(enhancedReducer, initState, initializer),
		getState
	].reverse() as useEnhancedReducerReturnType
}

/**
 * get form instance
 */
export function useForm(): FormType[] {
	const [getState, internalDispatch] = useEnhancedReducer(reducer, initState)
	dispatch = internalDispatch

	const updateSubmiting = React.useCallback((submiting: boolean) => {
		dispatch({ type: actionTypes.UPDATE_SUBMITING, payload: submiting })
	}, [])

	const updateFieldsValue = React.useCallback((values: Record<string, any>) => {
		dispatch({ type: actionTypes.UPDATE_FIELDS_VALUE, payload: values })
	}, [])

	const updateFieldsValidating = React.useCallback((fieldsValidating: Record<string, boolean>) => {
		dispatch({ type: actionTypes.UPDATE_FIELDS_VALIDATING, payload: fieldsValidating })
	}, [])

	const updateFieldValidateResult = React.useCallback((fieldsValidateResult: Record<string, any[]>) => {
		dispatch({ type: actionTypes.UPDATE_FIELD_VALIDATE_RESULT, payload: fieldsValidateResult })
	}, [])

	const submit = React.useCallback(() => {
		updateSubmiting(true)
	}, [updateSubmiting])

	const getFieldValue = React.useCallback((name: string) => getState().values[name], [getState])

	const validateFields = React.useCallback(
		(...names: string[]) => {
			const newValidating: Record<string, boolean> = {}
			names.forEach((name) => {
				newValidating[name] = true
			})
			updateFieldsValidating(newValidating)
		},
		[updateFieldsValidating]
	)

	const form: FormType = {
		getState,
		dispatch,
		updateFieldsValue,
		updateFieldsValidating,
		updateFieldValidateResult,
		updateSubmiting,
		submit,
		getFieldValue,
		validateFields
	}
	return [form]
}

/**
 * get reference to latest state
 * @param state
 */
export function useLastStateRef<S>(state: S): React.MutableRefObject<S> {
	const stateRef = React.useRef(state)
	React.useEffect(() => {
		stateRef.current = state
	}, [state])
	return stateRef
}
