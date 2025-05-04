import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home'

function App() {

  return (
    <div>
      <ToastContainer />
      <Home/>
    </div>
  )
}

export default App
