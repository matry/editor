
export default function CanvasNode(props) {
  if (!props.canvasDOM) {
    return null
  }

  const children = Array.from(props.canvasDOM.children)
  const isActive = props.selections.includes(props.canvasDOM.id)

  const dataType = props.canvasDOM.getAttribute('data-type')
  const name = props.canvasDOM.getAttribute('data-name')

  const ElementType = dataType === 'html' ? 'ul' : 'li'
  const elementClass = dataType === 'html' ? 'root px-5 text-xs text-neutral-500' : 'mb-1 relative'
  const hasChildren = children.length !== 0 && ['html', 'body', 'shape'].includes(dataType)

  let typeTag = null
  let typeColor = ''

  switch (dataType) {
    case 'text':
      typeColor = 'text-green-500'
      typeTag = (
        <span className="leading-tight flex self-center w-px h-3 rounded-full bg-green-500" />
      )
      break
    case 'image':
      typeColor = 'text-orange-500'
      typeTag = (
        <span className="leading-tight flex self-center w-px h-3 rounded-full bg-orange-500" />
      )
      break
    case 'shape':
      typeColor = 'text-purple-500'
      typeTag = (
        <span className="leading-tight flex self-center w-px h-3 rounded-full bg-purple-500" />
      )
      break
    default:
      break
  }

  const openingTag = (
    <span className="leading-none flex items-baseline mb-2">
      {/* {Boolean(typeTag) && (
        <>
          {typeTag}
          &nbsp;
        </>
      )} */}

      <pre className="inline leading-none">&lt;</pre>

      <span className={`inline leading-none ${isActive ? 'text-white' : ''}`}>{dataType}</span>
      {Boolean(name) && (
        <span className={`inline leading-none ${isActive ? 'text-white' : ''}`}>&nbsp;{name}</span>
      )}
      <pre className="inline leading-none">
        {!hasChildren && (
          <>&#47;</>
        )}
        &gt;
      </pre>
    </span>
  )

  return (
    <ElementType
      key={props.canvasDOM.id}
      id={props.canvasDOM.id}
      className={elementClass}
    >
      {!hasChildren && (
        <>
          {openingTag}
        </>
      )}

      {hasChildren && (
        <>
          {openingTag}
          <ul className={`mt-1 pl-4 border-l border-dashed ${isActive ? 'border-neutral-500' : 'border-neutral-800'}`}>
            {children.map((childElement) => {
              if (!childElement.id) {
                return null
              }

              return (
                <CanvasNode
                  key={childElement.id}
                  canvasDOM={childElement}
                  selections={props.selections}
                />
              )
            })}
          </ul>

          <span className="leading-none flex items-baseline mb-2">
            <pre className="inline">&lt;&#47;</pre>
            <span className={`inline ${isActive ? 'text-white' : ''}`}>{dataType}</span>
            <pre className="inline">&gt;</pre>
          </span>
        </>
      )}
    </ElementType>
  )
}
