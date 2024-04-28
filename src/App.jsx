import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Hero from './components/Hero/Hero';
import RoutLayout from './components/Routlayout/RoutLayout';
import FormLayout from './components/FormLayout/FormLayout';
import About from './components/About/About';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Docs from './components/Docs/Docs';
import PreCalc from './components/PreCalc/PreCalc';
import Contact from './components/Contact/Contact';
import OurServices from './components/OurServices/OurServices';

function App() {
  let router = createBrowserRouter(
    [{
      path: '/',
      element: <RoutLayout/>,
      children:[
        {index:true, element: <Hero/>},
        {path:"home", element:<Hero/>},
        {path:"about", element:<About/>},
        {path:"Docs",element:<Docs/>},
        {path:"PreCalc",element:<PreCalc/>},
        {path:"OurServices",element:<OurServices/>},

      ]
    }
    ,{
      path:"/forms",
      element:<FormLayout/>,
      children:[
        {path:'Login', element:<Login/>},
        {path:"Register",element:<Register/>},
        {path:"contact",element:<Contact/>}
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
