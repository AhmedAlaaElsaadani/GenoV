import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hero from "./components/Hero/Hero";
import RoutLayout from "./components/Routlayout/RoutLayout";
import FormLayout from "./components/FormLayout/FormLayout";
import About from "./components/About/About";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Docs from "./components/Docs/Docs";
import PreCalc from "./components/PreCalc/PreCalc";
import Contact from "./components/Contact/Contact";
import OurServices from "./components/OurServices/OurServices";
import AuthProvider from "./Context/authContext";
import InverseProtectedRoute from "./components/InverseProtectedRoute/InverseProtectedRoute";
import OtpConfirm from "./components/Otp/OtpConfirm";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ForgetPasswordSendEmail from "./components/ForgetPassword/ForgetPasswordSendEmail";
import ForgetPasswordOtpConfirm from "./components/ForgetPassword/ForgetPasswordOtpConfirm";

function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <RoutLayout />,
      children: [
        { index: true, element: <Hero /> },
        { path: "home", element: <Hero /> },
        { path: "about", element: <About /> },
        { path: "Docs", element: <Docs /> },
        { path: "PreCalc", element: <PreCalc /> },
        { path: "OurServices", element: <OurServices /> },
      ],
    },
    {
      path: "/forms",
      element: <FormLayout />,
      children: [
        {
          path: "",
          element: (
            <InverseProtectedRoute>
              <Login />
            </InverseProtectedRoute>
          ),
        },
        {
          path: "Login",
          element: (
            <InverseProtectedRoute>
              <Login />
            </InverseProtectedRoute>
          ),
        },
        {
          path:"ForgetPasswordSendEmail",
          element: (
            <InverseProtectedRoute>
              <ForgetPasswordSendEmail />
            </InverseProtectedRoute>
          ),
        },
        {
          path:"otp-confirm",
          element: (
            <InverseProtectedRoute>
              <ForgetPasswordOtpConfirm />
            </InverseProtectedRoute>
          ),
        }
        ,
        {
          path: "Register",
          element: (
            <InverseProtectedRoute>
              <Register />
            </InverseProtectedRoute>
          ),
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "emailConfirmation",
          element: (
            <ProtectedRoute>
              <OtpConfirm />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
