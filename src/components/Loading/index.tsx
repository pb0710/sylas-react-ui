import { InternalBounce } from './Bounce'
import { InternalLine } from './Line'

type InternalLoadingType = typeof InternalBounce
interface LoadingType extends InternalLoadingType {
	Bounce: typeof InternalBounce
	Line: typeof InternalLine
}

const Loading = InternalBounce as LoadingType

Loading.Bounce = InternalBounce
Loading.Line = InternalLine

export default Loading
