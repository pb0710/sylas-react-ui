import * as React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { useInternalState } from '../../utils/hooks'

const useStyles = makeStyles(
	createStyles({
		switch: {},
		trigger: {}
	})
)

export interface SwitchProps extends React.HTMLAttributes<HTMLElement> {
	className?: string
	value?: boolean
	onValueChange?(value: boolean): void
}

const Switch: React.FC<SwitchProps> = (props) => {
	const { className, value = false, onValueChange, onClick, ...rest } = props

	const [checked, setChecked] = useInternalState(value)

	const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		onClick && onClick(event)
		setChecked((prev) => {
			onValueChange && onValueChange(!prev)
			return !prev
		})
	}

	const classes = useStyles()
	const inputCls = clsx(classes.switch, className)
	return (
		<button className={inputCls} type="button" onClick={handleClick} {...rest}>
			<div className={classes.trigger}>{checked ? 'on' : 'off'}</div>
		</button>
	)
}

const internalSwitch = Switch
internalSwitch.displayName = 'Switch'
export default internalSwitch
