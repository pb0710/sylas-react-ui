import { InternalTabs } from './Tabs'
import { InternalTabPanel } from './TabPanel'

type InternalTabsType = typeof InternalTabs
interface TabsType extends InternalTabsType {
	Panel: typeof InternalTabPanel
}

const Tabs = InternalTabs as TabsType
Tabs.Panel = InternalTabPanel

export default Tabs
