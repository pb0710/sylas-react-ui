# sylas-react-ui

> A Light React UI components libary use typescript,function component and hooks api.

[![NPM](https://img.shields.io/npm/v/sylas-react-ui.svg)](https://www.npmjs.com/package/sylas-react-ui) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> ⚠️ This package is mainly for personal use. and it is in the early stage，So use in production environment is not for now。

## Install

```shell
# npm
npm install --save sylas-react-ui
# or use yarn
yarn add sylas-react-ui
```

## Example

**See: [https://pb0710.github.io/sylas-react-ui/](https://pb0710.github.io/sylas-react-ui/)**

## Usage

Make sure that you have at least version 16.8 of react and react-dom installed, or otherwise hooks won't work for you.

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

being used to function component（React > v16.8)

```tsx
import React, { Component } from 'react'

import { Button } from 'sylas-react-ui'

function Example() {
  return <Button>Click here</Button>
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
- Tabs
- Tabs.Panel
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
- Popup.usePopup
- TouchRipple.useRipple

## Github repositories and document

[https://github.com/pb0710/sylas-react-ui](https://github.com/pb0710/sylas-react-ui)
[https://www.npmjs.com/package/sylas-react-ui](https://www.npmjs.com/package/sylas-react-ui)

## License

MIT © [pb0710](https://github.com/pb0710)
