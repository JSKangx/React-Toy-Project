import Profile from "@components/Profile";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

Sidebar.propTypes = {
  isActive: PropTypes.bool.isRequired,
  changeIsActive: PropTypes.func.isRequired,
};

export default function Sidebar({ isActive, changeIsActive }) {
  const [isLogin, setIsLogin] = useState(true);

  const handleState = () => {
    changeIsActive();
    if (isLogin) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-all duration-500 ease-in-out ${
          isActive ? "opacity-50 visible" : "opacity-0 invisible"
        }`}
        onClick={changeIsActive}
      ></div>
      <div
        className={`bg-white fixed top-0 right-0 p-3 w-[400px] h-screen transition-all duration-500 ease-in-out transform rounded-l-md ${
          isActive
            ? "opacity-1 visible translate-x-0"
            : "opacity-0 invisible translate-x-[100px]"
        }`}
      >
        <div>
          <button onClick={changeIsActive}>X</button>
        </div>
        <div className="mb-4">
          <Profile isLogin={isLogin} />
        </div>
        {isLogin && (
          <>
            <div className="flex flex-col gap-4 *:text-slate-400">
              <Link to="/nickname" onClick={changeIsActive}>
                닉네임 설정
              </Link>
              <Link to="/group" onClick={changeIsActive}>
                그룹 관리
              </Link>
              <Link to="/customer" onClick={changeIsActive}>
                고객센터
              </Link>
              <hr />
            </div>
          </>
        )}
        <div className="hover:cursor-pointer" onClick={handleState}>
          {isLogin ? "Log out" : "Log in"}
        </div>
      </div>
    </>
  );
}
