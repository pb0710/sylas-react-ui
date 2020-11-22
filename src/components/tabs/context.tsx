import * as React from 'react'

export type Tabs = Record<string, string>

interface ContextValue {
	updateTabs(tabs: Tabs): void
	removeTabs(key: string): void
}

const defaultValue: ContextValue = { updateTabs() {}, removeTabs() {} }

export const TabContext = React.createContext(defaultValue)
