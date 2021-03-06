import * as React from 'react'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { omit } from 'lodash-es'
import { Theme, ColorType } from '../jssBaseline/theme'
import { capitalize } from '../../utils'

const styles = (theme: Theme) =>
  createStyles({
    option: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 16px',
      width: '100%',
      height: 36,
      fontSize: 14,
      fontWeight: 500,
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      transition: 'background-color .2s',
      '@media (any-hover: hover)': {
        '&:hover': {
          background: '#eee'
        }
      }
    },
    currentPrimary: {
      background: theme.palette.primary.ripple,
      '@media (any-hover: hover)': {
        '&:hover': {
          background: theme.palette.primary.ripple
        }
      }
    },
    currentSuccess: {
      background: theme.palette.success.ripple,
      '@media (any-hover: hover)': {
        '&:hover': {
          background: theme.palette.success.ripple
        }
      }
    },
    currentWarning: {
      background: theme.palette.warning.ripple,
      '@media (any-hover: hover)': {
        '&:hover': {
          background: theme.palette.warning.ripple
        }
      }
    },
    currentError: {
      background: theme.palette.error.ripple,
      '@media (any-hover: hover)': {
        '&:hover': {
          background: theme.palette.error.ripple
        }
      }
    }
  })

export interface Chosen {
  value: string
  description: React.ReactNode
}

interface OptionProps extends React.HTMLAttributes<HTMLDivElement>, WithStyles<typeof styles> {
  className?: string
  color?: ColorType
  value: string
  chosen?: Chosen
  onChoose?(chosen: Chosen): void
}

const Option: React.FC<OptionProps> = (props) => {
  const {
    classes,
    children,
    className,
    color = 'primary',
    value,
    chosen,
    onChoose,
    ...rest
  } = props

  const handleSelect = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>): void => {
      event.preventDefault()
      onChoose?.({
        value,
        description: children
      })
    },
    [children, onChoose, value]
  )

  const restProps = omit(rest, ['value', 'onClick'])

  const optionCls = clsx(
    classes.option,
    {
      [classes[`current${capitalize(color)}`]]: value === chosen?.value
    },
    className
  )

  return (
    <div className={optionCls} onClick={handleSelect} {...restProps}>
      {children}
    </div>
  )
}

export const InternalOption = withStyles(styles, { name: 'Option' })(Option)
InternalOption.displayName = 'Option'
