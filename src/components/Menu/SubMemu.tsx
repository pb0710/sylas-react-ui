import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import { CaretDownFilled } from '@ant-design/icons'
import List from '../List'
import Collapse from '../Collapse'

interface ISubMenuProps extends React.HTMLAttributes<HTMLElement> {
	className?: string
	title?: any
	opened?: boolean
}

export interface IStyleProps {
	listOpened: boolean
}

const useStyles = makeStyles(
	createStyles({
		root: {
			width: '100%'
		},
		openIcon: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'flex-end',
			height: '100%',
			fontSize: 10,
			position: 'absolute',
			top: 0,
			right: 20,
			transform: ({ listOpened }: IStyleProps) => `rotate(${listOpened ? 180 : 0}deg)`,
			transition: 'transform 300ms ease-out'
		}
	})
)

const _SubMenu: React.FC<ISubMenuProps> = props => {
	const { children, className, title, opened = false } = props

	const [listOpened, setlistOpened] = React.useState<boolean>(opened)

	const classes = useStyles({ listOpened } as IStyleProps)

	const handleSelect = () => {
		setlistOpened(prev => !prev)
	}

	// props 同步内部 state
	React.useEffect(() => {
		setlistOpened(opened)
	}, [opened])

	return (
		<List className={classes.root}>
			<List.Item className={className} ripple hovered bordered={false} onClick={handleSelect}>
				{title}
				<div className={classes.openIcon}>
					<CaretDownFilled />
				</div>
			</List.Item>
			<Collapse in={listOpened}>{children}</Collapse>
		</List>
	)
}

const SubMenu = React.memo(_SubMenu)
SubMenu.displayName = 'SubMenu'

export default SubMenu
