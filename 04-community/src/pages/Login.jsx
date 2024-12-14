import InputError from "@components/InputError";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const axios = useAxiosInstance();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onLogin = useMutation({
    mutationFn: async (userInfo) => axios.post("/users/login", userInfo),
    onSuccess: (res) => {
      alert(`${res.data.item.name}님 환영합니다.`);
      navigate("/");
    },
    onError: (err) => {
      // 각각 input에 해당하는 에러 메시지가 있다면 (4xx, 5xx)
      if (err.response?.data.errors) {
        err.response?.data.errors.forEach((error) =>
          setError(error.path, { message: error.msg })
        );
      } else {
        // 개별 에러 메시지가 없다면
        alert(err.response?.data.message || "잠시 후 다시 요청하세요.");
      }
    },
  });

  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            로그인
          </h2>
        </div>

        <form onSubmit={handleSubmit(onLogin.mutate)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700 dark:text-gray-200"
              {...register("email", { required: "이메일은 필수입니다." })}
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
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700 dark:text-gray-200"
              {...register("password", { required: "비밀번호는 필수입니다." })}
            />
            <InputError target={errors.password} />
            <a
              href="#"
              className="block mt-6 ml-auto text-gray-500 text-sm dark:text-gray-300 hover:underline"
            >
              비밀번호를 잊으셨나요?
            </a>
          </div>
          <div className="mt-10 flex justify-center items-center">
            <button
              type="submit"
              className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            >
              로그인
            </button>
            <a
              href="/user/signup"
              className="ml-8 text-gray-800 hover:underline"
            >
              회원가입
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}
