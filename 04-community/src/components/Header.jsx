import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex justify-between">
      <Link to="/" className="bg-orange-300 p-3">
        멋사컴
      </Link>
      <div className="flex gap-4 *:bg-orange-300 *:p-3">
        <Link to="/info">정보 공유</Link>
        <Link to="/free">자유 게시판</Link>
        <Link to="/qna">질문 게시판</Link>
      </div>
      <div className="flex gap-4 *:bg-orange-300 *:p-3">
        <Link to="/users/login">로그인</Link>
        <Link to="/users/signup">회원가입</Link>
      </div>
    </div>
  );
}
