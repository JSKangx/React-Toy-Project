import InputError from "@components/InputError";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const axios = useAxiosInstance();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const onSignUp = useMutation({
    mutationFn: async (userInfo) => {
      console.log(userInfo.attach);
      if (userInfo.attach) {
        const imageFormData = new FormData();
        imageFormData.append("attach", userInfo.attach[0]);
        const fileRes = await axios.post("/files", imageFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // 유저 정보의 image 값에 응답받은 파일 정보가 들어있는 객체 설정
        userInfo.image = fileRes.data.item[0];
        // 서버에는 파일 데이터를 보낼 필요가 없다.
        delete userInfo.attach;
      }

      userInfo.type = "user";
      return axios.post("/users", userInfo);
    },
    onSuccess: (res) => {
      alert(`${res.data.item.name}님 회원가입이 완료되었습니다.`);
      navigate("/");
    },
    onError: (err) => {
      // 에러 메시지가 있다면 (4xx, 5xx)
      if (err.response?.data.errors) {
        err.response?.data.errors.forEach((error) =>
          setError(error.path, { message: error.msg })
        );
      } else {
        // 에러 메시지가 없다면
        alert(err.response?.data.message || "잠시 후 다시 요청하세요.");
      }
    },
  });

  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
            회원 가입
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSignUp.mutate)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="name"
            >
              이름
            </label>
            <input
              type="text"
              id="name"
              placeholder="이름을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700 dark:text-white"
              {...register("name", { required: "이름은 필수입니다." })}
            />
            <InputError target={errors.name} />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              type="text"
              id="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700 dark:text-white"
              {...register("email", {
                required: "이메일은 필수입니다.",
                pattern: {
                  value: emailRegex,
                  message: "이메일 형식에 맞지 않습니다.",
                },
              })}
            />
            <InputError target={errors.email} />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700 dark:text-white"
              {...register("password", { required: "비밀번호는 필수입니다." })}
            />
            <InputError target={errors.password} />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="attach"
            >
              프로필 이미지
            </label>
            <input
              type="file"
              id="attach"
              accept="image/*"
              placeholder="이미지를 선택하세요"
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              {...register("attach")}
            />
          </div>

          <div className="mt-10 flex justify-center items-center">
            <button
              type="submit"
              className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            >
              회원가입
            </button>
            <a
              href="/"
              className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            >
              취소
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}
