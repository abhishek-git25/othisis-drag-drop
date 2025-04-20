
import Home from './pages/Home'
import Layout from './component/Layout'
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
