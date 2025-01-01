import { GoogleOAuthProvider } from '@react-oauth/google'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import ProtectedRoute from './features/Auth/ProtectedRoute.jsx'
import './index.css'
import store from './redux/store.js'
import LoginPage from './screens/Login.jsx'
import Signup from './screens/Signup.jsx'



const router = createBrowserRouter([
  {
    path:'/',
    element: <App/>
  },
  {
    path:'/home',
    element: <ProtectedRoute></ProtectedRoute> 
  },
  {
    path:'/profile',
    element: <ProtectedRoute></ProtectedRoute> 
  },
  {
    path:'/profile/:userId',
    element: <ProtectedRoute></ProtectedRoute> 
  },
  {
    path:'/explore',
    element: <ProtectedRoute></ProtectedRoute> 
  },
  {
    path:'/bookmark',
    element: <ProtectedRoute></ProtectedRoute> 
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:"/login",
    element: <LoginPage/>
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`} >
    <RouterProvider router={router} />
    <Toaster/> {/** global toast to use to notification */}
    </GoogleOAuthProvider>
  </Provider>
)

