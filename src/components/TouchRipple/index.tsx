import _TouchRipple, { TouchRippleProps } from './TouchRipple'
import { useRipple } from './hooks'

interface TouchRippleExports
	extends React.MemoExoticComponent<
		React.ForwardRefExoticComponent<TouchRippleProps & React.RefAttributes<HTMLElement>>
	> {
	useRipple: typeof useRipple
}

const TouchRipple = _TouchRipple as TouchRippleExports
TouchRipple.useRipple = useRipple

export default TouchRipple
