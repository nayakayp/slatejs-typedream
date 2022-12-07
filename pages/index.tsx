import React, { useState, useCallback, useMemo } from 'react'
import { createEditor, BaseEditor, Transforms, Editor } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'
import { withHistory } from 'slate-history'

import DefaultFormat from '../components/DefaultFormat';
import AddedLineFormat from '../components/AddedLineFormat';
import DeletedLineFormat from '../components/DeletedLineFormat';

import CodeFormat from '../components/CodeFormat';

type CustomElement = { type: 'paragraph' | 'code'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const initialValue = [
  {
    type: 'code',
    children: [{ text: `const App = () => {` }],
  },
  {
    type: 'code',
    children: [{ text: `    const [editor] = useState(() => withReact(createEditor()))` }],
  }
]


const App = () => {
  const [editor] = useState(() => withReact(createEditor()))

  function handleKeyDown (e: React.KeyboardEvent) {
    if(e.key === 'd' && e.ctrlKey){
      e.preventDefault()
      Transforms.setNodes(
        editor,
        { lineFormat: 'deleted' },
        { match: n => Editor.isBlock(editor, n) }
      )
    }else if(e.key === 'a' && e.ctrlKey){
      e.preventDefault()
      Transforms.setNodes(
        editor,
        { lineFormat: 'added' },
        { match: n => Editor.isBlock(editor, n) }
      )
    }else if(e.key === 'n' && e.ctrlKey){
      e.preventDefault()
      Transforms.setNodes(
        editor,
        { lineFormat: 'normal' },
        { match: n => Editor.isBlock(editor, n) }
      )
    }
    
  }

  const renderElement = useCallback(props => {
    switch(props.element.lineFormat){
      case 'added':
        return <AddedLineFormat {...props}/>
      case 'deleted':
        return <DeletedLineFormat {...props}/>
      default:
        return <DefaultFormat {...props}/>
    }
  },[])
  
  return (
    <div className='min-h-screen flex flex-col items-center bg-[#f5f5f5]'>
      <Slate editor={editor} value={initialValue}>
        <Editable 
          renderElement={renderElement}
          onKeyDown={event => handleKeyDown(event)}
          className="bg-white w-1/2 p-4 rounded-lg shadow-lg min-h-1/3 mt-20"
        />
      </Slate>
    </div>
  )
}

export default App