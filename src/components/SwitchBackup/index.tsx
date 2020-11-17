import * as React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { ThemeNames, Colors, selectColor } from '../../common/themeColors'
import ButtonBase from '../Button/ButtonBase'

interface SwitchProps {
	className?: string
	defaultChecked?: boolean
	color?: string
	bordered?: boolean
	disabled?: boolean
	name?: string
	value?: boolean
	error?: boolean
	onChange?(checked: boolean): void
	onFieldValueChange?(checked?: boolean, name?: string): void
}

interface StyleProps {
	color: Colors
	disabled: boolean
	checked: boolean
}

const useStyles = makeStyles(
	createStyles({
		root: ({ checked, color, disabled }: StyleProps) => ({
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			width: 40,
			height: 20,
			position: 'relative',
			background: checked ? color.main : '#fdfdfd',
			paddingLeft: 4,
			paddingRight: 4,
			borderRadius: 10,
			border: checked ? 'rgba(0,0,0,0)' : '1px solid #d9d9d9',
			opacity: disabled ? 0.5 : 1,
			cursor: disabled ? 'not-allowed' : 'pointer',
			transition: 'border .2s, background .2s',

			'&>div': {
				display: 'flex',
				alignItems: 'center',
				width: '100%',
				height: '100%'
			}
		}),
		button: ({ checked }: StyleProps) => ({
			width: 12,
			height: 12,
			borderRadius: '50%',
			background: checked ? '#fff' : '#303133',
			transform: checked ? 'translateX(19px)' : 'none',
			transition: 'transform .2s, background .2s'
		})
	})
)

const _Switch: React.FC<SwitchProps> = (props) => {
	const {
		className,
		color = ThemeNames.PRIMARY,
		disabled = false,
		defaultChecked = false,
		name,
		value = false,
		error = false,
		onChange = () => {},
		onFieldValueChange = () => {},
		...restProps
	} = props

	const [checked, setChecked] = React.useState<boolean>(defaultChecked)

	const stylesProps: StyleProps = {
		color: selectColor(color),
		checked,
		disabled
	}
	const classes = useStyles(stylesProps)

	const handleToggle = React.useCallback(() => {
		if (!disabled) {
			onChange(!checked)
			onFieldValueChange(!checked, name)
			setChecked((prev) => !prev)
		}
	}, [disabled, onChange, onFieldValueChange, checked, name])

	React.useEffect(() => {
		setChecked(value)
	}, [value])

	const switchCls = clsx(classes.root, className)

	return (
		<ButtonBase type="button" {...restProps} className={switchCls}>
			<div onClick={handleToggle}>
				<span className={classes.button}></span>
			</div>
		</ButtonBase>
	)
}

const Switch = React.memo(_Switch)
Switch.displayName = 'Switch'

export default Switch
