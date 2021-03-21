import * as React from 'react'

export type Tabs = Record<string, string>

interface ContextValue {
  selected: string
  updateTabs(tabs: Tabs): void
  removeTabs(key: string): void
}

const defaultValue: ContextValue = { selected: '', updateTabs() {}, removeTabs() {} }

export const TabContext = React.createContext(defaultValue)
