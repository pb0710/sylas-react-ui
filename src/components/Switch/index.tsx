import { InternalSwitch, SwitchProps } from './Switch'

type SwitchType = React.FC<Omit<SwitchProps, 'classes'>>

const Switch = InternalSwitch as SwitchType

export default Switch
