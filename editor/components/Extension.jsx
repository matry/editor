import StyleEditor from './StyleEditor'
import TextContent from './TextContent'
import QuickForm from './QuickForm'
import NameForm from './NameForm'
import FileNameForm from './FileNameForm'

export default function Extension(props) {
  const queryParams = Object.keys(props.extensionProps)
    .map((k) => `${k}=${encodeURIComponent(props.extensionProps[k])}`)
    .join('&')

  let url = `/extensions/${props.extension}/index.html`
  if (queryParams) {
    url = `${url}?${queryParams}`
  }

  let content = null

  switch (props.extension) {
    case 'quick':
      content = (
        <QuickForm />
      )
      break
    case 'text':
      content = (
        <TextContent
          textContents={props.extensionProps}
        />
      )
      break
    case 'css':
      content = (
        <StyleEditor
          styles={props.extensionProps}
        />
      )
      break
    case 'name':
      content = (
        <NameForm initialName={props.extensionProps.name} />
      )
      break
    case 'file_name':
      content = (
        <FileNameForm initialName={props.extensionProps.name} />
      )
      break
    case '':
      content = null
      break
    default:
      content = (
        <div className="w-full h-full z-10 bg-black relative">
          <iframe
            key={props.extension}
            title={props.extension}
            id={props.extension}
            src={url}
            className="w-full h-full"
          />
        </div>
      )
      break
  }

  return content
}
