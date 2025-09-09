
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// import ReactDom from "react-dom"
import  { Provider } from 'react-redux'
import store from "./redux/store.ts";
import {Route,RouterProvider , createRoutesFromElements} from "react-router"
import { createBrowserRouter } from 'react-router'

import PrivateRoute from './components/PrivateRoute.tsx'

import Login from './pages/Auth/Login.tsx'
import Register from './pages/Auth/Register.tsx'

import AdminRoute from './pages/Admin/AdminRoute.tsx'
import Profile from './pages/User/Profile.tsx'
import UserList from './pages/Admin/UserList.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >

      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />

      <Route path='' element={<PrivateRoute />} >
      <Route path='/profile' element={<Profile />} />
      </Route>

      <Route path='admin' element={<AdminRoute />} >
      <Route path='userlist' element={<UserList />} />
      </Route>


    </Route>

  )
)

createRoot(document.getElementById('root')!).render(
 <Provider store={store}>
    <RouterProvider router={router} />

 </Provider>
)
