import React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'

export interface ISearchBtnProps {
	enterButton: React.ReactNode | null
	onSearch: () => void
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
			color: '#606266'
		}
	})
)

const _SearchBtn: React.FC<ISearchBtnProps> = props => {
	const { enterButton, onSearch } = props
	const classes = useStyles()

	return (
		<div className={classes.root} onClick={onSearch}>
			{enterButton}
		</div>
	)
}

const SearchBtn = React.memo(_SearchBtn)

export default SearchBtn
