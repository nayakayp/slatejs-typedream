import React, { useState, useCallback } from 'react'
import { createEditor, BaseEditor, Transforms, Editor, Path } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'

import DefaultFormat from '../components/DefaultFormat';
import AddedLineFormat from '../components/AddedLineFormat';
import DeletedLineFormat from '../components/DeletedLineFormat';

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
  type: 'code',
  children:[{
    text:'A line of text in a paragraph'
  }]
}]

const App = () => {
  const [editor] = useState(() => withReact(createEditor()))
  const [lineFormat, setLineFormat] = useState('normal')

  function handleKeyDown (e: React.KeyboardEvent) {
    e.preventDefault()
    if(e.key === 'd' && e.ctrlKey){
      setLineFormat('deleted')
    }else if(e.key === 'a' && e.ctrlKey){
      setLineFormat('added')
    }else if(e.key === 'n' && e.ctrlKey){
      setLineFormat('normal')
    }
    
  }


  const renderElement = useCallback(props => {
    switch(props.element.type){
      case 'code':
        if(lineFormat === 'added'){
          return <AddedLineFormat {...props}/>
        }else if(lineFormat === 'deleted'){
          return <DeletedLineFormat {...props}/>
        }
      default:
        return <DefaultFormat {...props}/>
    }
  },[lineFormat])

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