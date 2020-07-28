import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { FormContext } from './Form'
import { ICallback, IValues } from './hooks'

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
			width: ({ col, label }: IStyleProps) => `calc(100% - ${label ? col * 8 - 4 : 0}px)`,
			position: 'relative'
		},
		label: ({ col, textAlign }: IStyleProps) => ({
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

export interface IValidator {
	(value?: string | boolean, callback?: ICallback, values?: IValues): Promise<void>
}

interface IFormItemProps extends React.HTMLAttributes<HTMLLabelElement> {
	className?: string
	label?: string
	textAlign?: string
	col?: number
	name?: string
	initialValue?: string | boolean
	validator?: IValidator
}

interface IStyleProps {
	col: number
	textAlign: TextAlign
	label?: string
}

const _FormItem: React.FC<IFormItemProps> = props => {
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

	const classes = useStyles({ col, textAlign, label } as IStyleProps)

	const formItemCls = clsx(classes.root, className)

	return (
		<div className={formItemCls}>
			{label && <label className={classes.label}>{label}：</label>}
			<div className={classes.inner}>
				{React.Children.map(children as any, (child: JSX.Element) =>
					specialErrorList.some(input => input === child?.type?.displayName)
						? React.cloneElement(child, { ...baseProps, error: isError })
						: React.cloneElement(child, baseProps)
				)}
				<span className={classes.tip}>{error?.desc}</span>
			</div>
		</div>
	)
}

const FormItem = React.memo(_FormItem)
FormItem.displayName = 'FormItem'

export default FormItem
