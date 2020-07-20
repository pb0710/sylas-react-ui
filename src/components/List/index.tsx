import _List, { IListProps } from './List'
import ListItem from './ListItem'

interface IListExports extends React.MemoExoticComponent<React.FC<IListProps>> {
	Item: typeof ListItem
}

const List = _List as IListExports
List.Item = ListItem

export default List
