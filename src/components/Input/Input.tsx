import React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { hex2Rgba } from '../../utils'
import { ThemeNames, Colors, selectColor } from '../../common/themeColors'
import { InputBase } from './baseComponents'
import SuffixBtn from './SuffixBtn'

export interface InputProps extends React.HTMLAttributes<HTMLElement> {
	className?: string
	inputClassName?: string
	Component?: any
	name?: string
	value?: string
	error?: boolean
	placeholder?: string
	type?: string
	color?: string
	disabled?: boolean
	enterButton?: React.ReactNode | null
	onChange?(event: React.FormEvent<HTMLElement>): void
	onFieldValueChange?(value: string, name?: string): void
	onSearch?(value: string): void
}

interface StyleProps {
	color: Colors
	focus: boolean
	disabled: boolean
	error: boolean
	type: string
}

interface Focus {
	(event: React.FocusEvent<HTMLElement>): void
}

export enum InputTypes {
	TEXT = 'text',
	PASSWORD = 'password',
	SEARCH = 'search'
}

const useStyles = makeStyles(
	createStyles({
		root: {
			// Input.Group compact用到，防止box-shadow被遮挡
			zIndex: ({ focus }: StyleProps) => (focus ? 1 : 0),
			width: 200,
			height: 32,
			minWidth: 200,
			minHeight: 32,
			background: '#fdfdfd',
			borderRadius: 4,
			position: 'relative'
		},
		input: ({ color, focus, disabled, error, type }: StyleProps) => {
			const errorColor = selectColor(ThemeNames.ERROR)
			const bdColor = error ? errorColor.main : focus ? color.main : '#d9d9d9'
			const bxsWidth = focus ? 2 : 8
			const bxsColor = hex2Rgba(error ? errorColor.main : color.main, focus ? 0.7 : 0)
			return {
				paddingRight: type === InputTypes.SEARCH ? 32 : 8,
				border: `1px solid ${bdColor}`,
				boxShadow: `0 0 0 ${bxsWidth}px ${bxsColor}`,
				opacity: disabled ? 0.5 : 1,
				cursor: disabled ? 'not-allowed' : 'default'
			}
		}
	})
)

const _Input: React.ForwardRefRenderFunction<unknown, InputProps> = (props, ref) => {
	const {
		className,
		inputClassName,
		Component = InputBase,
		name,
		value = '',
		error = false,
		placeholder,
		type = InputTypes.TEXT,
		color = ThemeNames.PRIMARY,
		disabled = false,
		enterButton = null,
		onFieldValueChange = () => {},
		onChange = () => {},
		onSearch = () => {},
		...restProps
	} = props
	const { onFocus, onBlur } = restProps

	const [inputVal, setInputVal] = React.useState<string>('')
	const [focus, setFocus] = React.useState<boolean>(false)
	const [invisible, setInvisible] = React.useState<boolean>(true)

	const styleProps: StyleProps = { type, focus, disabled, error, color: selectColor(color) }
	const classes = useStyles(styleProps)

	const handleInputFocus: Focus = React.useCallback(
		e => {
			onFocus && onFocus(e)
			setFocus(true)
		},
		[onFocus]
	)

	const handleInputBlur: Focus = React.useCallback(
		e => {
			onBlur && onBlur(e)
			setFocus(false)
		},
		[onBlur]
	)

	const handleInputChange = React.useCallback(
		e => {
			const keywords = e.target.value
			setInputVal(keywords)
			onFieldValueChange && onFieldValueChange(keywords, name)
			onChange && onChange(keywords)
		},
		[onFieldValueChange, onChange, name]
	)

	const handleSearch = React.useCallback(() => {
		onSearch && onSearch(inputVal)
	}, [inputVal, onSearch])

	const handleKeyDown = React.useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.keyCode === 13) {
				onSearch && onSearch(inputVal)
			}
		},
		[inputVal, onSearch]
	)

	const handleTogglePrivate = () => {
		setInvisible(prev => !prev)
	}

	React.useEffect(() => {
		setInputVal(value)
	}, [value])

	const renderSuffix = () => {
		switch (type) {
			case InputTypes.SEARCH:
				return <SuffixBtn onClick={handleSearch}>{enterButton}</SuffixBtn>
			case InputTypes.PASSWORD:
				return (
					<SuffixBtn onClick={handleTogglePrivate}>{invisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}</SuffixBtn>
				)
			default:
				return
		}
	}

	const inputType = type === InputTypes.PASSWORD ? (invisible ? type : InputTypes.TEXT) : InputTypes.TEXT

	const containerCls = clsx(classes.root, className)
	const inputCls = clsx(classes.input, inputClassName)

	return (
		<div ref={ref as any} className={containerCls}>
			<Component
				{...restProps}
				className={inputCls}
				type={inputType}
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				onKeyDown={handleKeyDown}
				onChange={handleInputChange}
				name={name}
				value={inputVal}
				disabled={disabled}
				placeholder={placeholder}
			/>
			{renderSuffix()}
		</div>
	)
}

const Input = React.memo(React.forwardRef<unknown, InputProps>(_Input))
Input.displayName = 'Input'

export default Input
