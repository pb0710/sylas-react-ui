import * as React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { FormContext } from './Context'
import { Rule, useLastStateRef, Validator } from './hooks'
import { recursiveMap } from '../../utils'

const useStyles = makeStyles(
	createStyles({
		formItem: {
			display: 'flex'
		},
		label: {
			flex: '0 0 25%',
			height: '100%',
			whiteSpace: 'nowrap',
			textAlign: 'right',
			overflow: 'hidden',

			'&>label': {
				display: 'inline-flex',
				alignItems: 'center',
				height: 32,

				'&:after': {
					content: '":"',
					marginRight: 8,
					marginLeft: 2
				}
			}
		},
		control: {
			width: '100%'
		},
		content: {
			width: '100%',
			display: 'flex',
			alignItems: 'center',
			minHeight: 32,

			'&>div': {
				width: '100%'
			}
		},
		explainList: {
			width: '100%',
			minHeight: 24,
			lineHeight: 1.5,
			paddingBottom: 2,

			'&>p': {
				margin: 0,
				// color: '#dc004e'
				color: '#f56c6c'
			}
		}
	})
)

export interface FormItemProps {
	className?: string
	name?: string
	label?: string
	initialValue?: any
	rules?: Rule[]
}

const FormItem: React.FC<FormItemProps> = (props) => {
	const { children, className, name = '', initialValue, label, rules = [], ...rest } = props

	// initialValue only render once and it would never changed again.
	const initValueRef = React.useRef(initialValue)
	const [explains, setExplains] = React.useState<JSX.Element[]>([])

	const { form, formName } = React.useContext(FormContext)
	const {
		getState,
		dispatch,
		getFieldValue,
		submit,
		updateFieldsValue,
		updateFieldsValidating,
		updateFieldValidateResult,
		validateFields
	} = form
	const value = getFieldValue(name)
	const fieldValidating = getState().fieldsValidating[name] || false
	const fieldId = `field_${formName}_${name}`

	// always get lastest validate function
	const validateRef = useLastStateRef((): void => {
		Promise.allSettled(
			rules.map(async (rule: Rule) => {
				const ruleEntity: Validator = typeof rule === 'function' ? rule(form) : rule
				const value = getState().values[name]
				return await ruleEntity.validator(value)
			})
		)
			.then((results) => {
				const newExplains: JSX.Element[] = results
					.map((result) => (result.status === 'rejected' ? result.reason : undefined))
					.filter(Boolean)
					.map((explain, index) => <p key={index}>{explain}</p>)
				setExplains(newExplains)
				updateFieldValidateResult({ [name]: newExplains })
			})
			.finally(() => {
				updateFieldsValidating({ [name]: false })
			})
	})

	const onValueChange = React.useCallback(
		(value: any): void => {
			updateFieldsValue({ [name]: value })
			validateFields(name)
		},
		[name, updateFieldsValue, validateFields]
	)

	React.useEffect(() => {
		if (fieldValidating) {
			validateRef.current()
		}
	}, [fieldValidating, validateRef])

	// initialize only once.
	React.useEffect(() => {
		if (!name) return
		updateFieldsValue({ [name]: initValueRef.current })
		updateFieldValidateResult({ [name]: [] })
	}, [name, updateFieldsValue, updateFieldValidateResult])

	const classes = useStyles()
	const formItemCls = clsx(classes.formItem, className)

	function renderChildren(): React.ReactNode {
		if (!React.isValidElement(children) || React.Children.count(children) !== 1) return children

		return recursiveMap(children, (child: React.ReactNode) => {
			if (!React.isValidElement(child)) return child

			const isSubmitType: boolean = child.props.htmlType === 'submit'
			const controlProps = isSubmitType ? { submit } : { value, onValueChange, id: fieldId }
			return React.cloneElement(child, controlProps)
		})
	}

	return (
		<div className={formItemCls} {...rest}>
			{label && (
				<div className={classes.label}>
					<label htmlFor={fieldId}>{label}</label>
				</div>
			)}
			<div className={classes.control}>
				<div className={classes.content}>
					<div>{renderChildren()}</div>
				</div>
				<div className={classes.explainList}>{explains}</div>
			</div>
		</div>
	)
}

const InternalFormItem: React.NamedExoticComponent<React.PropsWithChildren<FormItemProps>> = React.memo(FormItem)
// const InternalFormItem = FormItem
InternalFormItem.displayName = 'FormItem'
export default InternalFormItem
