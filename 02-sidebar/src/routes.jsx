import Customer from "@pages/Customer";
import Group from "@pages/Group";
import Home from "@pages/Home";
import Layout from "@pages/Layout";
import NickName from "@pages/NickName";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/nickname", element: <NickName /> },
      { path: "/group", element: <Group /> },
      { path: "/customer", element: <Customer /> },
    ],
  },
]);

export default router;
