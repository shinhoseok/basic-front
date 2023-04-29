import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "../pages/Login";
import UserList from "../pages/admin/user/UserList";
import Top from "../pages/common/Top";
import Footer from "../pages/common/Footer";
import LeftMenu from "../pages/common/LeftMenu";
import UserInsert from "../pages/admin/user/UserInsert";

const privatePathList = [
  {
    id: 1,
    path: "/admin/user/selectUserList",
    component: UserList,
  },
  {
    id: 2,
    path: "/users/:id",
    component: UserList,
  },
  {
    id: 3,
    path: "/users/:id/edit",
    component: UserList,
  },
  {
    id: 4,
    path: "/admin/user/insertUser",
    component: UserInsert,
  },
];

const Router = () => {
  return (
    <BrowserRouter>
      <Top />
      <div className="wrap">
        <div className="container">
          <LeftMenu />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            {privatePathList.map((route) => (
              <Route
                key={route.id}
                path={route.path}
                element={<route.component />}
              />
            ))}
            ;
          </Routes>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
