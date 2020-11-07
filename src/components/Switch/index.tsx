import InternalSwitch, { SwitchProps } from './Switch'

type SwitchType = React.FC<SwitchProps>

const Switch = InternalSwitch as SwitchType

export default Switch
