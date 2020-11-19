import * as React from 'react'
import { TransitionGroup } from 'react-transition-group'
import { InternalWindow, ScaleOrigin } from './Window'

export interface PopupProps extends React.HTMLAttributes<HTMLElement> {
	visible?: boolean
	scaleOrigin?: ScaleOrigin
}

const Popup: React.ForwardRefRenderFunction<unknown, PopupProps> = (props, ref) => {
	const { visible = false, scaleOrigin = 'center', onClick, ...rest } = props
	const onCustomClick = (event: React.MouseEvent<HTMLDivElement>): void => {
		event.preventDefault()
		event.stopPropagation()
		onClick?.(event)
	}
	return (
		<TransitionGroup component={null}>
			{visible && (
				<InternalWindow ref={ref} {...{ scaleOrigin, onClick: onCustomClick, ...rest }} />
			)}
		</TransitionGroup>
	)
}

export const InternalPopup = React.memo(React.forwardRef<unknown, PopupProps>(Popup))
InternalPopup.displayName = 'Popup'
