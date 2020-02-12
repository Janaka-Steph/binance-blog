import React from 'react'
import dynamic from 'next/dynamic'

const Editor = dynamic(
  // @ts-ignore
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  {ssr: false},
)

const DraftEditor = ({editorState, setEditorState, errorMsg, setErrorMsg}: any) => {
  const onEditorStateChange = (edState: any) => {
    setEditorState(edState)
    // Validate post body
    if (editorState.getCurrentContent().hasText()) {
      setErrorMsg({emptyBody: ''})
    }
  }

  return (
    <div id="draft-editor__container">
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editor-root"
        onEditorStateChange={onEditorStateChange}
      />
      {errorMsg.emptyBody && <span className="form__error">{errorMsg.emptyBody}</span>}

      <style jsx={true}>
        {`
          div :global(.editor-root) {
              border: 1px solid #b3b3b3;
              border-radius: 2px;
              height: 300px;
              padding: 10px;
          }
          .form__error {
            color: #da0e0c;
          }
      `}
      </style>
    </div>
  )
}

export default DraftEditor
