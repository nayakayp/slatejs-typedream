import React from 'react'

type Props = {
  attributes: any;
  children: any;
}

const DefaultFormat = (props: Props) => {
  return (
    <pre {...props.attributes}>
        <code>{props.children}</code>
    </pre>
  )
}

export default DefaultFormat