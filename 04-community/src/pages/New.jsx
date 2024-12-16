import Button from "@components/Button";
import InputError from "@components/InputError";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function New() {
  const axios = useAxiosInstance();
  const navigate = useNavigate();

  const { type, _id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const qeuryClient = useQueryClient();

  const addItem = useMutation({
    mutationFn: (formData) => {
      formData.type = type;
      return axios.post("/posts", formData);
    },
    onSuccess: () => {
      alert("게시물이 등록되었습니다.");
      qeuryClient.invalidateQueries({ queryKey: ["posts", type] });
      navigate(`/${type}/${_id}`);
    },
  });

  return (
    <>
      <div className="p-5 mt-16 flex justify-center flex-col">
        <form onSubmit={handleSubmit(addItem.mutate)}>
          <div className="flex flex-col gap-2">
            <label htmlFor="title">제목</label>
            <input
              id="title"
              type="text"
              placeholder="제목을 입력하세요."
              className="ring-1 ring-slate-400 rounded-md w-full p-2"
              {...register("title", {
                required: "제목은 필수입니다.",
                minLength: {
                  value: 2,
                  message: "2글자 이상 입력하세요.",
                },
              })}
            />
            <InputError target={errors.title} />
            <br />

            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              rows="15"
              placeholder="내용을 입력하세요."
              className="ring-1 ring-slate-400 rounded-md w-full p-2"
              {...register("content", {
                required: "내용은 필수입니다.",
                minLength: {
                  value: 2,
                  message: "2글자 이상 입력하세요.",
                },
              })}
            />
            <InputError target={errors.content} />
            <Button type="submit" color="blue">
              등록
            </Button>
            <Link
              to={`/${type}`}
              className="focus:outline-none text-white bg-orange-400 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-400 dark:focus:ring-orange-800 text-center"
            >
              취소
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
