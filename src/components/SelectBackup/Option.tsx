import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { ThemeNames, Colors, selectColor } from '../../common/themeColors'
import { SelectOption } from './Select'

interface OptionProps extends React.HTMLAttributes<HTMLElement> {
	className?: string
	color?: string
	timeout?: number
	value?: string
	isCurrent?: boolean
	handleChange?(option?: SelectOption): void
}

interface StyleProps {
	color: Colors
	timeout: number
	isCurrent: boolean
}

const useStyles = makeStyles({
	root: ({ color, isCurrent, timeout }: StyleProps) => ({
		display: 'flex',
		alignItems: 'center',
		width: 'inherit',
		height: 32,
		background: 'tranparent',
		transition: `background ${timeout}ms`,

		'&:hover': {
			background: 'rgba(160, 160, 160, .1)'
		},

		...(isCurrent
			? {
					color: color.main,
					background: color.ripple,

					'&:hover': {
						background: color.ripple
					}
			  }
			: {
					color: '#303133'
			  })
	}),
	text: {
		marginLeft: 12,
		marginRight: 12,
		fontSize: 14,
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		overflow: 'hidden'
	}
})

const _Option: React.FC<OptionProps> = (props) => {
	const {
		className,
		children,
		value = '',
		handleChange = () => {},
		color = ThemeNames.PRIMARY,
		timeout = 200,
		isCurrent = false,
		...restProps
	} = props

	const styleProps: StyleProps = {
		color: selectColor(color),
		timeout,
		isCurrent
	}
	const classes = useStyles(styleProps)

	const handleSelect = React.useCallback(() => {
		const nextOption: SelectOption = {
			desc: children as string,
			value
		}
		handleChange(nextOption)
	}, [value, handleChange])

	const optionCls = clsx(classes.root, className)

	return (
		<div {...restProps} className={optionCls} onClick={handleSelect}>
			<span className={classes.text}>{children}</span>
		</div>
	)
}

const Option = React.memo(_Option)
Option.displayName = 'Option'

export default Option
