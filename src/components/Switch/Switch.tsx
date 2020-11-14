import * as React from 'react'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { useInternalState } from '../../utils/hooks'

const styles = createStyles({
	wrapper: {
		display: 'inline-flex',
		alignItems: 'center',
		'&>span': {
			paddingLeft: 16
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
		'&>div': {
			display: 'flex',
			alignItems: 'center',
			width: 10,
			height: 10,
			borderRadius: 5,
			background: '#333',
			transition: 'transform .2s ease-out'
		}
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
	const { classes, className = '', value = false, onValueChange, onClick, description, ...rest } = props
	const [checked, setChecked] = useInternalState<boolean>(value)

	const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		onClick?.(event)
		onValueChange?.(!checked)
		setChecked((oldChecked) => !oldChecked)
	}

	const switchCls = clsx({
		[classes.switch]: true,
		[classes.actived]: checked,
		[className]: true
	})
	return (
		<label className={classes.wrapper}>
			<button className={switchCls} type="button" onClick={handleClick} {...rest} onFocus={console.log}>
				<div></div>
			</button>
			{description && <span>{description}</span>}
		</label>
	)
}

export const InternalSwitch = withStyles(styles)(Switch)
InternalSwitch.displayName = 'Switch'
