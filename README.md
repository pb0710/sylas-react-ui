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

```tsx
import React, { Component } from 'react'

import { MyComponent } from 'sylas-react-ui'

class Example extends Component {
	render() {
		return <MyComponent />
	}
}
```

or use function component（recommended)

```tsx
import React, { Component } from 'react'

import { MyComponent } from 'sylas-react-ui'

function Example() {
	return <MyComponent />
}
```

### components list

- Button
- Button.Icon
- Collapse
- Divider
- Form
- Form.Item
- GroundGlass
- Input
- Input.Group
- Input.Search
- List
- List.Item
- Loading.Bounce
- Loading.Line
- Menu
- Menu.Item
- Paper
- Popup
- Progress
- Select
- Select.Option
- Switch
- Tag
- TouchRipple

### hooks api

- Form.useForm
- TouchRipple.useRipple
- Popup.usePopupVisible

## Github repositories and document(Detailed introduction in future)

[https://github.com/pb0710/sylas-react-ui](https://github.com/pb0710/sylas-react-ui)

## License

MIT © [pb0710](https://github.com/pb0710)
