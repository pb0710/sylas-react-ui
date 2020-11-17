import * as React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { DownOutlined } from '@ant-design/icons'
import { TransitionGroup } from 'react-transition-group'
import { ThemeNames, selectColor, Colors } from '../../common/themeColors'
import DropList from './DropList'

export interface SelectOption {
	value: string
	desc: string
}

export interface SelectProps {
	children: any
	className?: string
	name?: string
	color?: string
	defaultValue?: string
	value?: string
	error?: boolean
	onChange?(value: string): void
	onFieldValueChange?(value?: string, name?: string): void
}

interface StyleProps {
	color: Colors
	dropVisible: boolean
}

const useStyles = makeStyles(
	createStyles({
		root: {
			width: 136,
			height: 32,
			fontSize: 14,
			color: '#303133',
			position: 'relative',
			cursor: 'pointer',
			userSelect: 'none'
		},
		select: ({ dropVisible }: StyleProps) => ({
			boxSizing: 'border-box',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			width: '100%',
			height: 32,
			background: '#fdfdfd',
			paddingLeft: 12,
			paddingRight: 12,
			borderRadius: 4,
			border: '1px solid #d9d9d9',
			color: dropVisible ? '#909399' : '#303133',
			transition: 'all 100ms'
		}),
		desc: {
			marginRight: 16,
			whiteSpace: 'nowrap',
			textOverflow: 'ellipsis',
			overflow: 'hidden'
		},
		dropDownIcon: ({ dropVisible }: StyleProps) => ({
			fontSize: 11,
			transform: dropVisible ? 'rotate(180deg)' : 'rotate(0)',
			transition: 'all 100ms'
		})
	})
)

const _Select: React.FC<SelectProps> = (props) => {
	const {
		children,
		className,
		name,
		defaultValue = '',
		color = ThemeNames.PRIMARY,
		value = defaultValue,
		onChange = () => {},
		onFieldValueChange = () => {}
	} = props

	const defaultOption = { desc: '', value: '' }
	const [selected, setSelected] = React.useState<SelectOption>(defaultOption)
	const [dropVisible, setDropVisible] = React.useState<boolean>(false)

	const handleShowDrop = () => {
		setDropVisible(true)
	}

	const handleHideDrop = () => {
		setDropVisible(false)
	}

	const handleChange = React.useCallback(
		(option: SelectOption) => {
			setSelected(option)
			onChange && onChange(option.value)
			onFieldValueChange && onFieldValueChange(option.value, name)
			handleHideDrop()
		},
		[onChange, onFieldValueChange, handleHideDrop, name]
	)

	const styleProps: StyleProps = {
		dropVisible,
		color: selectColor(color)
	}
	const classes = useStyles(styleProps)

	const handleSetOption = (value: string) => {
		if (children) {
			React.Children.forEach(children, (child: JSX.Element) => {
				if (child?.props?.value === value) {
					setSelected({
						desc: child.props.children,
						value
					})
				}
			})
		}
	}

	React.useEffect(() => {
		if (defaultValue) {
			handleSetOption(defaultValue)
		}
	}, [defaultValue])

	React.useEffect(() => {
		handleSetOption(value)
	}, [value])

	React.useEffect(() => {
		if (dropVisible) {
			document.addEventListener('click', handleHideDrop)
		}
		return () => {
			document.removeEventListener('click', handleHideDrop)
		}
	}, [dropVisible, handleHideDrop])

	const containerCls = clsx(classes.root, className)

	return (
		<div className={containerCls}>
			<div className={classes.select} onClick={handleShowDrop}>
				<span className={classes.desc}>{selected.desc}</span>
				<span className={classes.dropDownIcon}>
					<DownOutlined />
				</span>
			</div>
			<TransitionGroup component={null}>
				{dropVisible && (
					<DropList selected={selected} handleChange={handleChange}>
						{children}
					</DropList>
				)}
			</TransitionGroup>
		</div>
	)
}

const Select = React.memo(_Select)
Select.displayName = 'Select'

export default Select
