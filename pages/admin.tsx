import React, {useState} from 'react'
import log from 'loglevel'
import {withTypes, Field} from 'react-final-form'
import {convertToRaw, EditorState, ContentState} from 'draft-js'
import axios from 'axios'
import swal from 'sweetalert'
import DraftEditor from '../components/DraftEditor'

type FormValues = {
  title: string
  author: string
}

const {Form} = withTypes<FormValues>()

const Admin = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [postBodyErrMsg, setPostBodyErrMsg] = useState({emptyBody: ''})

  const onSubmit = async ({title, author}: FormValues) => {
    const postBody = convertToRaw(editorState.getCurrentContent())
    const data = {
      title: title,
      author: author,
      postBody: postBody,
    }

    // Validate post body
    if (!editorState.getCurrentContent().hasText()) {
      setPostBodyErrMsg({emptyBody: 'Post must not be empty'})
      return false
    }

    try {
      await axios.post('/api/blog', data)
      swal({
        title: 'Good job!',
        text: 'Your Post Has Been Saved!',
        icon: 'success',
      })
    } catch (err) {
      log.error('POST response /api/blog:', err)
      swal({
        title: 'Error',
        text: 'Oups, An Error Occurred.',
        icon: 'error',
      })
    }
    return true
  }

  return (
    <>
      <Form
        onSubmit={onSubmit}
        validate={(values) => {
          const errors: any = {}
          // Title
          if (!values.title) {
            errors.title = 'Required'
          }
          if (values.title && values.title.length > 150) {
            errors.title = 'Title must be less than 150 characters'
          }
          // Author
          if (!values.author) {
            errors.author = 'Required'
          }
          if (values.author && values.author.length > 150) {
            errors.author = 'Author must be less than 150 characters'
          }
          return errors
        }}
        render={({handleSubmit, submitting, form}) => (
          <form onSubmit={(event) => handleSubmit(event)?.then((res) => {
            if (res) {
              form.reset()
              form.resetFieldState('title')
              form.resetFieldState('author')
              const newEditorState = EditorState.push(editorState, ContentState.createFromText(''), 'remove-range')
              setEditorState(newEditorState)
            }
          })}
          >
            <Field name="title">
              {({input, meta}) => (
                <div id="post__title__container">
                  <label htmlFor="post__title">
                    <div>Title</div>
                    <input id="post__title" type="text" {...input} placeholder="Title"/>
                  </label>
                  {meta.touched && meta.error && <span className="form__error">{meta.error}</span>}
                </div>
              )}
            </Field>

            <Field name="author">
              {({input, meta}) => (
                <div id="post__author__container">
                  <label htmlFor="post__author">
                    <div>Author</div>
                    <input id="post__author" type="text" {...input} placeholder="Author"/>
                  </label>
                  {meta.touched && meta.error && <span className="form__error">{meta.error}</span>}
                </div>
              )}
            </Field>

            <DraftEditor
              editorState={editorState}
              errorMsg={postBodyErrMsg}
              setEditorState={setEditorState}
              setErrorMsg={setPostBodyErrMsg}
            />

            <button
              disabled={submitting}
              type="submit"
            >
              Save Post
            </button>

            <style jsx={true}>
              {`
                form {
                  display: grid;
                  grid-template-columns: repeat(12, 1fr);
                  grid-row-gap: 35px;
                  margin: 40px 0 40px;
                }
                
                input {
                  height: 30px;
                  width: 100%;
                }
                
                .form__error {
                  color: #da0e0c;
                }
                
                #post__title__container {
                  grid-row: 1;
                  grid-column: 2/11;
                }
                
                #post__author__container {
                  grid-row: 2;
                  grid-column: 2/11;
                }
                
                :global(#draft-editor__container) {
                  grid-row: 3;
                  grid-column: 2/11;
                }
                
                button {
                  grid-row: 4;
                  grid-column: 2/11;
                  background-color: #fdc300;
                  box-shadow: 0 0 2px 2px #5a626740;
                  border: none;
                  display: block;
                  font-size: 1.25em;
                  height: 36px;
                  letter-spacing: 1px;
                  -webkit-font-smoothing: subpixel-antialiased;
                  
                  &:hover {
                    cursor: pointer;
                    box-shadow: 0 0 15px 2px #5a626782;
                  }
                }
              `}
            </style>
          </form>
        )}
      />
    </>
  )
}

export default Admin
