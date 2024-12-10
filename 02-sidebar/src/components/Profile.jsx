import PropTypes from "prop-types";

Profile.propTypes = {
  isLogin: PropTypes.bool.isRequired,
};

export default function Profile({ isLogin }) {
  return (
    <div className="h-[100px] flex flex-col items-center justify-center">
      <img
        src={`${isLogin ? "/images/guy.svg" : "images/avatar.svg"}`}
        alt="사람 프로필"
        className="w-[100px] h-auto"
      />
      <p>{isLogin ? "Alex Pereira" : "로그인 하세요"}</p>
    </div>
  );
}
