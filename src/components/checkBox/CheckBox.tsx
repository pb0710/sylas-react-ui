import * as React from 'react'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { useBoolean, useInternalState } from '../../utils/hooks'
import { Theme, ColorType } from '../jssBaseline/theme'
import { capitalize } from '../../utils'

const activedCommon = {
	'&:after': {
		content: '" "',
		position: 'absolute',
		display: 'table',
		width: '50%',
		height: '80%',
		border: '2px solid #fff',
		borderTop: 0,
		borderLeft: 0,
		transform: 'rotate(45deg) translate(36%,-18%)'
	}
}

const styles = (theme: Theme) =>
	createStyles({
		wrapper: {
			display: 'inline-flex',
			alignItems: 'center',
			marginRight: 8,
			fontWeight: 500,
			userSelect: 'none',
			'&>span:last-child': {
				padding: '0 8px',
				fontSize: 14,
				color: '#777'
			}
		},
		checkBox: {
			position: 'relative',
			display: 'inline-flex',
			width: 16,
			height: 16,
			border: '2px solid #e8e8e8',
			borderRadius: 4,
			background: '#fff',
			transition: 'border-color .2s,background-color .2s',
			'&>input': {
				zIndex: 1,
				opacity: 0,
				position: 'absolute',
				top: 0,
				right: 0,
				bottom: 0,
				left: 0,
				width: '100%',
				height: '100%',
				cursor: 'pointer'
			},
			'&:hover': {
				background: '#e8e8e8'
			}
		},
		focus: {
			borderColor: '#333'
		},
		activedPrimary: {
			borderColor: theme.palette.primary.main,
			background: theme.palette.primary.main,
			'&:hover': {
				background: theme.palette.primary.main
			},
			...activedCommon
		},
		activedSuccess: {
			borderColor: theme.palette.success.main,
			background: theme.palette.success.main,
			'&:hover': {
				background: theme.palette.success.main
			},
			...activedCommon
		},
		activedWarning: {
			borderColor: theme.palette.warning.main,
			background: theme.palette.warning.main,
			'&:hover': {
				background: theme.palette.warning.main
			},
			...activedCommon
		},
		activedError: {
			borderColor: theme.palette.error.main,
			background: theme.palette.error.main,
			'&:hover': {
				background: theme.palette.error.main
			},
			...activedCommon
		}
	})

export interface CheckItem {
	name: string
	value: boolean
}

interface CheckBoxProps extends WithStyles<typeof styles>, React.HTMLAttributes<HTMLElement> {
	className?: string
	name?: string
	color?: ColorType
	value?: boolean
	onCheckedChange?(item: CheckItem): void
	onValueChange?(value: boolean): void
}

const CheckBox: React.FC<CheckBoxProps> = (props) => {
	const {
		classes,
		children,
		className,
		name,
		color = 'primary',
		onCheckedChange,
		value = false,
		onValueChange,
		onClick,
		...rest
	} = props

	const [checked, setChecked] = useInternalState<boolean>(value)
	const [focus, { setTrue: handleFocus, setFalse: handleBlur }] = useBoolean(false)

	const onCustomClick = (event: React.MouseEvent<HTMLInputElement>): void => {
		event.preventDefault()
		event.stopPropagation()
		onClick?.(event)
		onValueChange?.(!checked)
		name && onCheckedChange?.({ name, value: !checked })
		setChecked((checked) => !checked)
	}

	const checkBoxCls = clsx(
		classes.checkBox,
		{
			[classes.focus]: focus,
			[classes[`actived${capitalize(color)}`]]: checked
		},
		className
	)

	return (
		<label {...rest} className={classes.wrapper} onFocus={handleFocus} onBlur={handleBlur}>
			<span className={checkBoxCls}>
				<input type="checkbox" onClick={onCustomClick} />
			</span>
			{children && <span>{children}</span>}
		</label>
	)
}

export const InternalCheckBox = React.memo(withStyles(styles, { name: 'CheckBox' })(CheckBox))
InternalCheckBox.displayName = 'CheckBox'
