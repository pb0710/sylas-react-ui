import React from 'react'
import { TransitionGroup } from 'react-transition-group'
import _ from 'lodash'
import Window from './Window'

export interface PopupProps extends React.RefAttributes<HTMLElement> {
	visible?: boolean
	scaleOrigin?: string
}

const _Popup: React.ForwardRefRenderFunction<unknown, PopupProps> = (props, ref) => {
	const { visible = false } = props
	const windowProps = _.omit(props, ['visible'])

	return (
		<TransitionGroup component={null}>
			{visible && <Window ref={ref} {...windowProps} />}
		</TransitionGroup>
	)
}

const Popup = React.memo(React.forwardRef<unknown, PopupProps>(_Popup))
Popup.displayName = 'Popup'

export default Popup
