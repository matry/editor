import { object, string } from 'prop-types'

const App = ({ extension, extensionProps }) => {
  const queryParams = Object.keys(extensionProps)
    .map((k) => `${k}=${encodeURIComponent(extensionProps[k])}`)
    .join('&')

  let url = `extensions/${extension}/index.html`
  if (queryParams) {
    url = `${url}?${queryParams}`
  }

  return (
    <div className="w-screen h-screen overflow-hidden">
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
          src={url}
          className="absolute inset-0 w-screen h-screen"
        />
      )}
      {/* <Test /> */}
    </div>
  )
}

App.propTypes = {
  extension: string,
  extensionProps: object,
}

App.defaultProps = {
  extension: '',
  extensionProps: {},
}

export default App
