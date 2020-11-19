import * as React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import { CaretDownFilled } from '@ant-design/icons'
import List from '../list'
import Collapse from '../collapse'

interface SubMenuProps extends React.HTMLAttributes<HTMLElement> {
	className?: string
	title?: any
	opened?: boolean
}

export interface StyleProps {
	listOpened: boolean
}

const useStyles = makeStyles(
	createStyles({
		subMenu: {
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
			transform: ({ listOpened }: StyleProps) => `rotate(${listOpened ? 180 : 0}deg)`,
			transition: 'transform 300ms ease-out'
		}
	})
)

const _SubMenu: React.FC<SubMenuProps> = (props) => {
	const { children, className, title, opened = false } = props

	const [listOpened, setlistOpened] = React.useState<boolean>(opened)

	const classes = useStyles({ listOpened } as StyleProps)

	const handleSelect = () => {
		setlistOpened((prev) => !prev)
	}

	// props 同步内部 state
	React.useEffect(() => {
		setlistOpened(opened)
	}, [opened])

	return (
		<List className={classes.subMenu}>
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
