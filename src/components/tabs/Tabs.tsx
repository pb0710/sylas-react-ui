import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import clsx from 'clsx'
import * as React from 'react'
import { capitalize } from '../../utils'
import { useInternalState } from '../../utils/hooks'
import { ColorType, Theme } from '../jssBaseline/theme'
import { TabContext, Tabs } from './context'

const styles = (theme: Theme) =>
  createStyles({
    tabs: {},
    bordered: {
      border: '1px solid #dadce0',
      borderRadius: 4
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: 48,
      padding: '0 8px',
      margin: 0,
      borderBottom: '1px solid #f0f0f0'
    },
    tabTitle: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 40,
      height: 28,
      padding: '0 8px',
      margin: 0,
      borderRadius: 14,
      background: 'transparent',
      fontSize: 14,
      fontWeight: 500,
      color: '#333',
      cursor: 'pointer',
      transition: 'all .25s ease-out'
    },
    tabTitlePrimary: {
      '@media (any-hover: hover)': {
        '&:hover': {
          color: theme.palette.primary.main
        }
      }
    },
    tabTitleSuccess: {
      '@media (any-hover: hover)': {
        '&:hover': {
          color: theme.palette.success.main
        }
      }
    },
    tabTitleWarning: {
      '@media (any-hover: hover)': {
        '&:hover': {
          color: theme.palette.warning.main
        }
      }
    },
    tabTitleError: {
      '@media (any-hover: hover)': {
        '&:hover': {
          color: theme.palette.error.main
        }
      }
    },
    activedPrimary: {
      padding: '0 16px',
      margin: '0 8px',
      background: theme.palette.primary.main,
      color: theme.palette.primary.text,
      '@media (any-hover: hover)': {
        '&:hover': {
          color: theme.palette.primary.text
        }
      }
    },
    activedSuccess: {
      padding: '0 16px',
      margin: '0 8px',
      background: theme.palette.success.main,
      color: theme.palette.success.text,
      '@media (any-hover: hover)': {
        '&:hover': {
          color: theme.palette.success.text
        }
      }
    },
    activedWarning: {
      padding: '0 16px',
      margin: '0 8px',
      background: theme.palette.warning.main,
      color: theme.palette.warning.text,
      '@media (any-hover: hover)': {
        '&:hover': {
          color: theme.palette.warning.text
        }
      }
    },
    activedError: {
      padding: '0 16px',
      margin: '0 8px',
      background: theme.palette.error.main,
      color: theme.palette.error.text,
      '@media (any-hover: hover)': {
        '&:hover': {
          color: theme.palette.error.text
        }
      }
    },
    content: {
      overflow: 'hidden',
      width: '100%'
    },
    inner: {
      display: 'flex',
      padding: 0,
      margin: 0,
      transition: 'transform .25s ease-out'
    }
  })

interface TabsProps extends WithStyles<typeof styles>, React.HTMLAttributes<HTMLDivElement> {
  className?: string
  color?: ColorType
  activeKey?: string
  bordered?: boolean
}

const Tabs: React.FC<TabsProps> = (props) => {
  const {
    classes,
    children,
    className,
    color = 'primary',
    bordered = true,
    activeKey = '',
    ...rest
  } = props

  const [selected, setSelected] = useInternalState<string>(activeKey)
  const [tabs, setTabs] = React.useState<Tabs>({})
  const tabsCount: number = Object.keys(tabs).length
  const currentIndex: number =
    Object.keys(tabs)
      .map((key, index) => ({ key, index }))
      .filter(({ key }) => key === selected)?.[0]?.index || 0

  const updateTabs = React.useCallback((newTabs: Tabs): void => {
    setTabs((oldTabs) => ({ ...oldTabs, ...newTabs }))
  }, [])

  const removeTabs = React.useCallback((key: string): void => {
    setTabs((oldTabs) => {
      delete oldTabs[key]
      return oldTabs
    })
  }, [])

  const tabsCls = clsx(
    classes.tabs,
    {
      [classes.bordered]: bordered
    },
    className
  )

  return (
    <div className={tabsCls} {...rest}>
      <ul className={classes.header}>
        {Object.keys(tabs).map((key) => (
          <li
            key={key}
            className={clsx(classes.tabTitle, classes[`tabTitle${capitalize(color)}`], {
              [classes[`actived${capitalize(color)}`]]: key === selected
            })}
            onClick={() => setSelected(key)}
          >
            {tabs[key]}
          </li>
        ))}
      </ul>
      <div className={classes.content}>
        <ul
          className={classes.inner}
          style={{
            width: `${tabsCount * 100}%`,
            transform: `translateX(-${(100 / tabsCount) * currentIndex}%)`
          }}
        >
          <TabContext.Provider value={{ selected, updateTabs, removeTabs }}>
            {children}
          </TabContext.Provider>
        </ul>
      </div>
    </div>
  )
}

export const InternalTabs = React.memo(withStyles(styles, { name: 'Tabs' })(Tabs))
InternalTabs.displayName = 'Tabs'
