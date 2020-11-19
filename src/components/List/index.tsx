import { InternalList } from './List'
import { InternalListItem } from './ListItem'

type InternalListType = typeof InternalList
interface ListType extends InternalListType {
	Item: typeof InternalListItem
}

const List = InternalList as ListType
List.Item = InternalListItem

export default List
