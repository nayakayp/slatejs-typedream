import React from 'react'

type Props = {
  attributes: any;
  children: any;
}

const CodeFormat = (props: Props) => {
  return (
    <pre {...props.attributes}>
        <code>{props.children}</code>
    </pre>
  )
}

export default CodeFormat