import { QueryFunction } from "@tanstack/react-query";
import { Post as IPost } from "@/model/Post";

export const getSinglePost: QueryFunction<
  IPost,
  [_1: string, string]
> = async ({ queryKey }) => {
  const [_1, id] = queryKey;
  const res = await fetch(
    `http://localhost:9090/api/posts/${id}`,
    {
      // 서버 쪽 캐싱 - react query X
      next: {
        tags: ["posts", id],
      },
      // cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  // 캐시 초기화
  // 태그
  // revalidateTag("recommends")

  // 페이지 전체 새로고침
  // revalidatePath("/home")

  return res.json();
};
