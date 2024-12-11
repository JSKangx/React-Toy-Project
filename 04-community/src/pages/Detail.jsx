import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function Detail() {
  // params에서 type, id에 해당하는 값 접근
  const { type, _id } = useParams();

  const axios = useAxiosInstance();

  const { data } = useQuery({
    queryKey: ["posts", _id],
    queryFn: () => axios.get(`/posts/${_id}`),
    select: (res) => res.data,
    staleTime: 1000 * 10,
  });

  if (!data) {
    return <div>로딩중입니다.. 잠시만 기다려주세요</div>;
  }

  console.log(data);

  return <div>Detail</div>;
}
