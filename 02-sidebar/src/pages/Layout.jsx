import Footer from "@components/Footer";
import Header from "@components/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="overflow-x-hidden h-screen flex flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
