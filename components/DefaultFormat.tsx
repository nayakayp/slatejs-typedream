import React from 'react'

type Props = {}

const DefaultFormat = (props: Props) => {
  return (
    <pre {...props.attributes}>
        <code>{props.children}</code>
    </pre>
  )
}

export default DefaultFormat