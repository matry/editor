import { object, string } from 'prop-types'

const App = ({ extension, params }) => {
  const queryParams = Object.keys(params)
    .map((k) => `${k}=${params[k]}`)
    .join('&')

  let url = `extensions/${extension}/index.html`
  if (queryParams) {
    url = `${url}?${queryParams}`
  }

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
          src={url}
          className="w-screen h-screen absolute inset-0"
        />
      )}
      {/* <Test /> */}
    </div>
  )
}

App.propTypes = {
  extension: string,
  params: object,
}

App.defaultProps = {
  extension: '',
  params: {},
}

export default App
