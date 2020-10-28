import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { Form, Values, useForm } from './hooks'

export interface Callback {
	(desc: string): void
}

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
	className?: string
	form?: Form
	onValuesChange?(values?: Values): void
	onFinished?(values: Values): void
	onFailed?(): void
}

const useStyles = makeStyles(
	createStyles({
		root: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'space-around',
			width: '100%',
			height: '100%',
			minHeight: 120,
			padding: 8
		}
	})
)

const defaultCtx: Form = {
	submit: () => ({} as any),
	onFieldValueChange() {},
	syncFormItem() {},
	getFieldValue() {},
	setFieldsValue() {},
	validateFields: async () => 'pending'
}

export const FormContext = React.createContext<Form>(defaultCtx)

const _Form: React.FC<FormProps> = props => {
	const {
		children,
		className,
		// form 不传时自动创建
		form = useForm(),
		onValuesChange = () => {},
		onFinished = () => {},
		onFailed = () => {},
		...restProps
	} = props

	const customSubmit = React.useCallback(
		() =>
			form.submit().then(
				(res: Values) => {
					onFinished(res)
					return res
				},
				(err: string) => {
					onFailed()
					return err
				}
			),
		[onFinished, onFailed]
	)

	const classes = useStyles()

	React.useEffect(() => {
		onValuesChange(form.values)
	}, [form.values])

	const formCls = clsx(classes.root, className)

	const formCtx = { ...form, submit: customSubmit }

	return (
		<FormContext.Provider value={formCtx}>
			<form {...restProps} className={formCls}>
				{children}
			</form>
		</FormContext.Provider>
	)
}

const Form = React.memo(_Form)
Form.displayName = 'Form'

export default Form
