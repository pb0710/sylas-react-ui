import React from 'react'
import MarkdownToJSX from 'markdown-to-jsx'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import './index.css'

function getlang(str) {
  if (typeof str != 'string') return str
  const [prefix, lang, ...rest] = str.split('-')

  switch (lang) {
    case 'js':
      return 'javascript'
    default:
      return lang
  }
}

const Fragment = (props) => <>{props.children}</>

const Img = (props) => (
  <span className="pic">
    <img alt="" {...props} />
  </span>
)

const Pre = (props) => <pre className="code_wrapper">{props.children}</pre>

// 防止 SyntaxHighlighter 大量重渲染
const Highlight = React.memo<any>((props) => {
  const { language, children } = props
  return (
    <SyntaxHighlighter PreTag={Fragment} style={github} language={language}>
      {children}
    </SyntaxHighlighter>
  )
})

function Code(props) {
  const { children, className } = props
  return <Highlight language={getlang(className)}>{children}</Highlight>
}

function Markdown(props) {
  return (
    <div className="markdown_wrapper">
      <MarkdownToJSX
        options={{
          disableParsingRawHTML: true,
          overrides: {
            code: Code,
            pre: Pre,
            img: Img
          }
        }}
      >
        {props.children}
      </MarkdownToJSX>
    </div>
  )
}

export default Markdown
