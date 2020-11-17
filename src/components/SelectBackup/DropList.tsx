import * as React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import Paper from '../Paper'
import { SelectOption } from './Select'
import { useTransition, TransitionOpts } from '../../utils/hooks'

export interface DropListProps extends TransitionOpts {
	children: React.ReactNode
	selected?: SelectOption
	handleChange(option: SelectOption): void
}

interface StyleProps {
	timeout: number
	childCount: number
}

const useStyles = makeStyles(
	createStyles({
		root: ({ timeout, childCount }: StyleProps) => ({
			zIndex: 999,
			minWidth: '100%',
			maxHeight: 160,
			position: 'absolute',
			top: 36,
			left: 0,
			right: 0,
			fontSize: 14,
			color: '#303133',
			paddingTop: 4,
			paddingBottom: 4,
			borderRadius: 4,
			boxShadow: '0 4px 24px rgba(26,26,26,.14)',
			transformOrigin: 'center 0',
			cursor: 'pointer',
			// 为何不直接 auto？因为 hidden 时右边距多了1px的 bug
			overflowY: childCount >= 5 ? 'auto' : 'unset',
			animationDuration: `${timeout}ms`
		}),
		enter: {
			animation: '$kf_enter ease-out'
		},
		leave: {
			animation: '$kf_leave ease-out'
		},
		'@keyframes kf_enter': {
			'0%': {
				opacity: 0,
				transform: 'scaleY(.9)'
			},
			'100%': {
				opacity: 1,
				transform: 'scaleY(1)'
			}
		},
		'@keyframes kf_leave': {
			'0%': {
				opacity: 1,
				transform: 'scaleY(1)'
			},
			'100%': {
				opacity: 0,
				transform: 'scaleY(.9)'
			}
		}
	})
)

const _DropList: React.FC<DropListProps> = (props) => {
	const {
		children,
		timeout = 150,
		in: inProp = false,
		onExited = () => {},
		selected,
		handleChange
	} = props

	useTransition({ in: inProp, onExited, timeout })

	const childCount = React.Children.count(children)

	const styleProps: StyleProps = { timeout, childCount }
	const classes = useStyles(styleProps)

	const dropListCls = clsx(classes.root, inProp ? classes.enter : classes.leave)

	return (
		<Paper className={dropListCls}>
			{React.Children.map(children as any, (child: JSX.Element) => {
				const isCurrent = child.props.value === selected?.value
				return React.cloneElement(child, { handleChange, isCurrent })
			})}
		</Paper>
	)
}

const DropList = React.memo(_DropList)
DropList.displayName = 'SelectDropList'

export default DropList
