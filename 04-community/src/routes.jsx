import Detail from "@pages/Detail";
import Edit from "@pages/Edit";
import Layout from "@pages/Layout";
import List from "@pages/List";
import Login from "@pages/Login";
import MainPage from "@pages/MainPage";
import Signup from "@pages/Signup";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: ":type", element: <List /> },
      { path: ":type/:_id", element: <Detail /> },
      { path: ":type/:_id/edit", element: <Edit /> },
      { path: "users/login", element: <Login /> },
      { path: "users/signup", element: <Signup /> },
    ],
  },
]);

export default router;
