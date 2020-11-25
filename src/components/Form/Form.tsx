import * as React from 'react'
import { FormContext } from './formContext'
import { FormInstance, useForm } from './hooks'

export interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
	form?: FormInstance
	onFinsh(values: Record<string, unknown>): void
	onFail?(errors: string[]): void
	onValuesChange?(values: Record<string, unknown>): void
}

export const Form: React.FC<FormProps> = (props) => {
	const { children, form, onFinsh, onFail = () => {}, onValuesChange = () => {}, ...rest } = props
	const [formInstance] = useForm(form)

	React.useEffect(() => {
		formInstance.setCallback({ onFinsh, onFail, onValuesChange })
	}, [formInstance, onFail, onFinsh, onValuesChange])

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault()
		formInstance.submit()
	}

	return (
		<form {...rest} onSubmit={handleSubmit}>
			<FormContext.Provider value={formInstance}>{children}</FormContext.Provider>
		</form>
	)
}
