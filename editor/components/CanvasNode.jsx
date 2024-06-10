
export default function CanvasNode(props) {
  if (!props.canvasDOM) {
    return null
  }

  const children = Array.from(props.canvasDOM.children)
  const isActive = props.selections.includes(props.canvasDOM.id)

  const dataType = props.canvasDOM.getAttribute('data-type')
  const ElementType = dataType === 'html' ? 'ul' : 'li'
  const elementClass = dataType === 'html' ? 'root px-5 text-xs text-neutral-500' : 'mb-1 relative'
  const hasChildren = children.length !== 0 && ['html', 'body', 'shape'].includes(dataType)

  const openingTag = (
    <span>
      <pre className="inline">&lt;</pre>
      <span className={`inline ${isActive ? 'text-white' : ''}`}>{dataType}</span>
      <pre className="inline">
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
          <ul className={`mt-1 pl-4 border-l border-dashed ${isActive ? 'border-gray-500' : 'border-gray-800'}`}>
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

          <span>
            <pre className="inline">&lt;&#47;</pre>
            <span className={`inline ${isActive ? 'text-white' : ''}`}>{dataType}</span>
            <pre className="inline">&gt;</pre>
          </span>
        </>
      )}
    </ElementType>
  )
}
