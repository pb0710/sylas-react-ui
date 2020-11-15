import * as React from 'react'
import { FormContext } from './formContext'
import { FormInstance, useForm } from './hooks'

export interface FormProps {
	form?: FormInstance
	onFinsh(values: Record<string, unknown>): void
	onFail(errors: string[]): void
}

export const Form: React.FC<FormProps> = (props) => {
	const { children, form, onFinsh, onFail } = props
	const [formInstance] = useForm(form)

	React.useEffect(() => {
		formInstance.setCallback({ onFinsh, onFail })
	}, [formInstance, onFail, onFinsh])

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault()
		event.stopPropagation()
		formInstance.submit()
	}

	return (
		<form onSubmit={handleSubmit}>
			<FormContext.Provider value={formInstance}>{children}</FormContext.Provider>
		</form>
	)
}
