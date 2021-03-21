import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import clsx from 'clsx'
import * as React from 'react'
import { TabContext } from './context'

const styles = createStyles({
  tabPanel: {
    width: '100%',
    margin: 0,
    padding: 0,
    listStyle: 'none'
  }
})

interface TabPanelProps extends WithStyles<typeof styles>, React.HTMLAttributes<HTMLLIElement> {
  className?: string
  title: string
  tabKey: string
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { classes, children, tabKey, title, className, ...rest } = props
  const { selected, updateTabs, removeTabs } = React.useContext(TabContext)

  React.useEffect(() => {
    updateTabs({ [tabKey]: title })
    return () => {
      removeTabs(tabKey)
    }
  }, [tabKey, title, updateTabs, removeTabs])

  const tabPanelCls = clsx(classes.tabPanel, className)
  return (
    <li {...rest} className={tabPanelCls}>
      {selected === tabKey ? children : null}
    </li>
  )
}

export const InternalTabPanel = React.memo(withStyles(styles, { name: 'TabPanel' })(TabPanel))
InternalTabPanel.displayName = 'TabPanel'
