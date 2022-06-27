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
      {/* <iframe
        src="extensions/css/index.html"
        className="absolute top-0 left-0"
      /> */}
    </div>
  )
}

export default App
