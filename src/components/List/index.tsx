import _List, { ListProps } from './List'
import ListItem from './ListItem'

interface ListExports extends React.MemoExoticComponent<React.FC<ListProps>> {
	Item: typeof ListItem
}

const List = _List as ListExports
List.Item = ListItem

export default List
