import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import clsx from 'clsx'
import * as React from 'react'
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
	radio: {
		position: 'relative',
		display: 'inline-flex',
		width: 18,
		height: 18,
		border: '2px solid #e8e8e8',
		borderRadius: '50%',
		background: '#fff',
		transition: 'border-color .2s, background-color .2s',
		'&:hover': {
			background: '#e8e8e8'
		},
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
		'&:hover': {
			background: '#fff'
		},
		'&:after': {
			content: '" "',
			position: 'absolute',
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			display: 'table',
			width: 'calc(100% - 6px)',
			height: 'calc(100% - 6px)',
			borderRadius: '50%',
			margin: 3,
			background: '#409eff'
		}
	}
})

interface RadioProps extends WithStyles<typeof styles> {
	className?: string
	value: string
	chosen?: string
	onCustomChange?(value: string): void
}

const Radio: React.FC<RadioProps> = (props) => {
	const { classes, children, className = '', chosen, value, onCustomChange } = props

	const [checked, setChecked] = useInternalState<boolean>(false)
	const [focus, { setTrue: handleFocus, setFalse: handleBlur }] = useBoolean(false)

	const handleClick = React.useCallback(
		(event: React.MouseEvent<HTMLInputElement>): void => {
			event.preventDefault()
			event.stopPropagation()
			if (chosen !== value) {
				onCustomChange?.(value)
				setChecked((oldChecked) => !oldChecked)
			}
		},
		[chosen, value, onCustomChange, setChecked]
	)

	React.useEffect(() => {
		setChecked(chosen === value)
	}, [chosen, setChecked, value])

	const radioCls = clsx({
		[classes.radio]: true,
		[classes.focus]: focus,
		[classes.actived]: checked,
		[className]: true
	})

	return (
		<label className={classes.wrapper} onFocus={handleFocus} onBlur={handleBlur}>
			<span className={radioCls}>
				<input type="radio" onClick={handleClick} />
			</span>
			{children && <span>{children}</span>}
		</label>
	)
}

export const InternalRadio = React.memo(withStyles(styles, { name: 'Radio' })(Radio))
InternalRadio.displayName = 'Radio'
