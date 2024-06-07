import Login from "../views/login";
import Main from "../views/main.js";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/Main",
      element: <Main />,
    },
  ],
  {
    basename: "/subdir/",
  }
);

export default router;
