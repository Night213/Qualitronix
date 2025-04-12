import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Dashboard from "./Components/Dashboard/Dashboard";
import Subscription from "./Components/Subscription/Subscription";
import History from "./Components/History/History";
import Settings from "./Components/Settings/Settings";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import Error404 from "./Components/Error404/Error404";
import UpdateProfile from "./Components/UpdateProfile/UpdateProfile";
import Preferences from "./Components/Preferences/Preferences";
import Security from "./Components/Security/Security";

function App() {
  const router = createBrowserRouter([
    {
      path: "/ForgotPassword",
      element: <ForgotPassword />,
    },
    {
      path: "/ResetPassword",
      element: <ResetPassword />,
    },
    { path: "/Login", element: <Login /> },
    { path: "/Register", element: <Register /> },
    { path: "*", element: <Error404 /> },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "/Dashboard",
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "/Subscription",
          element: (
            <ProtectedRoute>
              <Subscription />
            </ProtectedRoute>
          ),
        },
        {
          path: "/History",
          element: (
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          ),
        },
        {
          path: "/Settings",
          element: (
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          ),
          children: [
            { path: "Update-Profile", element: <UpdateProfile /> },
            { path: "Preferences", element: <Preferences /> },
            { path: "Security", element: <Security /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
