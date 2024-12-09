import Sidebar from "@components/Sidebar";
import PropTypes from "prop-types";
import { useState } from "react";

Header.propTypes = {
  onClick: PropTypes.func,
};

export default function Header() {
  const [isActive, setIsActive] = useState(false);
  const changeIsActive = () => {
    if (isActive) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  return (
    <>
      <Sidebar isActive={isActive} changeIsActive={changeIsActive} />
      <header className="flex h-16 bg-red-200 justify-end px-4">
        <button className="hover:cursor-pointer" onClick={changeIsActive}>
          <img src="/images/hamburger.svg" alt="햄버거 메뉴 버튼" />
        </button>
      </header>
    </>
  );
}
