import React from 'react'

type Props = {}

const DefaultFormat = (props: Props) => {
  return (
    <p {...props.attributes}>{props.children}</p>
  )
}

export default DefaultFormat