import React, { useContext, useEffect } from 'react'
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Layouts from './layouts/Layouts';
import Home from './component/home/Home';
import Login from './component/login/Login';
import Register from './component/register/Register';
import { UserContext } from './component/context/User';
import AddPost from './component/addPost/AddPost';
import ShowCommit from './component/showCommit/ShowCommit';
import EditePost from './component/editePost/EditePost';
import Profile from './component/profile/Profile';

export default function App() {
  let {setUserToken,setUserId}=useContext(UserContext);

  useEffect(()=>{
    const storedToken = localStorage.getItem("userToken");
    const storedUserId = localStorage.getItem("userId");
    if(storedToken)
    {
      setUserToken(storedToken);
      setUserId(storedUserId);
      
      // localStorage.removeItem("userToken");
      // localStorage.removeItem("userId");
    }
  },[setUserToken,setUserId]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"register",
        element:<Register/>
      },
      {
        path:"addPost",
        element:<AddPost/>,
        children:[
          {
          path:"profile",
          element:<Profile/>
        }
      ]
      },
      {
        path:"showComment/:commentId",
        element:<ShowCommit/>
      },
      {
        path:"editePost/:postId",
        element:<EditePost/>
      },
      {
        path:"profile",
        element:<Profile/>
      }
    ]
  },
]);


  return (
    <RouterProvider router={router} />
  )
}
