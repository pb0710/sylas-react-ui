import * as React from 'react'
import { FormInstance } from './hooks'

const defaultValue: FormInstance = {
	setCallback() {},
	subscribeField: () => () => {},
	getFormInstance: () => defaultValue,
	getFieldValue() {},
	setFieldsValue() {},
	async validateFields() {},
	submit() {}
}
export const FormContext = React.createContext(defaultValue)
