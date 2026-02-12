function App() {

  function handleAction(formData) {
    //
  }

  return (
    <main>
      <div>
        <form action={handleAction}>
          <div>
            <div>
              <label htmlFor="title">Title</label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="content"></label>
              <textarea name="content" id="content"></textarea>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}

export default App
