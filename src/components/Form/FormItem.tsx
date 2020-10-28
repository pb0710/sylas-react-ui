import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { FormContext } from './Form'
import { Callback, Values } from './hooks'

enum TextAlign {
	LEFT = 'left',
	RIGHT = 'right',
	CENTER = 'center'
}

const useStyles = makeStyles(
	createStyles({
		root: {
			boxSizing: 'border-box',
			display: 'flex',
			alignItems: 'center',
			width: '100%',
			padding: 0,
			marginBottom: 24
		},
		inner: {
			width: ({ col, label }: StyleProps) => `calc(100% - ${label ? col * 8 - 4 : 0}px)`,
			position: 'relative'
		},
		label: ({ col, textAlign }: StyleProps) => ({
			fontSize: 14,
			color: '#303133',
			textAlign,
			width: col * 8,
			marginRight: 4
		}),
		tip: {
			display: 'flex',
			alignItems: 'center',
			position: 'absolute',
			top: 32,
			left: 0,
			width: '100%',
			minHeight: 24,
			fontSize: 14,
			margin: 0,
			padding: 0,
			color: '#ff4d4f'
		}
	})
)

export interface Validator {
	(value?: string | boolean, callback?: Callback, values?: Values): Promise<void>
}

interface FormItemProps extends React.HTMLAttributes<HTMLLabelElement> {
	className?: string
	label?: string
	textAlign?: string
	col?: number
	name?: string
	initialValue?: string | boolean
	validator?: Validator
}

interface StyleProps {
	col: number
	textAlign: TextAlign
	label?: string
}

const _FormItem: React.FC<FormItemProps> = props => {
	const {
		children,
		className,
		label,
		textAlign = TextAlign.RIGHT,
		col = 10,
		name,
		initialValue,
		validator
	} = props

	const ctxProps = React.useContext(FormContext)
	const { values, errors, onFieldValueChange, setFieldsValue, syncFormItem } = ctxProps

	const value = name && values?.[name]
	const error = errors?.find(err => err.name === name)
	const isError = error !== undefined

	// 拥有错误提示特殊样式的组件列表
	const specialErrorList = ['Input', 'Password', 'TextArea']
	// 表单相关组件列表
	const formItemList = [...specialErrorList, 'Select', 'Switch']

	React.useEffect(
		() => {
			if (name) {
				syncFormItem(name, validator)
				// 考虑到 Switch 或 Checkbox 的 boolean 值，只过滤 null or undefined
				initialValue != null && setFieldsValue({ [name]: initialValue })
			}
		},
		// contextProps 不放到 deps 里
		[]
	)

	const baseProps = { name, value, onFieldValueChange }

	const classes = useStyles({ col, textAlign, label } as StyleProps)

	const formItemCls = clsx(classes.root, className)

	return (
		<div className={formItemCls}>
			{label && <label className={classes.label}>{label}：</label>}
			<div className={classes.inner}>
				{React.Children.map(children as any, (child: JSX.Element) =>
					specialErrorList.some(input => input === child?.type?.displayName)
						? React.cloneElement(child, { ...baseProps, error: isError })
						: formItemList.some(item => item === child?.type?.displayName)
						? React.cloneElement(child, baseProps)
						: React.cloneElement(child)
				)}
				<span className={classes.tip}>{error?.desc}</span>
			</div>
		</div>
	)
}

const FormItem = React.memo(_FormItem)
FormItem.displayName = 'FormItem'

export default FormItem
