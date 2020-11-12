import * as React from 'react'
import { FormType, State } from './hooks'

interface FormContextType {
	form: FormType
	formName: string
}

export const initState: State = {
	fieldsValidating: {},
	fieldsValidateResult: {},
	submiting: false,
	values: {}
}
const initContext = {
	formName: '',
	form: {
		getState() {
			return initState
		},
		dispatch() {},
		updateFieldsValue() {},
		updateFieldsValidating() {},
		updateFieldValidateResult() {},
		updateSubmiting() {},
		submit() {},
		getFieldValue() {},
		validateFields() {}
	}
}
export const FormContext = React.createContext<FormContextType>(initContext)
