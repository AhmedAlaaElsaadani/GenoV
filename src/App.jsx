import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Hero from './components/Hero/Hero';
import RoutLayout from './components/Routlayout/RoutLayout';
import FormLayout from './components/FormLayout/FormLayout';
import About from './components/About/About';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Docs from './components/Docs/Docs';

function App() {
  let router = createBrowserRouter(
    [{
      path: '/',
      element: <RoutLayout/>,
      children:[
        {index:true, element: <Hero/>},
        {path:"home", element:<Hero/>},
        {path:"about", element:<About/>},
        {path:"Docs",element:<Docs/>}
      ]
    }
    ,{
      path:"/forms",
      element:<FormLayout/>,
      children:[
        // {index:true, element:<Login/>},
        {path:'Login', element:<Login/>},
        {path:"Register",element:<Register/>}
      ]
    }
    ]
  );
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
