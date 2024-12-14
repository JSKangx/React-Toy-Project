import axios from "axios";

export default function useAxiosInstance() {
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
    (error) => {
      // 에러가 발생했을 때 실행할 코드 블록
      console.error(error); // 콘솔에 에러 메시지 추가

      // 에러 객체 반환. 이 instance를 사용하는 요청의 catch 블록의 인수로 전달됨
      return Promise.reject(error);
    }
  );

  return instance;
}
