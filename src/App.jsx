import { useState } from 'react'
import './index.css'
import Weather from './components/Weather'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
      <Weather />
    </div>
  )
}

export default App