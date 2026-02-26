import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import './styles/editor.css';
import './styles/load.css';
import { SelfPostsContext } from '../App';
import { useParams } from 'react-router';

function extractContent(content, postid, setState) {    

  const preview = document.querySelector(".blog-content-preview.preview");
  const title = document.querySelector("#title").value;

  return fetchBlogContent({title, content}, postid, setState);
}

//
async function fetchBlogContent(data, postid, setState) {

  try {
      const token = localStorage.getItem('Token');
      const url = !isNaN(parseInt(postid)) ? `https://blog-api-fi4r.onrender.com/posts/${postid}` : 'https://blog-api-fi4r.onrender.com/posts';
      const method = !isNaN(parseInt(postid)) ? "PUT" : "POST";

      // if(!token) - TODO- signin redirect while storing the blog content

      const internalServerError = await fetch(url, {
          mode: "cors",
          method,
          headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(data)
      })
      .then((res) => {
          if(!res.ok) {
            console.error(res.error)
            return res.error;
          }
      });

      if(internalServerError) {
          setState(false);
      }else {
          setState(true);
      }

  }catch(error) {
      setState(false);
  }
}

const ContentContext = createContext(null);

export default function BlogEditor() {

  const postid = useParams().postid;
  let content = "<p>This is the initial content of the editor.</p>";
  const postidRef = useRef(postid);

  if(postid && !isNaN(parseInt(postid))) {
    const id = parseInt(postid);
    const selfPosts = useContext(SelfPostsContext).posts;

    const edit = selfPosts.filter((post) => {
      if(post.id === id) return post;
    })

    if(edit && edit.length > 0) content = edit[0];
  }

  const editorRef = useRef(null);
  const apiKey = import.meta.env.VITE_API_KEY;
  const [ state, setState ] = useState(0);

  const handlePreview = () => {
    const title = document.querySelector("#title").value;
    const error = document.querySelector(".title-error");
    const cerror = document.querySelector(".completion-error");

    if(!title) { 

      cerror.textContent = "fill required fields.";
      error.textContent = "Title is required.";
      error.style.color = "red";
      cerror.style.color = "red";

      return;
    }else {
      error.textContent = '';
      cerror.textContent = '';
    }

    if (editorRef.current) {
      const content = editorRef.current.getContent();

      const dialog = document.querySelector('.blog-dialog.precontainer');
      const preview = document.querySelector('.blog-content-preview.preview');
      const title = document.querySelector('#title').value;
      
      const value = `<h1>${title}</h1>`

      preview.innerHTML = value + content;

      dialog.showModal();
    }
  };

  const handleCancel = () => {
    const dialog = document.querySelector('.blog-dialog.precontainer');
    dialog.close();

  }


  const handleSubmit = () => {
    showLoader();
    handleCancel();
    
    if(editorRef.current) {

      const content = editorRef.current.getContent();
      const postid = postidRef.current;
      extractContent(content, postid, setState);

    }
  }

  return (
    <div className='editor-main'>
      <div className='title-wrapper'>
        <span className='title-error' aria-errormessage='polite'></span>
        <div className='title-container'>
          <div><label htmlFor="title">Title</label></div>
          <div className='ta-styled'><textarea type="textarea" id="title" name="title" defaultValue={content.title || ''} autoFocus></textarea></div>
        </div>
      </div>
      <div>
        <dialog className="blog-dialog precontainer">
          <div className="blog-content-preview preview"></div>
          <div className="dialog-controllers">
            <button onClick={handleCancel} className="cancel-button button">Cancel</button>
            <button onClick={handleSubmit} className="submit-button button">Submit</button>
          </div>
        </dialog>
      </div>
      <div>
        <ContentContext value={state}>
          <LoadPage />
        </ContentContext>
      </div>
      <Editor
        apiKey={apiKey}
        onInit={ (_evt, editor) => editorRef.current = editor }
        initialValue={content.content || content }
        init={{
          min_height: 800,
          min_width: 800,
          skin: "oxide-dark",
          content_css: "dark",
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount', 'image'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help | ' + 'link image |',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <div><span className='completion-error'></span></div>
      <button 
        onClick={handlePreview} 
        style={{ padding: "4px 8px", fontSize: "1.2rem", textAlign: "end", margin: "3rem 1rem"}}
      >Preview</button>
    </div>
  );
}

function showLoader() {
  const loader = document.querySelector(".loading-dialog");
  loader.showModal();
}

function LoadPage() {
  const state = useContext(ContentContext);

  const handleResultCancel = () => {
    const dialog = document.querySelector('.loading-dialog');
    dialog.close();
  }

  return (
    <dialog className="loading-dialog">
      <div className="wrapper-result">
        { state === true ? 
          <div className="success-message">
            <div>Successfully sent.</div>
            <div className='back-link' onClick={handleResultCancel} role='link' >Back to editing</div>
          </div>
          : <div className="loader-container loading">
            {
              state === false ? 
              <div className="failure-message" >
                <div>Something went wrong. Please try again later.</div>
                <div className='back-link' onClick={handleResultCancel} role='link'>Back to editing</div>
              </div>
              : <>
              <div className="loading-animation" style={{ height: "120px", width: "120px" }}></div>
              <div>Just a moment… we're sending your content.</div>
              </>
              
          }
            
          </div>
        }
      </div>
    </dialog>
  )
  
}