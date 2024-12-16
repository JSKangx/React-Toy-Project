import useUserStore from "@zustand/userStore";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const { user, resetUser } = useUserStore();

  return (
    <div className="flex justify-between mb-[50px]">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "bg-orange-300 p-3" : "bg-slate-200 p-3"
        }
      >
        멋사컴
      </NavLink>
      <div className="flex gap-4">
        <NavLink
          className={({ isActive }) =>
            isActive ? "bg-orange-300 p-3" : "bg-slate-200 p-3"
          }
          to="/info"
        >
          정보 공유
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "bg-orange-300 p-3" : "bg-slate-200 p-3"
          }
          to="/free"
        >
          자유 게시판
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "bg-orange-300 p-3" : "bg-slate-200 p-3"
          }
          to="/qna"
        >
          질문 게시판
        </NavLink>
      </div>
      <div className="flex gap-4 *:bg-orange-300 *:p-3">
        {user ? (
          <>
            {`${user.name}님 환영합니다.`}
            <button onClick={resetUser}>로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/users/login">로그인</Link>
            <Link to="/users/signup">회원가입</Link>
          </>
        )}
      </div>
    </div>
  );
}
