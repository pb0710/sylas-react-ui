import React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import {
	UserOutlined,
	HomeOutlined,
	ReadOutlined,
	SettingOutlined,
	CompassOutlined,
	Html5Outlined,
	MobileOutlined,
	CloudServerOutlined,
	CodeOutlined,
	ToolOutlined
} from '@ant-design/icons'
import {
	Button,
	List,
	Input,
	Divider,
	Loading,
	Collapse,
	Progress,
	Popup,
	Switch,
	Tag,
	Select,
	Form,
	Menu
} from 'sylas-react-ui'
import { Link, NavLink } from 'react-router-dom'
export enum ScaleOrigin {
	CENTER = 'center',
	TOP = 'top',
	RIGHT = 'right',
	BOTTOM = 'bottom',
	LEFT = 'left',
	LEFT_TOP = 'left-top',
	LEFT_BOTTOM = 'left-bottom',
	RIGHT_TOP = 'right-top',
	RIGHT_BOTTOM = 'right-bottom',
	BOTTOM_LEFT = 'bottom-left',
	BOTTOM_RIGHT = 'bottom-right',
	TOP_LEFT = 'top-left',
	TOP_RIGHT = 'top-right'
}

interface IAppProps {}

const useStyles = makeStyles(
	createStyles({
		app: {
			display: 'flex',
			justifyContent: 'center',
			// alignItems: 'center',
			width: '100vw',
			height: '100vh'
		},
		menu: {
			width: 240,
			// padding: 8,
			borderRight: '1px solid #f1f1f1'
		},
		form: {
			maxWidth: 400
		},
		select: {
			minWidth: 100
		},
		menu1: {
			fontWeight: 'bolder'
		},
		menu2: {
			paddingLeft: 48
		},
		menu3: {
			paddingLeft: 72
		}
	})
)

const navMap = [
	{
		id: 0,
		name: '主页',
		path: '/'
		// icon: <HomeOutlined />
		// component: <HomePage />,
	},
	{
		id: 1,
		name: '文章分类',
		path: '/article',
		// icon: <ReadOutlined />,
		// component: null,
		childs: [
			{
				id: 0,
				name: '全部',
				path: '/all',
				icon: <ReadOutlined />
				// component: <ArticleListPage />
			},
			{
				id: 1,
				name: '前端',
				path: '/frontend',
				icon: <Html5Outlined />
				// component: <ArticleListPage sort="frontend" />
			},
			{
				id: 2,
				name: '移动端',
				path: '/mobile',
				icon: <MobileOutlined />
				// component: <ArticleListPage sort="mobile" />
			},
			{
				id: 3,
				name: '后端',
				path: '/backend',
				icon: <CloudServerOutlined />
				// component: <ArticleListPage sort="backend" />
			},
			{
				id: 4,
				name: '计算机通用',
				path: '/computer_science',
				icon: <CodeOutlined />
				// component: <ArticleListPage sort="computer_science" />
			},
			{
				id: 5,
				name: '工程化',
				path: '/engineering',
				icon: <ToolOutlined />
				// component: <ArticleListPage sort="engineering" />
			}
		]
	},
	{
		id: 2,
		name: '文档聚合',
		path: '/document'
		// icon: <CompassOutlined />
		// component: <ArticlePage />,
	},
	{
		id: 3,
		name: '设置',
		path: '/setting'
		// icon: <SettingOutlined />
		// component: <SettingPage />,
	}
]

const delay = timeout =>
	new Promise((res, rej) => {
		setTimeout(() => {
			res(timeout)
		}, timeout)
	})

