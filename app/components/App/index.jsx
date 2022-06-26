import CSSInput from "../CSSInput"

const App = ({ mode }) => {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <iframe
        id="canvas"
        src="canvas/index.html"
        className="w-screen h-screen"
      />
      {mode === 'style' && (
        <CSSInput />
      )}
    </div>
  )
}

export default App
