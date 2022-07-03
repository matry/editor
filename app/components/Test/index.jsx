import { useState } from 'react'

const Test = () => {
  const [val, setVal] = useState('')

  return (
    <div className="flex justify-center items-center absolute inset-0">
      <div className="p-8 bg-slate-100 rounded border border-slate-300">
        <label
          htmlFor="test"
          className="leading-none"
        >
          hello
          <input
            id="test"
            type="text"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="block"
          />
        </label>
      </div>
    </div>
  )
}

export default Test
