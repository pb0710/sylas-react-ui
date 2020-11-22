import * as React from 'react'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import { TransitionGroup } from 'react-transition-group'
import clsx from 'clsx'
import { useBoolean, useInternalState } from '../../utils/hooks'
import { CaretDownFilled } from '@ant-design/icons'
import { InternalDropList as DropList } from './DropList'
import { Chosen } from './Option'
import { Theme, ColorType } from '../jssBaseline/theme'
import { capitalize } from '../../utils'

const styles = (theme: Theme) =>
	createStyles({
		wrapper: {
			display: 'inline-flex',
			alignItems: 'center',
			fontWeight: 500,
			userSelect: 'none',
			'&>span:last-child': {
				paddingLeft: 16,
				color: '#555'
			}
		},
		select: {
			zIndex: 1,
			position: 'relative',
			display: 'inline-flex',
			alignItems: 'center',
			minWidth: '160px',
			maxWidth: '100%',
			height: 40,
			border: '2px solid #f8f8f8',
			borderRadius: 4,
			background: '#f8f8f8',
			cursor: 'pointer',
			transition: 'background .25s, border .25s',
			'&:hover': {
				borderColor: '#eee',
				background: '#eee'
			},
			'&>span:first-child': {
				paddingLeft: 14,
				paddingRight: 32,
				whiteSpace: 'nowrap',
				textOverflow: 'ellipsis',
				overflow: 'hidden',
				fontWeight: 500
			},
			'&>input': {
				position: 'relative',
				left: 8,
				width: 0,
				height: 0,
				padding: 0,
				opacity: 0,
				cursor: 'default'
			}
		},
		focusPrimary: {
			borderColor: theme.palette.primary.main,
			'&:hover': {
				borderColor: theme.palette.primary.main,
				background: '#fff'
			}
		},
		focusSuccess: {
			borderColor: theme.palette.success.main,
			'&:hover': {
				borderColor: theme.palette.success.main,
				background: '#fff'
			}
		},
		focusWarning: {
			borderColor: theme.palette.warning.main,
			'&:hover': {
				borderColor: theme.palette.warning.main,
				background: '#fff'
			}
		},
		focusError: {
			borderColor: theme.palette.error.main,
			'&:hover': {
				borderColor: theme.palette.error.main,
				background: '#fff'
			}
		},
		icon: {
			position: 'absolute',
			right: 10,
			fontSize: 12,
			color: '#444',
			transform: 'scaleX(1.1)'
		}
	})

export interface SelectProps extends React.HTMLAttributes<HTMLElement>, WithStyles<typeof styles> {
	className?: string
	description?: string
	color?: ColorType
	value?: string
	onValueChange?(value: string): void
}

const Select: React.FC<SelectProps> = (props) => {
	const {
		classes,
		children,
		className,
		description = '',
		color = 'primary',
		value = '',
		onValueChange,
		...rest
	} = props

	const [picking, setPicking] = useInternalState<string>(value)
	const [name, setName] = React.useState<React.ReactNode>()
	const [selectedIndex, setSelectedIndex] = React.useState<number>(0)
	const [focus, { setTrue: handleFocus, setFalse: handleBlur }] = useBoolean(false)

	const onChoose = React.useCallback(
		(chosen: Chosen): void => {
			const { value, description } = chosen
			onValueChange?.(value)
			setPicking(value)
			setName(description)
		},
		[onValueChange, setPicking]
	)

	React.useEffect(() => {
		React.Children.forEach(children, (child, index) => {
			if (React.isValidElement(child)) {
				const { props } = child
				if (props.value === value) {
					setName(props.children)
					setSelectedIndex(index)
				}
			}
		})
	}, [children, value])

	const controlProps = {
		color,
		chosen: {
			value: picking,
			description: name
		},
		onChoose
	}

	const selectCls = clsx(
		classes.select,
		{
			[classes[`focus${capitalize(color)}`]]: focus
		},
		className
	)

	return (
		<div className={classes.wrapper}>
			<label className={selectCls} {...rest}>
				<span title={picking}>{name}</span>
				<input onFocus={handleFocus} onBlur={handleBlur} />
				<CaretDownFilled className={classes.icon} />
				<TransitionGroup>
					{focus && (
						<DropList index={selectedIndex}>
							{React.Children.map(children, (child) =>
								React.isValidElement(child) ? React.cloneElement(child, controlProps) : child
							)}
						</DropList>
					)}
				</TransitionGroup>
			</label>
			{description && <span>{description}</span>}
		</div>
	)
}

export const InternalSelect = React.memo(withStyles(styles, { name: 'Select' })(Select))
InternalSelect.displayName = 'Select'
