import * as React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import TouchRipple from '../touchRipple'

export interface ListItemProps extends React.LiHTMLAttributes<HTMLElement> {
  className?: string
  bordered?: boolean
  ripple?: boolean
  hovered?: boolean
}

interface StyleProps {
  bordered: boolean
  hovered: boolean
}

const useStyles = makeStyles(
  createStyles({
    listItem: ({ bordered, hovered }: StyleProps) => ({
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      width: '100%',
      minHeight: 40,
      padding: '0 24px',
      margin: 0,
      borderBottom: bordered ? '1px solid #f0f0f0' : 0,
      borderRadius: bordered ? 0 : 4,
      textDecoration: 'none',
      listStyle: 'none',
      color: '#303133',
      transition: 'background .2s ease-out,color .2s ease-out',

      '@media (any-hover: hover)': {
        ...(hovered
          ? {
              '&:hover': {
                color: '#303133',
                background: 'rgba(160, 160, 160, .1)'
              }
            }
          : {})
      },

      '&:first-child': {
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4
      },

      '&:last-child': {
        borderBottom: 0,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4
      }
    })
  })
)

const ListItem: React.FC<ListItemProps> = (props) => {
  const { children, className, bordered = true, ripple = false, hovered = false, ...rest } = props

  const classes = useStyles({
    bordered,
    hovered
  })
  /**
   * if there are many interactions inside of list item, do not set ripple = true.
   * otherwise, it will be covered by ripple.
   */
  const [rippleRef, controlProps] = TouchRipple.useRipple(!ripple)

  const listItemCls = clsx(classes.listItem, className)

  return (
    <li {...rest} className={listItemCls} {...controlProps}>
      {children}
      {ripple && <TouchRipple ref={rippleRef} />}
    </li>
  )
}

export const InternalListItem = React.memo(ListItem)
InternalListItem.displayName = 'ListItem'
