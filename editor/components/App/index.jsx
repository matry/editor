import { object, string } from 'prop-types'

const App = ({ extension, extensionProps }) => {
  const queryParams = Object.keys(extensionProps)
    .map((k) => `${k}=${encodeURIComponent(extensionProps[k])}`)
    .join('&')

  let url = `/extensions/${extension}/index.html`
  if (queryParams) {
    url = `${url}?${queryParams}`
  }

  return (
    <div
      className="h-full bg-slate-800 relative w-full"
    >
      {extension !== '' && (
        <iframe
          key={extension}
          title={extension}
          id={extension}
          src={url}
          className="w-full h-full"
        />
      )}
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
