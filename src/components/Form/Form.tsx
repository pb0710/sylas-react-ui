import * as React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { FormType, useForm, Values } from './hooks'
import { FormContext } from './Context'

const useStyles = makeStyles(
	createStyles({
		form: {}
	})
)

export interface FormProps {
	className?: string
	name?: string
	form?: FormType
	onFinsh?(values: Values): void
	onFailed?(): void
	onValuesChange?(values: Values): void
}

const Form: React.FC<FormProps> = (props) => {
	const { children, className, form, name = '', onFinsh, onFailed, onValuesChange, ...rest } = props
	// const [defaultForm] = useForm()
	const formEntity = form as FormType
	const { getState, updateSubmiting, validateFields } = formEntity
	const { values, submiting, fieldsValidateResult } = getState()

	React.useEffect(() => {
		console.log('fieldsValidateResult', fieldsValidateResult)
	}, [fieldsValidateResult])

	// React.useEffect(() => {
	// 	if (submiting) {
	// 		validateFields(...Object.keys(getState().fieldsValidateResult))
	// 		if (Object.values(getState().fieldsValidateResult).some((value: string[]) => value.length)) {
	// 			onFailed?.()
	// 		} else {
	// 			onFinsh?.(getState().values)
	// 		}
	// 		updateSubmiting(false)
	// 	}
	// }, [getState, onFailed, onFinsh, submiting, updateSubmiting, validateFields])

	React.useEffect(() => {
		// onValuesChange?.(getState().values)
	}, [getState, onValuesChange])

	const classes = useStyles()
	const formCls = clsx(classes.form, className)
	return (
		<FormContext.Provider value={{ form: form as FormType, formName: name }}>
			<div className={formCls} {...rest}>
				{children}
			</div>
		</FormContext.Provider>
	)
}

const internalForm = Form
internalForm.displayName = 'Form'
export default internalForm
