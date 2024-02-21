import { object, string } from 'prop-types'
import { useEffect, useRef, useState } from 'react'

const App = ({ extension, extensionProps }) => {
  const queryParams = Object.keys(extensionProps)
    .map((k) => `${k}=${encodeURIComponent(extensionProps[k])}`)
    .join('&')

  let url = `extensions/${extension}/index.html`
  if (queryParams) {
    url = `${url}?${queryParams}`
  }

  const [scale, setScale] = useState(1)

  return (
    <div className="w-screen h-screen overflow-hidden flex bg-slate-400">
      <div
        className="h-full bg-slate-800 relative w-96"
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
      <div
        className="h-full p-5 w-full overflow-hidden origin-top-left"
        onWheel={(e) => {
          e.stopPropagation()

          const newScale = Math.max(scale - (e.deltaY / 100), 1)
          console.log(`scale: ${newScale}`)
          setScale(newScale)
        }}
        style={{
          transform: `scale(${scale})`
        }}
      >
        <iframe
          title="canvas"
          id="canvas"
          src="canvas/index.html"
          className="w-full h-full"
        />
      </div>
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
