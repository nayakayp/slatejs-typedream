import React from 'react'

type Props = {}

const CodeFormat = (props: Props) => {
  return (
    <pre {...props.attributes}>
        <code>{props.children}</code>
    </pre>
  )
}

export default CodeFormat