import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0);
  console.log("process.env.NAME",import.meta.env.VITE_NAME);

  return (
    <>
      <h2 className='text-2xl text-blue-500'>Hello World</h2>
    </>
  )
}

export default App
