import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import clsx from 'clsx'
import * as React from 'react'
import { capitalize } from '../../utils'
import { useBoolean, useInternalState } from '../../utils/hooks'
import { Theme, ColorType } from '../jssBaseline/theme'

const activedAfterCommon = {
  content: '" "',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: 'table',
  width: 'calc(100% - 6px)',
  height: 'calc(100% - 6px)',
  borderRadius: '50%',
  margin: 3
}

const styles = (theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'inline-flex',
      alignItems: 'center',
      marginRight: 8,
      fontWeight: 500,
      userSelect: 'none',
      '&>span:last-child': {
        padding: '0 8px',
        fontSize: 14,
        color: '#777'
      }
    },
    radio: {
      position: 'relative',
      display: 'inline-flex',
      width: 18,
      height: 18,
      border: '2px solid #e8e8e8',
      borderRadius: '50%',
      background: '#fff',
      transition: 'border-color .2s, background-color .2s',
      '@media (any-hover: hover)': {
        '&:hover': {
          background: '#e8e8e8'
        }
      },
      '&>input': {
        zIndex: 1,
        opacity: 0,
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
        cursor: 'pointer'
      }
    },
    focus: {
      borderColor: '#333'
    },
    activedPrimary: {
      '@media (any-hover: hover)': {
        '&:hover': {
          background: '#fff'
        }
      },
      '&:after': {
        ...activedAfterCommon,
        background: theme.palette.primary.main
      }
    },
    activedSuccess: {
      '@media (any-hover: hover)': {
        '&:hover': {
          background: '#fff'
        }
      },
      '&:after': {
        ...activedAfterCommon,
        background: theme.palette.success.main
      }
    },
    activedWarning: {
      '@media (any-hover: hover)': {
        '&:hover': {
          background: '#fff'
        }
      },
      '&:after': {
        ...activedAfterCommon,
        background: theme.palette.warning.main
      }
    },
    activedError: {
      '@media (any-hover: hover)': {
        '&:hover': {
          background: '#fff'
        }
      },
      '&:after': {
        ...activedAfterCommon,
        background: theme.palette.error.main
      }
    }
  })

interface RadioProps extends WithStyles<typeof styles>, React.HTMLAttributes<HTMLElement> {
  className?: string
  value: string
  color?: ColorType
  chosen?: string
  onCustomChange?(value: string): void
}

const Radio: React.FC<RadioProps> = (props) => {
  const {
    classes,
    children,
    className,
    color = 'primary',
    chosen,
    value,
    onCustomChange,
    ...rest
  } = props

  const [checked, setChecked] = useInternalState<boolean>(false)
  const [focus, { setTrue: handleFocus, setFalse: handleBlur }] = useBoolean(false)

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLInputElement>): void => {
      event.preventDefault()
      if (chosen !== value) {
        onCustomChange?.(value)
        setChecked((oldChecked) => !oldChecked)
      }
    },
    [chosen, value, onCustomChange, setChecked]
  )

  React.useEffect(() => {
    setChecked(chosen === value)
  }, [chosen, setChecked, value])

  const radioCls = clsx(
    classes.radio,
    {
      [classes.focus]: focus,
      [classes[`actived${capitalize(color)}`]]: checked
    },
    className
  )

  return (
    <label {...rest} className={classes.wrapper} onFocus={handleFocus} onBlur={handleBlur}>
      <span className={radioCls}>
        <input type="radio" onClick={handleClick} />
      </span>
      {children && <span>{children}</span>}
    </label>
  )
}

export const InternalRadio = React.memo(withStyles(styles, { name: 'Radio' })(Radio))
InternalRadio.displayName = 'Radio'
