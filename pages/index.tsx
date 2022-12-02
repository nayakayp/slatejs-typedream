import React, { useState, useCallback } from 'react'
import { createEditor, BaseEditor, Transforms, Editor } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'

import DefaultFormat from '../components/DefaultFormat';
import CodeFormat from '../components/CodeFormat';

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const initialValue = [{
  type:'paragraph',
  children:[{
    text:'A line of text in a paragraph'
  }]
}]

const App = () => {
  const [editor] = useState(() => withReact(createEditor()))

  function handleKeyDown (e: React.KeyboardEvent) {
    if(e.key === '`' && e.ctrlKey){
      e.preventDefault();

      const [match] = Editor.nodes(editor, {
        match : n => n.type === 'code'
      })

      Transforms.setNodes(
        editor,
        { type: match ? 'paragraph' : 'code' },
        { match: n => Editor.isBlock(editor, n) }
      )
    }
  }

  const renderElement = useCallback(props => {
    switch(props.element.type){
      case 'code':
        return <CodeFormat {...props}/>
      default:
        return <DefaultFormat {...props}/>
    }
  })

  return (
    <Slate editor={editor} value={initialValue}>
      <Editable 
        renderElement={renderElement}
        onKeyDown={event => handleKeyDown(event)}
      />
    </Slate>
  )
}

export default App