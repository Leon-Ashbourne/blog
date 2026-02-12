import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './App.css';

async function fetchBlogContent(content) {

  const token = localStorage.getItem('Token');
  const url = 'http://localhost:5000/posts';

  const { data, error } = await fetch(url, {
    mode: "no-cors",
    method: "post",
    headers: {
      ContentType: "application/json"
    },
    body: {
      Autherization: `Bearer ${token}`,
      content: content
    }
  })
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
    if(editorRef.current) {
      const content = editorRef.current.getContent();
      const done = await fetchBlogContent(content);
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