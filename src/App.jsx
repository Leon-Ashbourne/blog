import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import './App.css';
import './styles/load.css';

function fetchBlogContent(content, title) {
  const targetOrigin = "http://localhost:5173";

  const sendData = () => {

    const iframe = document.querySelector('#main-domain');
    const window = iframe.contentWindow;
    window.postMessage(JSON.stringify({title, content}), targetOrigin);

  }

  sendData();
}

function extractContent(content) {    

  const preview = document.querySelector(".blog-content-preview.preview");
  const titleEle = preview.getElementsByTagName("h1");

  let title = '';
  if(titleEle.length > 0) title = titleEle[0].textContent;
  else title = preview.firstChild.textContent;

  fetchBlogContent(content, title);
}

export default function App() {

  const editorRef = useRef(null);
  const apiKey = import.meta.env.VITE_API_KEY

  const handlePreview = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();

      const dialog = document.querySelector('.blog-dialog.container');
      const preview = document.querySelector('.blog-content-preview.preview');
      preview.innerHTML = content;

      dialog.showModal();
    }
  };

  const handleCancel = () => {
    const dialog = document.querySelector('.blog-dialog.container');
    dialog.close();

  }


  const handleSubmit = async () => {
    showLoader();
    handleCancel();
    
    if(editorRef.current) {

      const content = editorRef.current.getContent();
      extractContent(content);

    }
  }

  return (
    <>
      <div>
        <dialog className="blog-dialog container">
          <div className="blog-content-preview preview"></div>
          <div className="dialog-controllers">
            <button onClick={handleCancel} className="cancel-button button">Cancel</button>
            <button onClick={handleSubmit} className="submit-button button">Submit</button>
          </div>
        </dialog>
      </div>
      <div>
        <LoadPage />
      </div>
      <Editor
        apiKey={apiKey}
        onInit={ (_evt, editor) => editorRef.current = editor }
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          min_height: 800,
          min_width: 800,
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
      <button onClick={handlePreview}>Preview</button>
    </>
  );
}

function showLoader() {
  const loader = document.querySelector(".loading-dialog");
  loader.showModal();
}

function LoadPage() {

  return (
    <dialog className="loading-dialog">
      <div className="loader-container">
        <div className="loading-animation" style={{ height: "120px", width: "120px" }}></div>
        <div>Just a moment… we're sending your content.</div>
      </div>
    </dialog>
  )
  
}