import React from 'react'
import { TransitionGroup } from 'react-transition-group'
import _ from 'lodash'
import Window, { Direction } from './Window'

export interface IPopupProps extends React.RefAttributes<HTMLElement> {
	visible?: boolean
	direction?: Direction
}

const _Popup: React.ForwardRefRenderFunction<unknown, IPopupProps> = (props, ref) => {
	const { visible = false } = props
	const windowProps = _.omit(props, ['visible'])

	return (
		<TransitionGroup component={null}>
			{visible && <Window ref={ref} {...windowProps} />}
		</TransitionGroup>
	)
}

const Popup = React.memo(React.forwardRef<unknown, IPopupProps>(_Popup))
Popup.displayName = 'Popup'

export default Popup
