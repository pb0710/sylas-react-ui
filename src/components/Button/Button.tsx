import * as React from 'react'
import clsx from 'clsx'
import { WithStyles, createStyles, withStyles } from '@material-ui/styles'
import TouchRipple from '../touchRipple'
import { Theme, ColorType } from '../jssBaseline/theme'
import { capitalize } from '../../utils'

const disabledCommon = {
  opacity: 0.5,
  cursor: 'not-allowed',
  '@media (any-hover: hover)': {
    '&:hover': {
      background: '#f4f4f5'
    }
  }
}

const styles = (theme: Theme) =>
  createStyles({
    btn: {
      position: 'relative',
      boxSizing: 'border-box',
      whiteSpace: 'nowrap',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 80,
      height: 36,
      margin: 0,
      border: 0,
      outline: 'none',
      padding: '4px 16px',
      borderRadius: 4,
      fontSize: 14,
      fontWeight: 600,
      transition: 'all 0.2s ease-out',
      cursor: 'pointer',
      '&>span': {
        '&:first-child': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 8
        },
        '&:last-child': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 8
        }
      }
    },
    btnPrimary: {
      boxShadow: '0 1px 3px rgba(26,26,26,.1)',
      background: theme.palette.primary.main,
      color: theme.palette.primary.text,
      '@media (any-hover: hover)': {
        '&:hover': {
          background: theme.palette.primary.dim
        }
      }
    },
    btnLightPrimary: {
      background: '#f4f4f5',
      color: theme.palette.primary.main,
      '@media (any-hover: hover)': {
        '&:hover': {
          background: '#e8e8e8'
        }
      }
    },
    btnSuccess: {
      boxShadow: '0 1px 3px rgba(26,26,26,.1)',
      background: theme.palette.success.main,
      color: theme.palette.success.text,
      '@media (any-hover: hover)': {
        '&:hover': {
          background: theme.palette.success.dim
        }
      }
    },
    btnLightSuccess: {
      background: '#f4f4f5',
      color: theme.palette.success.main,
      '@media (any-hover: hover)': {
        '&:hover': {
          background: '#e8e8e8'
        }
      }
    },
    btnWarning: {
      boxShadow: '0 1px 3px rgba(26,26,26,.1)',
      background: theme.palette.warning.main,
      color: theme.palette.warning.text,
      '@media (any-hover: hover)': {
        '&:hover': {
          background: theme.palette.warning.dim
        }
      }
    },
    btnLightWarning: {
      background: '#f4f4f5',
      color: theme.palette.warning.main,
      '@media (any-hover: hover)': {
        '&:hover': {
          background: '#e8e8e8'
        }
      }
    },
    btnError: {
      boxShadow: '0 1px 3px rgba(26,26,26,.1)',
      background: theme.palette.error.main,
      color: theme.palette.error.text,
      '@media (any-hover: hover)': {
        '&:hover': {
          background: theme.palette.error.dim
        }
      }
    },
    btnLightError: {
      background: '#f4f4f5',
      color: theme.palette.error.main,
      '@media (any-hover: hover)': {
        '&:hover': {
          background: '#e8e8e8'
        }
      }
    },
    disabledLight: disabledCommon,
    disabledPrimary: {
      ...disabledCommon,
      '@media (any-hover: hover)': {
        '&:hover': {
          background: theme.palette.primary.main
        }
      }
    },
    disabledSuccess: {
      ...disabledCommon,
      '@media (any-hover: hover)': {
        '&:hover': {
          background: theme.palette.success.main
        }
      }
    },
    disabledWarning: {
      ...disabledCommon,
      '@media (any-hover: hover)': {
        '&:hover': {
          background: theme.palette.warning.main
        }
      }
    },
    disabledError: {
      ...disabledCommon,
      '@media (any-hover: hover)': {
        '&:hover': {
          background: theme.palette.error.main
        }
      }
    }
  })

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLElement>,
    WithStyles<typeof styles> {
  className?: string
  color?: ColorType
  light?: boolean
  disabled?: boolean
  prefixes?: JSX.Element
  suffixes?: JSX.Element
}

const Button = React.forwardRef<any, ButtonProps>((props, ref) => {
  const {
    classes,
    children,
    className,
    color = 'primary',
    light = false,
    disabled = false,
    prefixes = null,
    suffixes = null,
    onClick,
    ...rest
  } = props

  const [rippleRef, controlProps] = TouchRipple.useRipple(disabled)

  const onCustomClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      if (disabled) return
      onClick?.(event)
    },
    [disabled, onClick]
  )

  // chinese characters add gaps.
  const childrenNode =
    typeof children === 'string' && children.length === 2 && !/[^\u4e00-\u9fa5]/.test(children)
      ? `${children[0]} ${children[1]}`
      : children

  const btnCls = clsx(
    classes.btn,
    classes[`btn${light ? 'Light' : ''}${capitalize(color)}`],
    {
      [classes[`disabled${light ? 'Light' : capitalize(color)}`]]: disabled
    },
    className
  )

  return (
    <button
      type="button"
      ref={ref}
      className={btnCls}
      onClick={onCustomClick}
      {...controlProps}
      {...rest}
    >
      <span>{prefixes}</span>
      <TouchRipple ref={rippleRef} color={light ? undefined : color} />
      {childrenNode}
      <span>{suffixes}</span>
    </button>
  )
})

export const InternalButton = React.memo(withStyles(styles, { name: 'Button' })(Button))
Button.displayName = 'Button'
InternalButton.displayName = 'Button'
