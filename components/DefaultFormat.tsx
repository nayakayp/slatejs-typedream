import React from 'react'

type Props = {
  attributes: any;
  children: any;
}

const DefaultFormat = (props: Props) => {
  return (
    <p {...props.attributes}>{props.children}</p>
  )
}

export default DefaultFormat