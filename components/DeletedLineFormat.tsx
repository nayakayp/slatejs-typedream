import React from 'react'

type Props = {}

const DeletedLineFormat = (props: Props) => {
  return (
    <pre {...props.attributes} className="bg-red-50 -mx-4 px-4">
        <code>- {props.children}</code>
    </pre>
  )
}

export default DeletedLineFormat