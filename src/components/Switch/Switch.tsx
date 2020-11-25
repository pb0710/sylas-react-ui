import * as React from 'react'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { useBoolean, useInternalState } from '../../utils/hooks'
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
				fontSize: 14,
				color: '#777'
			}
		},
		switch: {
			display: 'inline-flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			width: 42,
			height: 20,
			padding: '0 4px',
			borderRadius: 12,
			border: '2px solid #e8e8e8',
			outline: 'none',
			background: '#f8f8f8',
			cursor: 'pointer',
			transition: 'border .2s, background .2s',
			'&:hover': {
				background: '#e8e8e8'
			},
			'&>input': {
				display: 'none'
			},
			'&>div': {
				display: 'flex',
				alignItems: 'center',
				width: 10,
				height: 10,
				borderRadius: 5,
				background: '#333',
				transition: 'transform .2s'
			}
		},
		focus: {
			borderColor: '#333'
		},
		activedPrimary: {
			borderColor: theme.palette.primary.main,
			background: theme.palette.primary.main,
			'&:hover': {
				borderColor: theme.palette.primary.dim,
				background: theme.palette.primary.dim
			},
			'&>div': {
				background: '#fff',
				transform: 'translateX(20px)'
			}
		},
		activedSuccess: {
			borderColor: theme.palette.success.main,
			background: theme.palette.success.main,
			'&:hover': {
				borderColor: theme.palette.success.dim,
				background: theme.palette.success.dim
			},
			'&>div': {
				background: '#fff',
				transform: 'translateX(20px)'
			}
		},
		activedWarning: {
			borderColor: theme.palette.warning.main,
			background: theme.palette.warning.main,
			'&:hover': {
				borderColor: theme.palette.warning.dim,
				background: theme.palette.warning.dim
			},
			'&>div': {
				background: '#fff',
				transform: 'translateX(20px)'
			}
		},
		activedError: {
			borderColor: theme.palette.error.main,
			background: theme.palette.error.main,
			'&:hover': {
				borderColor: theme.palette.error.dim,
				background: theme.palette.error.dim
			},
			'&>div': {
				background: '#fff',
				transform: 'translateX(20px)'
			}
		}
	})

export interface SwitchProps
	extends React.HTMLAttributes<HTMLDivElement>,
		WithStyles<typeof styles> {
	className?: string
	color?: ColorType
	value?: boolean
	onValueChange?(value: boolean): void
	description?: string
}

const Switch: React.FC<SwitchProps> = (props) => {
	const {
		classes,
		className,
		color = 'primary',
		value = false,
		onValueChange,
		onClick,
		description,
		...rest
	} = props

	const [checked, setChecked] = useInternalState<boolean>(value)
	const [focus, { setTrue: handleFocus, setFalse: handleBlur }] = useBoolean(false)

	const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
		event.preventDefault()
		onClick?.(event)
		onValueChange?.(!checked)
		setChecked((oldChecked) => !oldChecked)
	}

	const switchCls = clsx(
		classes.switch,
		{
			[classes[`actived${capitalize(color)}`]]: checked,
			[classes.focus]: focus
		},
		className
	)

	return (
		<label
			className={classes.wrapper}
			onFocus={handleFocus}
			onBlur={handleBlur}
			title={checked.toString()}
		>
			<div className={switchCls} onClick={handleClick} {...rest}>
				<div></div>
				<input type="checkbox" />
			</div>
			{description && <span>{description}</span>}
		</label>
	)
}

export const InternalSwitch = withStyles(styles, { name: 'Switch' })(Switch)
InternalSwitch.displayName = 'Switch'
