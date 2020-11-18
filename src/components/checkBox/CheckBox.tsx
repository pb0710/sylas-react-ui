import * as React from 'react'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { useBoolean, useInternalState } from '../../utils/hooks'

const styles = createStyles({
	wrapper: {
		display: 'inline-flex',
		alignItems: 'center',
		marginRight: 8,
		fontWeight: 500,
		userSelect: 'none',
		'&>span:last-child': {
			padding: '0 8px',
			color: '#555'
		}
	},
	checkBox: {
		position: 'relative',
		display: 'inline-flex',
		width: 18,
		height: 18,
		border: '2px solid #e8e8e8',
		borderRadius: 4,
		background: '#fff',
		transition: 'border .2s,background-color .2s',
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
		}
	},
	focus: {
		borderColor: '#333'
	},
	actived: {
		borderColor: '#409eff',
		background: '#409eff',
		'&:after': {
			content: '" "',
			position: 'absolute',
			display: 'table',
			width: '50%',
			height: '80%',
			border: '2px solid #fff',
			borderTop: 0,
			borderLeft: 0,
			transform: 'rotate(45deg) translate(36%,-20%)',
			opacity: 1
		}
	}
})

export interface CheckItem {
	name: string
	value: boolean
}

interface CheckBoxProps extends WithStyles<typeof styles>, React.HTMLAttributes<HTMLInputElement> {
	className?: string
	name?: string
	value?: boolean
	onCheckedChange?(item: CheckItem): void
	onValueChange?(value: boolean): void
}

const CheckBox: React.FC<CheckBoxProps> = (props) => {
	const {
		classes,
		children,
		className = '',
		name,
		onCheckedChange,
		value = false,
		onValueChange,
		onClick
	} = props

	const [checked, setChecked] = useInternalState<boolean>(value)
	const [focus, { setTrue: handleFocus, setFalse: handleBlur }] = useBoolean(false)

	const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
		event.preventDefault()
		event.stopPropagation()
		onClick?.(event)
		onValueChange?.(!checked)
		name && onCheckedChange?.({ name, value: !checked })
		setChecked((checked) => !checked)
	}

	const checkBoxCls = clsx({
		[classes.checkBox]: true,
		[classes.focus]: focus,
		[classes.actived]: checked,
		[className]: true
	})

	return (
		<label className={classes.wrapper} onFocus={handleFocus} onBlur={handleBlur}>
			<span className={checkBoxCls}>
				<input type="checkbox" onClick={handleClick} />
			</span>
			{children && <span>{children}</span>}
		</label>
	)
}

export const InternalCheckBox = React.memo(withStyles(styles, { name: 'CheckBox' })(CheckBox))
InternalCheckBox.displayName = 'CheckBox'
