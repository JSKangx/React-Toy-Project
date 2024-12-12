import Button from "@components/Button";
import useAxiosInstance from "@hooks/useAxiosInstance";
import ListItem from "@pages/ListItem";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

export default function List() {
  // custom axios 불러오기
  const axios = useAxiosInstance();

  const { type } = useParams();
  const { data } = useQuery({
    queryKey: ["posts", type],
    queryFn: () => axios.get("/posts", { params: { type } }),
    select: (res) => res.data,
    staleTime: 1000 * 10,
  });

  if (!data) {
    return <div>로딩중입니다.. 잠시만 기다려주세요</div>;
  }

  console.log(data);

  const list = data.item.map((item) => (
    <ListItem key={item._id} item={item}>
      {item.title}
    </ListItem>
  ));

  return (
    <>
      <div className="p-5 mt-16 flex justify-center flex-col">
        <div className="flex self-end">
          <form>
            <input
              type="text"
              className="ring-1 ring-slate-400 rounded-md mr-3 focus:outline-none focus:shadow-md px-2"
            />
            <Button type="submit" color="blue">
              검색
            </Button>
          </form>
          <Link
            to="new"
            className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            글쓰기
          </Link>
        </div>
        <table className="border-collapse w-full table-fixed">
          <colgroup>
            <col className="w-[10%] sm:w-[10%]" />
            <col className="w-[60%] sm:w-[30%]" />
            <col className="w-[30%] sm:w-[15%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[25%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-solid border-gray-600">
              <th className="p-2 whitespace-nowrap font-semibold">번호</th>
              <th className="p-2 whitespace-nowrap font-semibold">제목</th>
              <th className="p-2 whitespace-nowrap font-semibold">글쓴이</th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                조회수
              </th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                댓글수
              </th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                작성일
              </th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </table>
        <hr />
      </div>
    </>
  );
}
