import * as React from 'react'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { useBoolean, useInternalState } from '../../utils/hooks'

const styles = createStyles({
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
	actived: {
		borderColor: '#409eff',
		background: '#409eff',
		'&:hover': {
			borderColor: '#3a8ee6',
			background: '#3a8ee6'
		},
		'&>div': {
			background: '#fff',
			transform: 'translateX(20px)'
		}
	}
})

export interface SwitchProps extends React.HTMLAttributes<HTMLElement>, WithStyles<typeof styles> {
	className?: string
	value?: boolean
	onValueChange?(value: boolean): void
	description?: string
}

const Switch: React.FC<SwitchProps> = (props) => {
	const {
		classes,
		className = '',
		value = false,
		onValueChange,
		onClick,
		description,
		...rest
	} = props

	const [checked, setChecked] = useInternalState<boolean>(value)
	const [focus, { setTrue: handleFocus, setFalse: handleBlur }] = useBoolean(false)

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		event.stopPropagation()
		onClick?.(event)
		onValueChange?.(!checked)
		setChecked((oldChecked) => !oldChecked)
	}

	const switchCls = clsx({
		[classes.switch]: true,
		[classes.actived]: checked,
		[classes.focus]: focus,
		[className]: true
	})

	return (
		<label
			className={classes.wrapper}
			onFocus={handleFocus}
			onBlur={handleBlur}
			title={checked.toString()}
		>
			<button className={switchCls} type="button" onClick={handleClick} {...rest}>
				<div></div>
				<input />
			</button>
			{description && <span>{description}</span>}
		</label>
	)
}

export const InternalSwitch = withStyles(styles, { name: 'Switch' })(Switch)
InternalSwitch.displayName = 'Switch'
