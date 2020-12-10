import * as React from 'react'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { InternalListItem } from '../list/ListItem'
import Collapse from '../collapse'
import { MenuContext, SubMenuContext } from './context'
import { InternalList } from '../list/List'
import { useInternalState } from '../../utils/hooks'
import { actionType, SubMenuItem } from './reducer'
import { CaretDownFilled } from '@ant-design/icons'

const styles = createStyles({
  wrapper: {
    borderRadius: 0
  },
  menuItem: {
    borderRadius: 0,
    fontWeight: 500,
    '&:first-child,&:last-child': {
      borderRadius: 0
    }
  },
  actived: {
    color: '#409eff',
    '@media (any-hover: hover)': {
      '&:hover': {
        color: '#409eff'
      }
    }
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: 18,
    display: 'inline-flex',
    alignItems: 'center',
    height: '100%',
    color: '#555',
    fontSize: 12,
    transition: 'transform 250ms'
  },
  rotate: {
    transform: 'rotate(180deg)'
  }
})

interface SubMenuProps extends WithStyles<typeof styles> {
  className?: string
  menuKey: string
  title: React.ReactNode
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { classes, children, className, menuKey: key, title, ...rest } = props

  const { state, dispatch } = React.useContext(MenuContext)
  const { subMenus } = state
  const {
    subRegister: subRegisterFromParent,
    subUnregister: subUnregisterFromParent
  } = React.useContext(SubMenuContext)

  const [opened, setOpened] = useInternalState<boolean>(false)

  const [items, setItems] = React.useState<string[]>([])
  const [subs, setSubs] = React.useState<string[]>([])

  const register = React.useCallback((...keys: string[]): void => {
    setItems((oldItems) => [...oldItems, ...keys])
  }, [])

  const unregister = React.useCallback((...keys: string[]): void => {
    keys.forEach((key) => {
      setItems((oldItems) => oldItems.filter((item) => item !== key))
    })
  }, [])

  const subRegister = React.useCallback((...keys: string[]): void => {
    setSubs((oldSubs) => [...oldSubs, ...keys])
  }, [])

  const subUnregister = React.useCallback((...keys: string[]): void => {
    keys.forEach((key) => {
      setSubs((oldSubs) => oldSubs.filter((sub) => sub !== key))
    })
  }, [])

  // only support single selected.
  const handleSelect = (): void => {
    setOpened((oldOpened) => !oldOpened)
  }

  // recurse to sync sub menu opened.
  const recurseSyncOpened = React.useCallback(
    (subMenu?: SubMenuItem): void => {
      if (!subMenu) return

      const subMenuActived = subMenu.items.some((item) => state.menuStore[item])
      if (subMenuActived) {
        setOpened(true)
      }
      subMenu.subs.forEach((sub) => {
        recurseSyncOpened(state.subMenus[sub])
      })
    },
    [setOpened, state]
  )

  // sub menu also need to sync to menu tree.
  React.useEffect(() => {
    subRegisterFromParent?.(key)
    return () => {
      subUnregisterFromParent?.(key)
    }
  }, [subRegisterFromParent, subUnregisterFromParent, key])

  React.useEffect(() => {
    dispatch({
      type: actionType.UPDATE_SUB_MENU,
      payload: { [key]: { items, subs } }
    })
  }, [dispatch, items, key, subs])

  React.useEffect(() => {
    const subMenu = subMenus[key]
    recurseSyncOpened(subMenu)
  }, [recurseSyncOpened, key, subMenus])

  const menuCls = clsx(classes.menuItem, className)

  const iconCls = clsx(classes.icon, {
    [classes.rotate]: opened
  })

  return (
    <InternalList className={classes.wrapper}>
      <InternalListItem
        {...rest}
        className={menuCls}
        bordered={false}
        hovered
        ripple
        onClick={handleSelect}
      >
        {title}
        <CaretDownFilled className={iconCls} />
      </InternalListItem>
      <SubMenuContext.Provider value={{ register, unregister, subRegister, subUnregister }}>
        <Collapse in={opened}>{children}</Collapse>
      </SubMenuContext.Provider>
    </InternalList>
  )
}

export const InternalSubMenu = React.memo(withStyles(styles, { name: 'SubMenu' })(SubMenu))
InternalSubMenu.displayName = 'SubMenu'
