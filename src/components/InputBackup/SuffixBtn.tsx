import React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import { SearchOutlined } from '@ant-design/icons'

export interface SuffixBtnProps extends React.ButtonHTMLAttributes<HTMLElement> {
	onClick(event: React.MouseEvent<HTMLElement>): void
}

const useStyles = makeStyles(
	createStyles({
		root: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			height: '100%',
			position: 'absolute',
			right: 8,
			top: 0,
			fontSize: 15,
			cursor: 'pointer',
			color: '#909399',
			transition: 'color 250ms',

			'&:hover': {
				color: '#303133'
			}
		}
	})
)

const _SuffixBtn: React.FC<SuffixBtnProps> = props => {
	const { children, onClick } = props
	const classes = useStyles()

	return (
		<div className={classes.root} onClick={onClick}>
			{children || <SearchOutlined />}
		</div>
	)
}

const SuffixBtn = React.memo(_SuffixBtn)

export default SuffixBtn
