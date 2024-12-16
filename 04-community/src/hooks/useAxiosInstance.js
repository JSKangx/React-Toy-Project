import useUserStore from "@zustand/userStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const REFRESH_URL = "/auth/refresh";

export default function useAxiosInstance() {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();

  // custom axios instance 생성
  const instance = axios.create({
    baseURL: "https:/11.fesp.shop",
    timeout: 1000 * 15,
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      "client-id": "00-board",
    },
  });

  // (1) 요청 인터셉터 추가
  // 인자로 전달되는 config는 요청 환경 설정 객체
  instance.interceptors.request.use((config) => {
    // (1) 로그인 상태이지만 (2) 토큰 재발행 요청이 아닐 때에는
    // 요청 헤더에 accessToken 설정
    if (user && config.url !== REFRESH_URL) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }

    // 요청 Params 설정
    config.params = {
      delay: 500, // 딜레이 0.5초
      ...config.params, // 나머지 속성 값은 그대로 유지
    };

    return config; // 변경된 config 객체 반환
  });

  // (2) 응답 인터셉터 추가
  instance.interceptors.response.use(
    (response) => {
      // 제대로된 응답이 왔을 때 실행할 코드 블록
      console.log("인터셉터", response);
      return response;
    },
    async (error) => {
      // 에러가 발생했을 때 실행할 코드 블록
      console.error(error);
      const { config, response } = error;

      // 인증 실패 에러가 발생한 경우
      if (response.status === 401) {
        // (1) 갱신 요청에서 인증 실패 에러
        if (config.url === REFRESH_URL) {
          // refresh token 마저 만료이므로 로그인 페이지로 이동
          navigateLogin();
        }

        // (2) 일반 요청에서 인증 실패 에러 (로그인 했으나 accessToken 만료)
        if (user) {
          // 1. refreshToken으로 새로운 accessToken 요청
          const {
            data: { accessToken },
          } = await instance.get(REFRESH_URL, {
            headers: {
              Authorization: `Bearer ${user.refreshToken}`,
            },
          });

          // 2. 갱신된 accessToken을 user 상태에 갱신
          setUser({ ...user, accessToken });

          // 3. 갱신된 accessToken을 설정하여 원래 요청 재시도
          config.headers.Authorization = `Bearer ${accessToken}`;
          // instance로 재요청할 경우 요청 인터셉터가 다시 실행되기에 무한 루프가 발생할 가능성 있기에 axios api로 재요청.
          return axios(config);
        } else {
          // 4. 로그인도 안 한 상태
          navigateLogin();
        }
      }

      // 에러 객체 반환. 이 instance를 사용하는 요청의 catch 블록의 인수로 전달됨
      return Promise.reject(error);
    }
  );

  function navigateLogin() {
    const ok = confirm("로그인 후 이용 가능합니다. \n 로그인 페이지로 이동하시겠습니까?");
    if (ok) {
      // 이전 페이지 정보를 함께 매달아서 보냄
      navigate("/users/login", { state: { from: location.pathname } });
    }
  }

  return instance;
}
