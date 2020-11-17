import * as React from 'react'
import { createStyles, WithStyles, withStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { TransitionGroup } from 'react-transition-group'
import { TransitionOpts, useTransition } from '../../utils/hooks'

const styles = createStyles({
	explain: {
		color: '#ff4d4f',
		margin: 8,
		transformOrigin: 'left top'
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
			transform: 'scale(.95, .85)'
		},
		to: {
			opacity: 1,
			transform: 'scale(1)'
		}
	},
	'@keyframes kf_leave': {
		from: {
			opacity: 1,
			transform: 'scale(1)'
		},
		to: {
			opacity: 0,
			transform: 'scale(.95, .85)'
		}
	}
})

interface ExplainProps extends WithStyles<typeof styles>, TransitionOpts {}

interface ExplainsProps {
	explains: string[]
}

const Explain: React.FC<ExplainProps> = (props) => {
	const { classes, children, in: inProp, timeout = 250, onExited } = props
	useTransition({ in: inProp, timeout, onExited })
	const explainCls = clsx({
		[classes.explain]: true,
		[classes.enter]: inProp,
		[classes.leave]: !inProp
	})
	return (
		<div className={explainCls} style={{ animationDuration: `${timeout}ms` }}>
			{children}
		</div>
	)
}

const Explains: React.FC<ExplainsProps> = (props) => (
	<TransitionGroup component={null}>
		{props.explains.map((explain) => (
			<InternalExplain key={explain}>{explain}</InternalExplain>
		))}
	</TransitionGroup>
)

export const InternalExplain = withStyles(styles, { name: 'Explain' })(Explain)
export const InternalExplains = Explains

InternalExplain.displayName = 'Explain'
InternalExplains.displayName = 'Explains'
