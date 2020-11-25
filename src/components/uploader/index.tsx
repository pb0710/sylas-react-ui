import { InternalUploader } from './Uploader'

type InternalUploaderType = typeof InternalUploader
interface UploaderType extends InternalUploaderType {
	Group: any
}

const Uploader = InternalUploader as UploaderType
Uploader.Group = 'Group'

export default Uploader
