import * as React from 'react'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import clsx from 'clsx'
import Button from '../button'
import { UploadOutlined } from '@ant-design/icons'
import { useInternalState } from '../../utils/hooks'
import { readFile } from '../../utils'

const styles = createStyles({
	uploader: {
		display: 'inline-block',
		'&>input': {
			display: 'none'
		}
	}
})

type FilesResult = FormData | (string | ArrayBuffer | null)[]

interface InternalUploaderProps
	extends WithStyles<typeof styles>,
		React.HTMLAttributes<HTMLDivElement> {
	className?: string
	value?: string | string[]
	onValueChange?(value: string | string[]): void
	multiple?: boolean
	format?: 'formdata' | 'base64'
	action?(data: FilesResult): Promise<string | string[] | void>
	customParse?(files: FileList): any
}

const Uploader: React.FC<InternalUploaderProps> = (props) => {
	const {
		classes,
		children = (
			<Button.Icon>
				<UploadOutlined />
			</Button.Icon>
		),
		className,
		value = '',
		onValueChange,
		action,
		format = 'formdata',
		multiple = true,
		customParse,
		...rest
	} = props

	const inputRef: React.RefObject<HTMLInputElement> = React.useRef(null)
	const [data, setData] = useInternalState<string | string[]>(value)

	const handleClick = (): void => {
		inputRef?.current?.click?.()
	}

	const parseFiles = React.useCallback(
		async (files: FileList): Promise<FilesResult | void> => {
			if (format === 'base64') {
				const fileList: ReturnType<typeof readFile>[] = Array.prototype.map.call(files, readFile)
				try {
					return await Promise.all(fileList)
				} catch (error) {
					throw error
				}
			} else if (format === 'formdata') {
				const formData = new FormData()
				Array.prototype.forEach.call(files, (file: File) => {
					formData.append('image', file)
				})
				return formData
			}
		},
		[format]
	)

	const handleChangeFile = React.useCallback(
		async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
			if (!event.target) return
			const { files } = event.target
			if (!files) return

			let result: FilesResult
			try {
				const fileResult = customParse ? await customParse(files) : await parseFiles(files)
				if (!fileResult) return
				result = fileResult

				const value = await action?.(result)
				if (value) {
					setData(value)
					onValueChange?.(value)
				}
			} catch (error) {
				console.error('parse files error', error)
			}
		},
		[action, customParse, onValueChange, parseFiles, setData]
	)

	const childProps = {
		onClick: handleClick
	}

	const uploaderCls = clsx(classes.uploader, className)
	return (
		<div className={uploaderCls} {...rest}>
			{React.isValidElement(children) ? React.cloneElement(children, childProps) : children}
			<input
				ref={inputRef}
				type="file"
				multiple={multiple}
				accept="image/*"
				onChange={handleChangeFile}
			/>
		</div>
	)
}

export const InternalUploader = React.memo(withStyles(styles, { name: 'Uploader' })(Uploader))
InternalUploader.displayName = 'InternalUploader'
