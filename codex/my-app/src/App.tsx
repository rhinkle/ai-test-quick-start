import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-50 text-gray-900">
      <div className="flex items-center gap-6">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="h-16 w-16" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="h-16 w-16 animate-spin [animation-duration:6s]" alt="React logo" />
        </a>
      </div>
      <h1 className="text-4xl font-bold">Vite + React + Tailwind</h1>
      <div className="flex flex-col items-center gap-3">
        <button
          className="rounded-md bg-indigo-600 px-4 py-2 text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p className="text-sm text-gray-600">
          Edit <code className="font-mono">src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-xs text-gray-500">
        Click the logos to learn more
      </p>
    </div>
  )
}

export default App
