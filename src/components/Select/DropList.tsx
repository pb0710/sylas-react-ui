import * as React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import { useTransition, TransitionOpts } from '../../utils/hooks'
import clsx from 'clsx'

const getHeight = (mutiple: number): number => mutiple * 36

const useStyles = makeStyles(
	createStyles({
		dropList: {
			zIndex: 1,
			position: 'absolute',
			left: 0,
			top: ({ index }: stylesProps) => -getHeight(index) - 8,
			overflowY: 'auto',
			minWidth: 160,
			minHeight: 48,
			// maxHeight: 232, // TODO: consider for max height not for the moment
			padding: '8px 0',
			borderRadius: 4,
			background: '#fff',
			boxShadow: '0 4px 16px rgba(0,0,0,.16)',
			transformOrigin: ({ index }) => `center ${getHeight(index) + 10}px`,
			animationDuration: ({ timeout }) => `${timeout}ms`
		},
		enter: {
			animation: '$kf_enter ease-out'
		},
		leave: {
			animation: '$kf_leave ease-out'
		},
		'@keyframes kf_enter': {
			from: {
				opacity: 0,
				transform: 'scaleY(.9)'
			},
			to: {
				opacity: 1,
				transform: 'scaleY(1)'
			}
		},
		'@keyframes kf_leave': {
			from: {
				opacity: 1,
				transform: 'scaleY(1)'
			},
			to: {
				opacity: 0,
				transform: 'scaleY(.9)'
			}
		}
	})
)

interface DropListProps extends TransitionOpts {
	index?: number
}

interface stylesProps {
	index: number
	timeout: number
}

const DropList: React.FC<DropListProps> = (props) => {
	const { children, index = 0, timeout = 150, in: inProp = false, onExited } = props

	useTransition({ in: inProp, onExited, timeout })
	const indexRef = React.useRef<number>(index) // only set once
	const classes = useStyles({ index: indexRef.current, timeout })

	const dropListCls = clsx(classes.dropList, {
		[classes.enter]: inProp,
		[classes.leave]: !inProp
	})

	return <div className={dropListCls}>{children}</div>
}

export const InternalDropList = DropList
InternalDropList.displayName = 'DropList'