const App: React.FC<IAppProps> = () => {
	const classes = useStyles()

	const form = Form.useForm()

	const {
		triggerRef,
		popupRef,
		visible,
		handleShowPopup,
		handleHidePopup
	} = Popup.usePopupVisible()

	// const [visible, setVisible] = React.useState<boolean>(false)

	const handleConsole = () => {
		console.log('Hello')
	}
	const handleEnter = () => {
		console.log('World')
	}
	const hanldeSearch = value => {
		console.log('value', value)
	}

	const handleFormChange = values => {
		console.log('values: ', values)
	}

	const handleClick = async () => {
		console.log('handleClick')
		// form.submit().then(res => {
		// 	console.log('res: ', res);
		// }, err => {
		// 	console.log('err: ', err);
		// })
		// try {
		// 	const res = await form.submit()
		// 	console.log('res: ', res)
		// } catch (err) {
		// 	console.error('err: ', err);
		// }
	}

	// const [precent, setPercent] = React.useState(0)
	// React.useEffect(() => {
	// 	setInterval(() => {
	// 		const percent = Math.random() * 100
	// 		setPercent(percent)
	// 	}, 1000)
	// }, [])

	// const handleToggleCollapse = () => {
	// 	setVisible(prev => !prev)
	// }

	const handleFinished = values => {
		console.log('handleFinished: ', values)
	}

	const handleFailed = () => {
		console.log('handleFailed: ')
	}

	const validateRequred = async (value, callback) => {
		// console.log('validate: ', value)
		if (!value) {
			// await delay(2000)
			callback('必填！')
		} else {
			callback()
		}
	}

	const validateLength = async (value, callback) => {
		// console.log('validate: ', value)
		if (value.length < 5) {
			callback('必填！')
		} else {
			callback()
		}
	}

	const handleValidate = async () => {
		try {
			const res = await form.validateFields('password', 'input')
			console.log('res: ', res)
		} catch (error) {
			console.log('error: ', error)
		}
	}

	React.useEffect(() => {
		setTimeout(() => {
			// 	console.log('excute timeout')
			// 	// form.setFieldsValue({ input: '', password: 'password', select: 'female', switch: true })
			// 	form.validateFields('password')
			// form.setFieldsValue({ input: '', password: '' })
		}, 4000)
		// form.validateFields('password')
	}, [])

	return (
		<div className={classes.app}>
			{/* <Button color="primary" onClick={handleConsole} onMouseEnter={handleEnter}>
				测试按钮
			</Button>
			<Button.Icon>
				<UserOutlined />
			</Button.Icon>
			<List bordered>
				<List.Item>sdfdsff</List.Item>
				<List.Item>sdfdsff</List.Item>
				<List.Item>sdfdsff</List.Item>
				<List.Item>sdfdsff</List.Item>
			</List>
			<Input placeholder="Basic" /> */}
			{/* <Input.Search placeholder="Search..." onSearch={hanldeSearch} />
			<Input.TextArea placeholder="Search..." onPressEnter={hanldeSearch} /> */}

			{/* <Input.Group>
				<Input.Search />
				<Input />
				<Input.TextArea />
			</Input.Group> */}

			{/* <Divider /> */}
			{/* <Divider>分割线</Divider> */}

			{/* <Loading.Line />
			<Loading.Bounce color="error" /> */}

			{/* <Tag>时代发生地方</Tag> */}
			{/* <Switch
				onChange={checked => {
					console.log('11', checked)
				}}
			/> */}

			<Button.Icon onClick={handleShowPopup}>
				<UserOutlined />
			</Button.Icon>
			<Popup ref={popupRef} visible={visible} scaleOrigin="right-top">
				test
				<Button ref={triggerRef} onClick={handleHidePopup}>
					按钮
				</Button>
			</Popup>

			{/* <Progress percent={precent} color="error" fixedTop /> */}

			{/* <Button onClick={handleToggleCollapse}>切换</Button>
			<Collapse visible={visible}>
				<List bordered>
					<List.Item>sdfdsff</List.Item>
					<List.Item>sdfdsff</List.Item>
					<List.Item>sdfdsff</List.Item>
					<List.Item>sdfdsff</List.Item>
				</List>
			</Collapse> */}
			{/* <div className={classes.menu}>
				<NavMenu menuOptions={navMap} color="primary" onSelect={hanldeSearch} />
			</div> */}

			{/* <Select defaultValue="warning" onChange={hanldeSearch}>
				<Select.Option value="primary">湛蓝</Select.Option>
				<Select.Option value="success">碧绿</Select.Option>
				<Select.Option value="error">粉红</Select.Option>
				<Select.Option value="warning">橙黄</Select.Option>
			</Select> */}

			{/* <Form
				className={classes.form}
				form={form}
				initialValues={{ input: 'Test form set value' }}
				onValuesChange={handleFormChange}
				onFinished={handleFinished}
				onFailed={handleFailed}
			>
				<Form.Item name="input" label="用户名" validator={validateRequred}>
					<Input />
				</Form.Item>
				<Form.Item name="password" label="密码" initialValue="" validator={validateRequred}>
					<Input />
				</Form.Item>
				<Form.Item name="switch" label="护眼模式" initialValue={true}>
					<Switch />
				</Form.Item>
				<Form.Item name="select" label="性别" initialValue="male">
					<Select defaultValue="all" className={classes.select}>
						<Select.Option value="all">全部</Select.Option>
						<Select.Option value="male">男</Select.Option>
						<Select.Option value="female">女</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item>
					<div>
						<Button htmlType="submit" color="primary" onClick={handleClick}>
							提交
						</Button>
					</div>
				</Form.Item>
			</Form> */}

			<Menu color="success" onSelected={console.log}>
				<Link to="/">
					<Menu.Item className={classes.menu1} id="0">
						导航0
					</Menu.Item>
				</Link>
				<Menu.Item className={classes.menu1} id="1">
					导航1
				</Menu.Item>
				<Menu.SubMenu className={classes.menu1} title="子菜单1">
					<Link to="/">
						<Menu.Item className={classes.menu2} id="2">
							导航2
						</Menu.Item>
					</Link>
					<Menu.Item className={classes.menu2} id="3">
						导航3
					</Menu.Item>
					<Menu.Item className={classes.menu2} id="4">
						导航4
					</Menu.Item>
					<Menu.SubMenu className={classes.menu2} title="子菜单2">
						<Menu.Item className={classes.menu3} id="5">
							导航5
						</Menu.Item>
						<Menu.Item className={classes.menu3} id="6">
							导航6
						</Menu.Item>
						<Menu.Item className={classes.menu3} id="7">
							导航7
						</Menu.Item>
					</Menu.SubMenu>
				</Menu.SubMenu>
				<Menu.Item className={classes.menu1} id="8">
					导航8
				</Menu.Item>
				<Menu.Item className={classes.menu1} id="9">
					导航9
				</Menu.Item>
				<Menu.Item className={classes.menu1} id="10">
					导航10
				</Menu.Item>
			</Menu>
			<List bordered>
				<List.Item hovered ripple>
					sdfdsff
				</List.Item>
				<List.Item hovered ripple>
					sdfdsff
				</List.Item>
				<List.Item hovered ripple>
					sdfdsff
				</List.Item>
				<List.Item hovered ripple>
					sdfdsff
				</List.Item>
			</List>

			{/* <Input.Search placeholder="123123" />
			<Input.Password placeholder="66666" />
			<Input.TextArea /> */}

			{/* <Tag bordered closeable onClose={() => console.log(123)}>
				标签测试
			</Tag> */}
		</div>
	)
}

export default App
