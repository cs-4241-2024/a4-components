import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Login from "./Login.jsx";
import Interface from "./Interface.jsx";

function App() {
    const router = createBrowserRouter([
      {
          path: "/",
          errorElement: <div/>,
          element: <Root/>,
          children: [
              {
                  path: "",
                  element: <Login/>,
              },
              {
                  path: "/table",
                  element: <Interface/>,
              },
          ]
      }
    ])

    return <RouterProvider router={router}/>;

    function Root() {

        return <Outlet/>;
    }
}

export default App
