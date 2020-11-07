import * as React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { Context } from './Form'

const useStyles = makeStyles(
	createStyles({
		formItem: {
			display: 'flex'
		},
		label: {
			flex: '0 0 20%',
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
		explain: {
			width: '100%',
			minHeight: 24,
			lineHeight: 1.5,
			paddingBottom: 2
		}
	})
)

export interface FormItemProps {
	className?: string
	name?: string
	label?: string
	initialValue?: any
	validator?(): void
}

export function recursiveMap(
	children: React.ReactNode,
	fn: (child: React.ReactNode) => React.ReactNode
): React.ReactNode {
	return React.Children.map(children, (child) => {
		if (!React.isValidElement(child)) return child

		if (child.props.children) {
			child = React.cloneElement(child, {
				children: recursiveMap(child.props.children, fn)
			})
		}

		return fn(child)
	})
}

const FormItem: React.FC<FormItemProps> = (props) => {
	const { children, className, name, initialValue, label, ...rest } = props

	const initValueRef = React.useRef(initialValue)

	const [values, { dispatch, name: formName }] = React.useContext(Context)
	const value = name ? values[name] : undefined
	const id = `${formName}_${name}`

	const onValueChange = (value: any) => {
		if (name && dispatch) {
			dispatch({ type: 'set_fields_value', payload: { [name]: value } })
		}
	}

	const submit = () => {
		dispatch && dispatch({ type: 'submit' })
	}

	// initialValue only set once
	React.useEffect(() => {
		if (dispatch && name) {
			dispatch({ type: 'set_fields_value', payload: { [name]: initValueRef.current } })
		}
	}, [dispatch, name])

	const classes = useStyles()
	const formItemCls = clsx(classes.formItem, className)

	function renderChildren(): React.ReactNode {
		if (!React.isValidElement(children) || React.Children.count(children) !== 1) return children

		return recursiveMap(children, (child) => {
			if (!React.isValidElement(child)) return child

			const isSubmitType = child.props.htmlType === 'submit'
			const controlProps = isSubmitType ? { submit } : { value, onValueChange, id }

			return React.cloneElement(child, controlProps)
		})
	}

	return (
		<div className={formItemCls} {...rest}>
			{label && (
				<div className={classes.label}>
					<label htmlFor={`${formName}_${name}`}>{label}</label>
				</div>
			)}
			<div className={classes.control}>
				<div className={classes.content}>
					<div>{renderChildren()}</div>
				</div>
				<div className={classes.explain}></div>
			</div>
		</div>
	)
}

// const InternalFormItem: React.NamedExoticComponent<React.PropsWithChildren<FormItemProps>> = React.memo(FormItem)
const InternalFormItem = FormItem
InternalFormItem.displayName = 'FormItem'
export default InternalFormItem
