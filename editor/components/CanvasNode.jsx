
export default function CanvasNode({ canvasDOM, selections }) {
  if (!canvasDOM) {
    return null
  }

  const children = Array.from(canvasDOM.children)
  const isActive = selections.includes(canvasDOM.id)

  const ElementType = canvasDOM.getAttribute('data-type') === 'html' ? 'ul' : 'li'
  const elementClass = canvasDOM.getAttribute('data-type') === 'html' ? 'root p-5 text-xs text-slate-500' : 'mb-1 relative'

  return (
    <ElementType
      key={canvasDOM.id}
      id={canvasDOM.id}
      className={elementClass}
    >
      {children.length === 0 && (
        <span>
          <pre className="inline">&lt;</pre>
          <span className={`inline ${isActive ? 'text-white' : ''}`}>{canvasDOM.getAttribute('data-type')}</span>
          <pre className="inline"> &#47;&gt;</pre>
        </span>
      )}

      {children.length > 0 && (
        <>
          <span>
            <pre className="inline">&lt;</pre>
            <span className={`inline ${isActive ? 'text-white' : ''}`}>{canvasDOM.getAttribute('data-type')}</span>
            <pre className="inline">&gt;</pre>
          </span>
          <ul className={`mt-1 pl-4 border-l border-dashed ${isActive ? 'border-slate-500' : 'border-slate-800'}`}>
            {children.map((childElement) => {
              if (!childElement.id) {
                return null
              }

              return (
                <CanvasNode
                  key={childElement.id}
                  canvasDOM={childElement}
                  selections={selections}
                />
              )
            })}
          </ul>

          <span>
            <pre className="inline">&lt;&#47;</pre>
            <span className={`inline ${isActive ? 'text-white' : ''}`}>{canvasDOM.getAttribute('data-type')}</span>
            <pre className="inline">&gt;</pre>
          </span>
        </>
      )}
    </ElementType>
  )
}
