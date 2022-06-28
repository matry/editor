import { string } from 'prop-types'

const App = ({ extension }) => {
  console.log(`extension: ${extension}`)

  return (
    <div className="h-screen w-screen overflow-hidden">
      <iframe
        title="canvas"
        id="canvas"
        src="canvas/index.html"
        className="w-screen h-screen"
      />
      {extension !== '' && (
        <iframe
          key={extension}
          title={extension}
          id={extension}
          src={`extensions/${extension}/index.html`}
          className="w-screen h-screen absolute inset-0"
        />
      )}
    </div>
  )
}

App.propTypes = {
  extension: string,
}

App.defaultProps = {
  extension: '',
}

export default App
