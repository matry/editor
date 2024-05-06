import StyleForm from './StyleForm'

export default function Extension({ extension, extensionProps }) {
  const queryParams = Object.keys(extensionProps)
    .map((k) => `${k}=${encodeURIComponent(extensionProps[k])}`)
    .join('&')

  let url = `/extensions/${extension}/index.html`
  if (queryParams) {
    url = `${url}?${queryParams}`
  }

  let content = null

  switch (extension) {
    case 'css':
      content = (
        <StyleForm
          styles={extensionProps}
        />
      )
      break
    case '':
      content = null
      break
    default:
      content = (
        <div className="w-full h-screen z-10 bg-gray-900 relative">
          <iframe
            key={extension}
            title={extension}
            id={extension}
            src={url}
            className="w-full h-full"
          />
        </div>
      )
      break
  }

  console.log('new content')
  console.log(content)

  return content
}
