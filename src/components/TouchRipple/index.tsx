import { InternalTouchRipple } from './TouchRipple'
import { useRipple } from './hooks'

type InternalTouchRippleType = typeof InternalTouchRipple
interface TouchRippleType extends InternalTouchRippleType {
	useRipple: typeof useRipple
}

const TouchRipple = InternalTouchRipple as TouchRippleType
TouchRipple.useRipple = useRipple

export default TouchRipple
