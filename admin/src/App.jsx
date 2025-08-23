import React , {useState ,useEffect} from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes , Route} from 'react-router-dom';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';

//It takes the value from your Vite environment variable VITE_BACKEND_URL.
//You can use backendUrl anywhere to make API calls to your backend server.

export const backendUrl= import.meta.env.VITE_BACKEND_URL;

const App = () => {

  //The initial value is taken from localStorage:
  //If localStorage has a token, it is used as initial state.Otherwise, it starts as an empty string ''.
  //This ensures that if a user already logged in previously, the app remembers them.
  const [token,setToken]= useState(localStorage.getItem('token')?localStorage.getItem('token'):'');
  
  //useEffect runs a side effect whenever token changes.
  //It stores the current token in localStorage automatically.
  //This allows your login state to persist even if the page is refreshed.
  useEffect(()=>{
    localStorage.setItem('token', token)

  },[token])

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {token === ""
      ? <Login setToken={setToken}/>
      : <>
    <Navbar/>
    <hr/>
    <div className='flex w-full'>
      <Sidebar/>
      <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base' >

      <Routes>
        <Route path='/add' element={<Add/>}/>
        <Route path='/list' element={< List/>}/>
        <Route path='/orders' element={<Orders/>}/>
      </Routes>
      </div>

    </div>
    </> }
    
    
    </div>
   
  )
}

export default App;