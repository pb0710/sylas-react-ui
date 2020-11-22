# sylas-react-ui

> A React UI components libary base on typescript,function component and hooks api

[![NPM](https://img.shields.io/npm/v/sylas-react-ui.svg)](https://www.npmjs.com/package/sylas-react-ui) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> ⚠️ This package is in the early stage，So use in production environment is not for now。

## Install

```bash
npm install --save sylas-react-ui
```

or use yarn

```bash
yarn add sylas-react-ui
```

## Usage

At first, add JSSBaseline to wrap your root App component up.
JSSBaseline is required, it had provided default styles, themes, and jss inject first -- it is necessary for customize className overwirte.

```tsx
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { JSSBaseline } from 'sylas-react-ui'

ReactDOM.render(
	<React.StrictMode>
		<JSSBaseline>
			<App />
		</JSSBaseline>
	</React.StrictMode>,
	document.getElementById('root')
)
```

then, you can import some Components from sylas-react-ui

being used to function component（recommended)

```tsx
import React, { Component } from 'react'

import { MyComponent } from 'sylas-react-ui'

function Example() {
	return <MyComponent />
}
```

or class component

```tsx
import React, { Component } from 'react'

import { MyComponent } from 'sylas-react-ui'

class Example extends Component {
	render() {
		return <MyComponent />
	}
}
```

### components list

- JSSBaseline
- Button
- Button.Icon
- Collapse
- Divider
- Form
- Form.Item
- Input
- Input.Group
- Select
- Select.Option
- Switch
- CheckBox
- CheckBox.Group
- Radio
- Radio.Group
- List
- List.Item
- Loading
- Loading.Bounce
- Loading.Line
- Menu
- Menu.Sub
- Menu.Item
- Paper
- GroundGlass
- Popup
- Progress
- Tag
- TouchRipple

### props api

It will be added later...
Currently recommended to view the source code

### hooks api

- Form.useForm
- TouchRipple.useRipple

## Github repositories and document(Detailed introduction in future)

[https://github.com/pb0710/sylas-react-ui](https://github.com/pb0710/sylas-react-ui)

## License

MIT © [pb0710](https://github.com/pb0710)
