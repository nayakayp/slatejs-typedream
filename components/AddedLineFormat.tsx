import React from 'react'

type Props = {}

const AddedLineFormat = (props: Props) => {
  return (
    <pre {...props.attributes} className="bg-green-50 -mx-4 px-4">
        <code>+ {props.children}</code>
    </pre>
  )
}

export default AddedLineFormat